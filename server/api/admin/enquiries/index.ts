export default defineEventHandler(async (event) => {
  const db = useDB()
  const method = event.method

  if (method === 'GET') {
    return db.prepare(`
      SELECT * FROM enquiries ORDER BY created_at DESC
    `).all()
  }
})