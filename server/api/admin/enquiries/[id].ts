export default defineEventHandler(async (event) => {
  const db = useDB()
  const id = getRouterParam(event, 'id')
  const method = event.method

  if (method === 'PATCH') {
    const body = await readBody(event)
    if (body.read !== undefined) {
      db.prepare('UPDATE enquiries SET read = ? WHERE id = ?').run(body.read ? 1 : 0, id)
    }
    return db.prepare('SELECT * FROM enquiries WHERE id = ?').get(id)
  }

  if (method === 'DELETE') {
    db.prepare('DELETE FROM enquiries WHERE id = ?').run(id)
    return { ok: true }
  }
})