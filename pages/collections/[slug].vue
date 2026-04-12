<template>
  <main class="pt-20">
    <!-- Header -->
    <div class="bg-[var(--color-linen)] py-16 lg:py-20">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div class="flex items-center gap-3 mb-4">
          <NuxtLink to="/" class="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-clay)] hover:text-[var(--color-bark)] transition-colors">Home</NuxtLink>
          <span class="text-[var(--color-bark)]/30 text-xs">›</span>
          <NuxtLink to="/collections" class="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-clay)] hover:text-[var(--color-bark)] transition-colors">Collections</NuxtLink>
          <span class="text-[var(--color-bark)]/30 text-xs">›</span>
          <span class="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-bark)]/60">{{ category?.name }}</span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div>
            <h1 class="font-serif text-[clamp(2.2rem,5vw,3.5rem)] text-[var(--color-bark)] mb-4">{{ category?.name }}</h1>
            <div class="wood-rule" />
            <p v-if="category?.description" class="font-sans text-sm text-[var(--color-bark)]/65 leading-relaxed">{{ category.description }}</p>
          </div>
          <div class="flex flex-col sm:flex-row gap-4 lg:justify-end">
            <!-- Search -->
            <div class="relative">
              <SearchIcon :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-clay)]" />
              <input v-model="search" type="text" placeholder="Search products…" class="font-sans text-sm border border-[var(--color-bark)]/20 bg-white pl-9 pr-4 py-2.5 w-full sm:w-64 outline-none focus:border-[var(--color-clay)] transition-colors" />
            </div>
            <!-- Sort -->
            <select v-model="sort" class="font-sans text-sm border border-[var(--color-bark)]/20 bg-white px-4 py-2.5 outline-none focus:border-[var(--color-clay)] appearance-none">
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Products -->
    <div class="section bg-[var(--color-warm-white)]">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="n in 6" :key="n" class="aspect-[4/3] bg-[var(--color-linen)] animate-pulse" />
        </div>
        <div v-else-if="!filteredProducts.length" class="text-center py-24">
          <p class="font-serif text-xl text-[var(--color-bark)]/50 mb-4">No products found{{ search ? ' for "' + search + '"' : '' }}</p>
          <button v-if="search" @click="search = ''" class="btn-outline text-sm">Clear Search</button>
        </div>
        <div v-else>
          <p class="font-sans text-xs text-[var(--color-bark)]/40 mb-8 tracking-[0.1em]">{{ filteredProducts.length }} {{ filteredProducts.length === 1 ? 'piece' : 'pieces' }}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
          </div>
        </div>
      </div>
    </div>

    <!-- Related categories -->
    <div v-if="otherCategories?.length" class="section bg-[var(--color-linen)]">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <p class="font-sans text-[10px] tracking-[0.28em] uppercase text-[var(--color-clay)] mb-3">Explore More</p>
        <h2 class="font-serif text-2xl text-[var(--color-bark)] mb-8">Other Collections</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <NuxtLink v-for="cat in otherCategories.slice(0,4)" :key="cat.id" :to="`/collections/${cat.slug}`" class="group">
            <div class="aspect-square overflow-hidden img-hover mb-3">
              <img v-if="cat.cover_image" :src="cat.cover_image" :alt="cat.name" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full bg-[var(--color-sand)] flex items-center justify-center">
                <span class="font-serif text-4xl text-[var(--color-clay)]/30">{{ cat.name[0] }}</span>
              </div>
            </div>
            <p class="font-serif text-base text-[var(--color-bark)] group-hover:text-[var(--color-clay)] transition-colors">{{ cat.name }}</p>
            <p class="font-sans text-xs text-[var(--color-bark)]/40">{{ cat.product_count }} pieces</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next'
const route = useRoute()
const slug = computed(() => route.params.slug as string)
const search = ref('')
const sort = ref('default')

const { data: category } = await useFetch(() => `/api/categories/${slug.value}`)
const { data: products, pending } = await useFetch('/api/products', { query: { category: slug } })
const { data: allCategories } = await useFetch('/api/categories')

const otherCategories = computed(() => (allCategories.value as any[])?.filter((c: any) => c.slug !== slug.value) || [])

const filteredProducts = computed(() => {
  let list = [...((products.value as any[]) || [])]
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter((p: any) => p.name.toLowerCase().includes(q) || (p.material || '').toLowerCase().includes(q))
  }
  if (sort.value === 'price-asc') list.sort((a: any, b: any) => (a.price || 0) - (b.price || 0))
  else if (sort.value === 'price-desc') list.sort((a: any, b: any) => (b.price || 0) - (a.price || 0))
  else if (sort.value === 'name') list.sort((a: any, b: any) => a.name.localeCompare(b.name))
  return list
})

useSeoMeta({
  title: computed(() => `${category.value?.name || 'Collection'} — Sawariya Seth Furniture`),
  description: computed(() => category.value?.description || 'Handcrafted furniture from Sawariya Seth Furniture, Ajmer.'),
})
useScrollReveal()
</script>
