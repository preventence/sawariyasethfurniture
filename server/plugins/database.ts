import { mkdirSync, existsSync } from 'fs'
import { join } from 'path'

export default defineNitroPlugin(() => {
  // Ensure uploads directory exists
  const uploadsDir = join(process.cwd(), 'public', 'uploads')
  if (!existsSync(uploadsDir)) mkdirSync(uploadsDir, { recursive: true })

  // Boot the DB (creates file + schema if not present)
  const db = useDB()
  console.log('[Sawariya Seth Furniture] ✓ Database ready')
})
