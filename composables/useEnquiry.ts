export interface EnquiryForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  interest: string
  message: string
}

export function useEnquiry() {
  const form = reactive<EnquiryForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  })

  const submitted = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const reset = () => {
    Object.assign(form, {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      interest: '',
      message: '',
    })
    submitted.value = false
    error.value = null
  }

  const submit = async () => {
    loading.value = true
    error.value = null
    try {
      // Replace with your actual endpoint or Nuxt server route
      // await $fetch('/api/enquiry', { method: 'POST', body: form })
      await new Promise((r) => setTimeout(r, 800)) // simulate
      submitted.value = true
    } catch (e) {
      error.value = 'Something went wrong. Please try again or call us directly.'
    } finally {
      loading.value = false
    }
  }

  return { form, submitted, loading, error, submit, reset }
}
