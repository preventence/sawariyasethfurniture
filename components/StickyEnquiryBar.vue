<template>
  <Transition name="slide-up">
    <div v-if="visible" class="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[var(--color-bark)] flex">
      <a href="tel:+912012345678" class="flex-1 flex items-center justify-center gap-2 py-4 border-r border-[var(--color-sand)]/10 text-[var(--color-sand-light)]">
        <PhoneIcon :size="15" /><span class="font-sans text-[11px] tracking-[0.15em] uppercase">Call</span>
      </a>
      <NuxtLink to="/#contact" class="flex-1 flex items-center justify-center gap-2 py-4 bg-[var(--color-clay)] text-[var(--color-sand-light)]">
        <span class="font-sans text-[11px] tracking-[0.15em] uppercase font-medium">Enquire Now</span>
        <ArrowRightIcon :size="13" />
      </NuxtLink>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { PhoneIcon, ArrowRightIcon } from 'lucide-vue-next'
const visible = ref(false)
onMounted(() => {
  const fn = () => { visible.value = window.scrollY > 300 }
  window.addEventListener('scroll', fn, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', fn))
})
</script>
<style scoped>
.slide-up-enter-active,.slide-up-leave-active{transition:transform 0.3s ease;}
.slide-up-enter-from,.slide-up-leave-to{transform:translateY(100%);}
</style>
