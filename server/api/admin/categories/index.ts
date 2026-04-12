export default defineEventHandler(async (event) => {
  const db = useDB()
  const method = event.method

  // GET — list all
  if (method === 'GET') {
    return db.prepare(`
      SELECT c.*, COUNT(p.id) AS product_count
      FROM categories c LEFT JOIN products p ON p.category_id = c.id
      GROUP BY c.id ORDER BY c.sort_order ASC, c.created_at DESC
    `).all()
  }

  // POST — create
  if (method === 'POST') {
    const body = await readBody(event)
    if (!body.name) throw createError({ statusCode: 400, statusMessage: 'Name required' })
    const slug = slugify(body.name)
    const result = db.prepare(`
      INSERT INTO categories (name, slug, description, cover_image, sort_order, featured)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(body.name, slug, body.description || '', body.cover_image || '', body.sort_order || 0, body.featured ? 1 : 0)
    return db.prepare('SELECT * FROM categories WHERE id = ?').get(result.lastInsertRowid)
  }
})
