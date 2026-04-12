export default defineEventHandler(async (event) => {
  const db = useDB()
  const id = getRouterParam(event, 'id')
  const method = event.method

  if (method === 'GET') {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id)
    if (!product) throw createError({ statusCode: 404, statusMessage: 'Not found' })
    const images = db.prepare('SELECT * FROM product_images WHERE product_id = ? ORDER BY sort_order').all(id)
    return { ...product as object, images }
  }

  if (method === 'PATCH' || method === 'PUT') {
    const body = await readBody(event)
    const existing: any = db.prepare('SELECT * FROM products WHERE id = ?').get(id)
    if (!existing) throw createError({ statusCode: 404, statusMessage: 'Not found' })

    const slug = body.name ? slugify(body.name) : existing.slug

    db.prepare(`
      UPDATE products SET
        category_id = ?, name = ?, slug = ?, description = ?,
        price = ?, price_on_request = ?, material = ?,
        width_cm = ?, height_cm = ?, depth_cm = ?,
        custom_order = ?, featured = ?, in_stock = ?, sort_order = ?
      WHERE id = ?
    `).run(
      body.category_id ?? existing.category_id,
      body.name ?? existing.name,
      slug,
      body.description ?? existing.description,
      body.price_on_request ? null : (body.price ?? existing.price),
      body.price_on_request !== undefined ? (body.price_on_request ? 1 : 0) : existing.price_on_request,
      body.material ?? existing.material,
      body.width_cm ?? existing.width_cm,
      body.height_cm ?? existing.height_cm,
      body.depth_cm ?? existing.depth_cm,
      body.custom_order !== undefined ? (body.custom_order ? 1 : 0) : existing.custom_order,
      body.featured !== undefined ? (body.featured ? 1 : 0) : existing.featured,
      body.in_stock !== undefined ? (body.in_stock ? 1 : 0) : existing.in_stock,
      body.sort_order ?? existing.sort_order,
      id
    )

    // Replace images if provided
    if (body.images) {
      db.prepare('DELETE FROM product_images WHERE product_id = ?').run(id)
      const insertImg = db.prepare(`
        INSERT INTO product_images (product_id, url, alt_text, sort_order)
        VALUES (?, ?, ?, ?)
      `)
      body.images.forEach((img: any, i: number) => {
        insertImg.run(id, img.url, img.alt_text || '', i)
      })
    }

    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id)
    const images = db.prepare('SELECT * FROM product_images WHERE product_id = ? ORDER BY sort_order').all(id)
    return { ...product as object, images }
  }

  if (method === 'DELETE') {
    db.prepare('DELETE FROM products WHERE id = ?').run(id)
    return { ok: true }
  }
})
