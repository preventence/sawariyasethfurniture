export default defineEventHandler(async (event) => {
  const db = useDB()
  const id = getRouterParam(event, 'id')
  const method = event.method

  if (method === 'PATCH' || method === 'PUT') {
    const body = await readBody(event)
    const existing: any = db.prepare('SELECT * FROM categories WHERE id = ?').get(id)
    if (!existing) throw createError({ statusCode: 404, statusMessage: 'Not found' })

    // If cover image changed and old one was an upload, delete it from disk
    if (body.cover_image !== undefined && body.cover_image !== existing.cover_image) {
      deleteUploadedFile(existing.cover_image).catch(() => {})
    }

    const slug = body.name ? slugify(body.name) : existing.slug
    db.prepare(`
      UPDATE categories SET
        name = ?, slug = ?, description = ?, cover_image = ?,
        sort_order = ?, featured = ?
      WHERE id = ?
    `).run(
      body.name ?? existing.name,
      slug,
      body.description ?? existing.description,
      body.cover_image ?? existing.cover_image,
      body.sort_order ?? existing.sort_order,
      body.featured !== undefined ? (body.featured ? 1 : 0) : existing.featured,
      id
    )
    return db.prepare('SELECT * FROM categories WHERE id = ?').get(id)
  }

  if (method === 'DELETE') {
    // 1. Collect all product image URLs in this category (before cascade delete)
    const productImages = db.prepare(`
      SELECT pi.url
      FROM product_images pi
      JOIN products p ON p.id = pi.product_id
      WHERE p.category_id = ?
    `).all(id) as { url: string }[]

    // 2. Collect category cover image
    const category: any = db.prepare('SELECT cover_image FROM categories WHERE id = ?').get(id)

    // 3. Delete from DB (cascade removes products + product_images rows)
    db.prepare('DELETE FROM categories WHERE id = ?').run(id)

    // 4. Delete all image files from disk (non-blocking)
    const allUrls = [
      ...(category?.cover_image ? [category.cover_image] : []),
      ...productImages.map(i => i.url),
    ]
    deleteUploadedFiles(allUrls).catch(() => {})

    return { ok: true }
  }
})
