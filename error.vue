<template>
  <div class="grain">
    <TheNavbar />
    <main class="min-h-screen flex items-center justify-center bg-[var(--color-warm-white)] px-6 pt-20">
      <div class="text-center max-w-md">
        <div class="font-serif text-[8rem] leading-none text-[var(--color-linen)] select-none mb-2">{{ error?.statusCode || 404 }}</div>
        <h1 class="font-serif text-3xl text-[var(--color-bark)] mb-4">{{ error?.statusCode === 404 ? 'Page Not Found' : 'Something Went Wrong' }}</h1>
        <div class="wood-rule mx-auto" />
        <p class="font-sans text-sm text-[var(--color-bark)]/60 leading-relaxed mb-8">
          {{ error?.statusCode === 404 ? "The page you're looking for seems to have wandered off the showroom floor." : "An unexpected error occurred. Please try again." }}
        </p>
        <NuxtLink to="/" class="btn-primary">Back to Home <ArrowRightIcon :size="14" /></NuxtLink>
      </div>
    </main>
    <TheFooter />
  </div>
</template>
<script setup lang="ts">
import { ArrowRightIcon } from 'lucide-vue-next'
const props = defineProps<{ error: { statusCode: number; statusMessage?: string } | null }>()
</script>
