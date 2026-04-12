export function useAdminAuth() {
  const router = useRouter()
  const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin')
  }
  return { logout }
}

export function useImageUpload() {
  const uploading = ref(false)
  const uploadError = ref<string | null>(null)
  const uploadImage = async (file: File): Promise<string | null> => {
    uploading.value = true; uploadError.value = null
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await $fetch<{ url: string }>('/api/admin/upload', { method: 'POST', body: form })
      return res.url
    } catch (e: any) {
      uploadError.value = e?.data?.statusMessage || 'Upload failed'; return null
    } finally { uploading.value = false }
  }
  return { uploading, uploadError, uploadImage }
}
