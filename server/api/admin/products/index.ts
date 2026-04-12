export default defineEventHandler(async (event) => {
  const db = useDB()
  const method = event.method

  if (method === 'GET') {
    return db.prepare(`
      SELECT p.*, c.name AS category_name, c.slug AS category_slug,
        (SELECT url FROM product_images WHERE product_id = p.id ORDER BY sort_order LIMIT 1) AS cover_image
      FROM products p
      JOIN categories c ON c.id = p.category_id
      ORDER BY p.created_at DESC
    `).all()
  }

  if (method === 'POST') {
    const body = await readBody(event)
    if (!body.name || !body.category_id) {
      throw createError({ statusCode: 400, statusMessage: 'Name and category required' })
    }
    const slug = slugify(body.name)
    const result = db.prepare(`
      INSERT INTO products
        (category_id, name, slug, description, price, price_on_request,
         material, width_cm, height_cm, depth_cm, custom_order, featured, in_stock, sort_order)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `).run(
      body.category_id, body.name, slug,
      body.description || '',
      body.price_on_request ? null : (body.price || null),
      body.price_on_request ? 1 : 0,
      body.material || '',
      body.width_cm || null, body.height_cm || null, body.depth_cm || null,
      body.custom_order ? 1 : 0,
      body.featured ? 1 : 0,
      body.in_stock !== false ? 1 : 0,
      body.sort_order || 0
    )
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid) as any

    // Insert images if provided
    if (body.images?.length) {
      const insertImg = db.prepare(`
        INSERT INTO product_images (product_id, url, alt_text, sort_order)
        VALUES (?, ?, ?, ?)
      `)
      body.images.forEach((img: any, i: number) => {
        insertImg.run(product.id, img.url, img.alt_text || '', i)
      })
    }

    return product
  }
})
