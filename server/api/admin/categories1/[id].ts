export default defineEventHandler(async (event) => {
  const db = useDB()
  const id = getRouterParam(event, 'id')
  const method = event.method

  if (method === 'PATCH' || method === 'PUT') {
    const body = await readBody(event)
    const existing: any = db.prepare('SELECT * FROM categories WHERE id = ?').get(id)
    if (!existing) throw createError({ statusCode: 404, statusMessage: 'Not found' })

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
    db.prepare('DELETE FROM categories WHERE id = ?').run(id)
    return { ok: true }
  }
})
