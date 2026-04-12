export function useEnquiry(defaultInterest = '') {
  const form = reactive({ firstName: '', lastName: '', email: '', phone: '', interest: defaultInterest, product: '', message: '' })
  const submitted = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const reset = () => { Object.assign(form, { firstName: '', lastName: '', email: '', phone: '', interest: defaultInterest, product: '', message: '' }); submitted.value = false; error.value = null }
  const submit = async () => {
    loading.value = true; error.value = null
    try {
      await $fetch('/api/enquiry', { method: 'POST', body: form })
      submitted.value = true
    } catch { error.value = 'Something went wrong. Please try again or call us.' }
    finally { loading.value = false }
  }
  return { form, submitted, loading, error, submit, reset }
}
