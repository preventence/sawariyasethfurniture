import { writeFile } from 'fs/promises'
import { join, extname } from 'path'
import { randomBytes } from 'crypto'

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)
  if (!formData?.length) throw createError({ statusCode: 400, statusMessage: 'No file received' })

  const file = formData.find(f => f.name === 'file')
  if (!file || !file.data) throw createError({ statusCode: 400, statusMessage: 'No file field' })

  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
  const mime = file.type || 'application/octet-stream'
  if (!allowed.includes(mime)) {
    throw createError({ statusCode: 400, statusMessage: 'Only JPG, PNG, WebP, AVIF allowed' })
  }

  const ext = extname(file.filename || '.jpg') || '.jpg'
  const filename = `${Date.now()}-${randomBytes(6).toString('hex')}${ext}`
  const uploadsDir = join(process.cwd(), 'public', 'uploads')
  await writeFile(join(uploadsDir, filename), file.data)

  return { url: `/uploads/${filename}`, filename }
})
