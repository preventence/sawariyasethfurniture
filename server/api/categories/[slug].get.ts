export default defineEventHandler((event) => {
  const db = useDB()
  const slug = getRouterParam(event, 'slug')

  const category = db.prepare(`
    SELECT c.*, COUNT(p.id) AS product_count
    FROM categories c
    LEFT JOIN products p ON p.category_id = c.id
    WHERE c.slug = ?
    GROUP BY c.id
  `).get(slug)

  if (!category) throw createError({ statusCode: 404, statusMessage: 'Category not found' })
  return category
})
