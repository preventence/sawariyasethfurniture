<template>
  <header :class="['fixed top-0 left-0 right-0 z-50 transition-all duration-500', scrolled ? 'bg-[#FDFAF4]/96 backdrop-blur-sm shadow-sm' : 'bg-transparent']">
    <div class="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
      <NuxtLink to="/" class="flex flex-col leading-none">
        <span class="font-serif text-2xl tracking-wide transition-colors duration-300" :style="{ color: scrolled ? 'var(--color-bark)' : logoColor }">Sawariya Seth Furniture</span>
        <span class="font-sans text-[9px] tracking-[0.28em] uppercase transition-colors duration-300" :style="{ color: scrolled ? 'var(--color-clay)' : logoSubColor }">Studio</span>
      </NuxtLink>
      <nav class="hidden md:flex items-center gap-8">
        <NuxtLink v-for="link in navLinks" :key="link.href" :to="link.href"
          class="nav-link font-sans text-[0.78rem] tracking-[0.1em] uppercase font-medium transition-colors duration-300"
          :style="{ color: scrolled ? 'var(--color-bark)' : navColor }">{{ link.label }}</NuxtLink>
      </nav>
      <div class="hidden md:flex items-center gap-4">
        <NuxtLink to="/collections" class="nav-link font-sans text-[0.78rem] tracking-[0.1em] uppercase font-medium transition-colors duration-300" :style="{ color: scrolled ? 'var(--color-bark)' : navColor }">Collections</NuxtLink>
        <NuxtLink to="/#contact" class="btn-primary text-xs py-3 px-5" :style="!scrolled && isHome ? { background:'transparent', color:navColor, borderColor:navColor } : {}">Enquire Now</NuxtLink>
      </div>
      <button class="md:hidden p-2" :style="{ color: scrolled ? 'var(--color-bark)' : navColor }" @click="mobileOpen = !mobileOpen" aria-label="Toggle menu">
        <component :is="mobileOpen ? XIcon : MenuIcon" :size="22" />
      </button>
    </div>
    <Transition name="slide-down">
      <div v-if="mobileOpen" class="md:hidden bg-[#FDFAF4] border-t border-[var(--color-linen)] px-6 py-6 flex flex-col gap-5">
        <NuxtLink v-for="link in allLinks" :key="link.href" :to="link.href" class="font-sans text-sm tracking-[0.1em] uppercase font-medium text-[var(--color-bark)]" @click="mobileOpen = false">{{ link.label }}</NuxtLink>
        <NuxtLink to="/#contact" class="btn-primary w-fit mt-2" @click="mobileOpen = false">Enquire Now</NuxtLink>
      </div>
    </Transition>
  </header>
</template>
<script setup lang="ts">
import { MenuIcon, XIcon } from 'lucide-vue-next'
const route = useRoute()
const scrolled = ref(false)
const mobileOpen = ref(false)
const isHome = computed(() => route.path === '/')
const navColor = computed(() => isHome.value && !scrolled.value ? '#FAF5EB' : 'var(--color-bark)')
const logoColor = computed(() => isHome.value && !scrolled.value ? '#FAF5EB' : 'var(--color-bark)')
const logoSubColor = computed(() => isHome.value && !scrolled.value ? '#D9A07C' : 'var(--color-clay)')
const navLinks = [{ label: 'Workshop', href: '/#workshop' }, { label: 'Showroom', href: '/#showroom' }, { label: 'About', href: '/#about' }]
const allLinks = [{ label: 'Collections', href: '/collections' }, ...navLinks, { label: 'Contact', href: '/#contact' }]
onMounted(() => {
  const fn = () => { scrolled.value = window.scrollY > 60 }
  window.addEventListener('scroll', fn, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', fn))
})
</script>
<style scoped>
.slide-down-enter-active,.slide-down-leave-active{transition:all 0.3s ease;}
.slide-down-enter-from,.slide-down-leave-to{opacity:0;transform:translateY(-10px);}
</style>
