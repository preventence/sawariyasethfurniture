<template>
  <main>
    <HeroSection />
    <CollectionsSection />
    <WorkshopSection />
    <ShowroomSection />
    <AboutSection />
    <ContactSection />
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Sawariya Seth Furniture — Handcrafted Furniture, Ajmer',
  description:
    'Premium solid wood furniture designed, manufactured and sold from our showroom in Ajmer. Teak, sheesham, oak — built to last a lifetime.',
  ogTitle: 'Sawariya Seth Furniture',
  ogDescription: 'Handcrafted furniture from our Ajmer workshop to your home.',
})

// Global scroll reveal
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  )
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>
