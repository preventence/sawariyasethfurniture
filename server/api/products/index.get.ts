export default defineEventHandler((event) => {
  const db = useDB()
  const { category, featured, limit, search } = getQuery(event) as {
    category?: string
    featured?: string
    limit?: string
    search?: string
  }

  let where = 'WHERE 1=1'
  const params: unknown[] = []

  if (category) {
    where += ' AND c.slug = ?'
    params.push(category)
  }
  if (featured === 'true') {
    where += ' AND p.featured = 1'
  }
  if (search) {
    where += ' AND (p.name LIKE ? OR p.material LIKE ? OR p.description LIKE ?)'
    const q = `%${search}%`
    params.push(q, q, q)
  }

  let sql = `
    SELECT
      p.*,
      c.name  AS category_name,
      c.slug  AS category_slug,
      (SELECT url FROM product_images WHERE product_id = p.id ORDER BY sort_order LIMIT 1) AS cover_image
    FROM products p
    JOIN categories c ON c.id = p.category_id
    ${where}
    ORDER BY p.sort_order ASC, p.created_at DESC
  `

  if (limit) {
    sql += ` LIMIT ?`
    params.push(parseInt(limit))
  }

  return db.prepare(sql).all(...params)
})
