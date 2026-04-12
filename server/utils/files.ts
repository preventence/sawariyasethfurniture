import { unlink } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

/**
 * Delete a file from public/uploads/ if it lives there.
 * Silently skips external URLs and missing files.
 */
export async function deleteUploadedFile(url: string): Promise<void> {
  if (!url) return
  // Only delete files we own — skip external http(s) URLs
  if (url.startsWith('http://') || url.startsWith('https://')) return

  // Expect paths like /uploads/filename.jpg
  if (!url.startsWith('/uploads/')) return

  const filename = url.replace('/uploads/', '')
  // Guard against path traversal
  if (filename.includes('/') || filename.includes('..')) return

  const fullPath = join(process.cwd(), 'public', 'uploads', filename)
  if (!existsSync(fullPath)) return

  try {
    await unlink(fullPath)
  } catch {
    // File may already be gone — not a fatal error
  }
}

/**
 * Delete multiple uploaded files concurrently.
 */
export async function deleteUploadedFiles(urls: string[]): Promise<void> {
  await Promise.all(urls.map(deleteUploadedFile))
}
