export default defineEventHandler((event) => {
  const db = useDB()
  const { featured, limit } = getQuery(event) as { featured?: string; limit?: string }

  let sql = `
    SELECT
      c.*,
      COUNT(p.id) AS product_count
    FROM categories c
    LEFT JOIN products p ON p.category_id = c.id
    GROUP BY c.id
  `
  const params: unknown[] = []

  if (featured === 'true') {
    sql += ` HAVING c.featured = 1`
  }

  sql += ` ORDER BY c.sort_order ASC, c.created_at DESC`

  if (limit) {
    sql += ` LIMIT ?`
    params.push(parseInt(limit))
  }

  return db.prepare(sql).all(...params)
})
