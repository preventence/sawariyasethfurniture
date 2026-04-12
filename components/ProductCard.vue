<template>
  <NuxtLink :to="`/products/${product.slug}`" class="product-card group block reveal">
    <div class="relative overflow-hidden aspect-[4/3] img-hover">
      <img v-if="product.cover_image" :src="product.cover_image" :alt="product.name" class="w-full h-full object-cover" />
      <div v-else class="w-full h-full bg-[var(--color-linen)] flex items-center justify-center">
        <span class="font-serif text-4xl text-[var(--color-clay)]/30">{{ product.name[0] }}</span>
      </div>
      <div v-if="product.featured" class="absolute top-3 left-3 bg-[var(--color-clay)] text-[var(--color-sand-light)] font-sans text-[8px] tracking-[0.2em] uppercase px-2 py-1">Featured</div>
      <div v-if="product.custom_order" class="absolute top-3 right-3 bg-[var(--color-bark)] text-[var(--color-sand-light)] font-sans text-[8px] tracking-[0.15em] uppercase px-2 py-1">Custom</div>
    </div>
    <div class="p-5">
      <p class="font-sans text-[9px] tracking-[0.22em] uppercase text-[var(--color-clay)] mb-1">{{ product.category_name || product.material }}</p>
      <h3 class="font-serif text-lg text-[var(--color-bark)] mb-2 group-hover:text-[var(--color-clay)] transition-colors">{{ product.name }}</h3>
      <div class="flex items-center justify-between">
        <span v-if="product.price_on_request" class="font-sans text-xs text-[var(--color-bark)]/60 italic">Price on request</span>
        <span v-else-if="product.price" class="font-sans text-sm font-medium text-[var(--color-bark)]">₹{{ Number(product.price).toLocaleString('en-IN') }}</span>
        <span v-else class="font-sans text-xs text-[var(--color-bark)]/60 italic">Price on request</span>
        <span class="font-sans text-[9px] tracking-[0.15em] uppercase text-[var(--color-clay)] flex items-center gap-1">View <ArrowRightIcon :size="11" /></span>
      </div>
    </div>
  </NuxtLink>
</template>
<script setup lang="ts">
import { ArrowRightIcon } from 'lucide-vue-next'
defineProps<{ product: any }>()
</script>
