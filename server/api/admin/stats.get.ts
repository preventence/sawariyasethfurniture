export default defineEventHandler(() => {
  const db = useDB()
  const totalCategories  = (db.prepare('SELECT COUNT(*) AS n FROM categories').get() as any).n
  const totalProducts    = (db.prepare('SELECT COUNT(*) AS n FROM products').get() as any).n
  const featured         = (db.prepare('SELECT COUNT(*) AS n FROM products WHERE featured = 1').get() as any).n
  const totalEnquiries   = (db.prepare('SELECT COUNT(*) AS n FROM enquiries').get() as any).n
  const unreadEnquiries  = (db.prepare('SELECT COUNT(*) AS n FROM enquiries WHERE read = 0').get() as any).n
  const recentProducts   = db.prepare(`
    SELECT p.name, p.slug, p.id, c.name AS category_name, p.created_at
    FROM products p JOIN categories c ON c.id = p.category_id
    ORDER BY p.created_at DESC LIMIT 5
  `).all()
  return { totalCategories, totalProducts, featured, totalEnquiries, unreadEnquiries, recentProducts }
})
