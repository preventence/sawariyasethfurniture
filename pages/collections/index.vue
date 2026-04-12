<template>
  <main class="pt-20">
    <div class="bg-[var(--color-linen)] py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div class="flex items-center gap-3 mb-4">
          <NuxtLink to="/" class="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-clay)] hover:text-[var(--color-bark)] transition-colors">Home</NuxtLink>
          <span class="text-[var(--color-bark)]/30 text-xs">›</span>
          <span class="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-bark)]/60">Collections</span>
        </div>
        <h1 class="font-serif text-[clamp(2.5rem,5vw,4rem)] text-[var(--color-bark)] mb-4">All Collections</h1>
        <div class="wood-rule" />
        <p class="font-sans text-sm text-[var(--color-bark)]/60 max-w-lg leading-relaxed">Browse every category — from dining and living to bedroom and workspace. Each piece is built from solid wood in our Hadapsar workshop.</p>
      </div>
    </div>

    <div class="section bg-[var(--color-warm-white)]">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="n in 6" :key="n" class="aspect-[4/3] bg-[var(--color-linen)] animate-pulse" />
        </div>
        <div v-else-if="!categories?.length" class="text-center py-24">
          <div class="font-serif text-6xl text-[var(--color-linen)] mb-6">∅</div>
          <h2 class="font-serif text-2xl text-[var(--color-bark)] mb-3">Collections coming soon</h2>
          <p class="font-sans text-sm text-[var(--color-bark)]/60 mb-8">Visit our showroom in the meantime — we'd love to show you what we have on the floor.</p>
          <NuxtLink to="/#contact" class="btn-primary">Contact Us</NuxtLink>
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink v-for="cat in categories" :key="cat.id" :to="`/collections/${cat.slug}`" class="group block reveal">
            <div class="relative overflow-hidden aspect-[4/3] img-hover mb-4">
              <img v-if="cat.cover_image" :src="cat.cover_image" :alt="cat.name" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full bg-[var(--color-linen)] flex items-center justify-center">
                <span class="font-serif text-6xl text-[var(--color-clay)]/30">{{ cat.name[0] }}</span>
              </div>
              <div v-if="cat.featured" class="absolute top-3 left-3 bg-[var(--color-clay)] text-[var(--color-sand-light)] font-sans text-[8px] tracking-[0.2em] uppercase px-2 py-1">Featured</div>
            </div>
            <div class="flex items-start justify-between">
              <div>
                <h2 class="font-serif text-xl text-[var(--color-bark)] group-hover:text-[var(--color-clay)] transition-colors mb-1">{{ cat.name }}</h2>
                <p v-if="cat.description" class="font-sans text-xs text-[var(--color-bark)]/55 leading-relaxed">{{ cat.description }}</p>
              </div>
              <span class="font-sans text-[10px] tracking-[0.15em] uppercase text-[var(--color-clay)] bg-[var(--color-linen)] px-2 py-1 ml-3 flex-shrink-0 mt-1">{{ cat.product_count }} pieces</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="bg-[var(--color-bark)] py-16">
      <div class="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 class="font-serif text-2xl text-[var(--color-sand-light)] mb-2">Can't find what you're looking for?</h2>
          <p class="font-sans text-sm text-[var(--color-sand)]/60">We build bespoke pieces too — bring us your idea and we'll make it real.</p>
        </div>
        <NuxtLink to="/#contact" class="btn-primary flex-shrink-0" style="border-color:var(--color-clay);background:var(--color-clay);">Enquire About Custom Orders</NuxtLink>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
const { data: categories, pending } = await useFetch('/api/categories')
useSeoMeta({ title:'All Collections — Sawariya Seth Furniture', description:'Browse all furniture collections from Sawariya Seth Furniture, Pune.' })
useScrollReveal()
</script>
