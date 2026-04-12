<template>
  <div class="w-full max-w-md">
    <div class="bg-white border border-[var(--color-linen)] p-10">
      <div class="text-center mb-8">
        <div class="font-serif text-3xl text-[var(--color-bark)] mb-1">Sawariya Seth Furniture</div>
        <div class="font-sans text-[9px] tracking-[0.28em] uppercase text-[var(--color-clay)]">Admin Dashboard</div>
      </div>
      <form @submit.prevent="login" class="space-y-5" novalidate>
        <div>
          <label class="admin-label">Password</label>
          <input
            v-model="password"
            type="password"
            class="admin-input"
            placeholder="Enter admin password"
            autocomplete="current-password"
            required
            autofocus
          />
        </div>
        <p v-if="error" class="font-sans text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-2">{{ error }}</p>
        <button type="submit" class="btn-primary w-full justify-center" :disabled="loading">
          <span v-if="loading" class="animate-pulse">Signing in…</span>
          <template v-else>Sign In <ArrowRightIcon :size="14" /></template>
        </button>
      </form>
      <p class="font-sans text-[10px] text-[var(--color-bark)]/35 text-center mt-6">Default password: sawariyaseth2026 — change in .env</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ArrowRightIcon } from 'lucide-vue-next'
definePageMeta({ layout: 'admin-auth' })

const password = ref('')
const loading = ref(false)
const error = ref('')
const router = useRouter()

// Redirect if already logged in
const { data: authCheck } = await useFetch('/api/auth/check')
if ((authCheck.value as any)?.authenticated) {
  await navigateTo('/admin/dashboard')
}

const login = async () => {
  loading.value = true; error.value = ''
  try {
    await $fetch('/api/auth/login', { method: 'POST', body: { password: password.value } })
    await router.push('/admin/dashboard')
  } catch (e: any) {
    error.value = e?.data?.statusMessage || 'Incorrect password'
  } finally { loading.value = false }
}
</script>
