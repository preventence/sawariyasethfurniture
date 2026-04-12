export default defineEventHandler((event) => {
  const db = useDB()
  const slug = getRouterParam(event, 'slug')

  const product = db.prepare(`
    SELECT p.*, c.name AS category_name, c.slug AS category_slug
    FROM products p
    JOIN categories c ON c.id = p.category_id
    WHERE p.slug = ?
  `).get(slug)

  if (!product) throw createError({ statusCode: 404, statusMessage: 'Product not found' })

  const images = db.prepare(`
    SELECT * FROM product_images WHERE product_id = ? ORDER BY sort_order
  `).all((product as any).id)

  const related = db.prepare(`
    SELECT p.*,
      (SELECT url FROM product_images WHERE product_id = p.id ORDER BY sort_order LIMIT 1) AS cover_image
    FROM products p
    WHERE p.category_id = ? AND p.id != ?
    ORDER BY RANDOM()
    LIMIT 3
  `).all((product as any).category_id, (product as any).id)

  return { ...product as object, images, related }
})
