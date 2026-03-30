<template>
  <main class="min-h-screen flex items-center justify-center bg-[var(--color-warm-white)] px-6">
    <div class="text-center max-w-md">
      <div class="font-serif text-[8rem] leading-none text-[var(--color-linen)] select-none mb-2">
        404
      </div>
      <h1 class="font-serif text-3xl text-[var(--color-bark)] mb-4">Page Not Found</h1>
      <div class="wood-rule mx-auto" />
      <p class="font-sans text-sm text-[var(--color-bark)]/60 leading-relaxed mb-8">
        The page you're looking for seems to have wandered off the showroom floor.
      </p>
      <NuxtLink to="/" class="btn-primary">
        Back to Home
        <ArrowRightIcon :size="14" />
      </NuxtLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from 'lucide-vue-next'
</script>
