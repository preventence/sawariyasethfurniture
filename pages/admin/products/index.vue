<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="font-serif text-3xl text-[var(--color-bark)] mb-1">Products</h1>
        <p class="font-sans text-sm text-[var(--color-bark)]/50">{{ products?.length || 0 }} products across all categories</p>
      </div>
      <NuxtLink to="/admin/products/new" class="btn-primary text-sm py-3 px-5"><PlusIcon :size="14" /> Add Product</NuxtLink>
    </div>

    <!-- Filters -->
    <div class="flex flex-col sm:flex-row gap-3 mb-6">
      <div class="relative flex-1">
        <SearchIcon :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-clay)]" />
        <input v-model="search" type="text" placeholder="Search products…" class="admin-input pl-9" />
      </div>
      <select v-model="filterCat" class="admin-input admin-select w-full sm:w-56">
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
      </select>
    </div>

    <div v-if="pending" class="space-y-3">
      <div v-for="n in 5" :key="n" class="h-16 bg-[var(--color-linen)] animate-pulse" />
    </div>

    <div v-else-if="!filteredProducts.length" class="text-center py-20 bg-white border border-[var(--color-linen)]">
      <PackageIcon :size="32" class="text-[var(--color-clay)]/40 mx-auto mb-4" />
      <p class="font-serif text-xl text-[var(--color-bark)] mb-2">{{ search || filterCat ? 'No products match your filters' : 'No products yet' }}</p>
      <NuxtLink v-if="!search && !filterCat" to="/admin/products/new" class="btn-primary mt-4 inline-flex">Add First Product</NuxtLink>
      <button v-else @click="search='';filterCat=''" class="btn-outline mt-4">Clear Filters</button>
    </div>

    <div v-else class="bg-white border border-[var(--color-linen)] overflow-hidden">
      <table class="w-full">
        <thead class="bg-[var(--color-linen)]/50">
          <tr>
            <th class="font-sans text-[10px] tracking-[0.15em] uppercase text-[var(--color-bark)]/50 text-left px-4 py-3">Product</th>
            <th class="font-sans text-[10px] tracking-[0.15em] uppercase text-[var(--color-bark)]/50 text-left px-4 py-3 hidden md:table-cell">Category</th>
            <th class="font-sans text-[10px] tracking-[0.15em] uppercase text-[var(--color-bark)]/50 text-left px-4 py-3 hidden sm:table-cell">Price</th>
            <th class="font-sans text-[10px] tracking-[0.15em] uppercase text-[var(--color-bark)]/50 text-left px-4 py-3 hidden lg:table-cell">Status</th>
            <th class="font-sans text-[10px] tracking-[0.15em] uppercase text-[var(--color-bark)]/50 text-right px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in filteredProducts" :key="p.id" class="border-t border-[var(--color-linen)]/60 hover:bg-[var(--color-linen)]/20 transition-colors">
            <td class="px-4 py-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 flex-shrink-0 overflow-hidden bg-[var(--color-linen)]">
                  <img v-if="p.cover_image" :src="p.cover_image" :alt="p.name" class="w-full h-full object-cover" />
                  <div v-else class="w-full h-full flex items-center justify-center"><span class="font-serif text-base text-[var(--color-clay)]/30">{{ p.name[0] }}</span></div>
                </div>
                <div>
                  <p class="font-sans text-sm font-medium text-[var(--color-bark)]">{{ p.name }}</p>
                  <p v-if="p.material" class="font-sans text-xs text-[var(--color-bark)]/45">{{ p.material }}</p>
                </div>
              </div>
            </td>
            <td class="px-4 py-3 hidden md:table-cell">
              <span class="font-sans text-xs text-[var(--color-bark)]/60">{{ p.category_name }}</span>
            </td>
            <td class="px-4 py-3 hidden sm:table-cell">
              <span v-if="p.price_on_request" class="font-sans text-xs text-[var(--color-bark)]/50 italic">On request</span>
              <span v-else class="font-sans text-sm text-[var(--color-bark)]">₹{{ Number(p.price).toLocaleString('en-IN') }}</span>
            </td>
            <td class="px-4 py-3 hidden lg:table-cell">
              <div class="flex items-center gap-2 flex-wrap">
                <span v-if="p.featured" class="font-sans text-[8px] tracking-[0.12em] uppercase bg-[var(--color-clay)] text-[var(--color-sand-light)] px-1.5 py-0.5">Featured</span>
                <span v-if="p.custom_order" class="font-sans text-[8px] tracking-[0.12em] uppercase bg-[var(--color-bark)] text-[var(--color-sand-light)] px-1.5 py-0.5">Custom</span>
                <span :class="['font-sans text-[8px] tracking-[0.12em] uppercase px-1.5 py-0.5', p.in_stock ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600']">{{ p.in_stock ? 'In Stock' : 'MTO' }}</span>
              </div>
            </td>
            <td class="px-4 py-3 text-right">
              <div class="flex items-center justify-end gap-1">
                <NuxtLink :to="`/products/${p.slug}`" target="_blank" class="p-2 text-[var(--color-bark)]/40 hover:text-[var(--color-clay)] transition-colors" title="View"><ExternalLinkIcon :size="14" /></NuxtLink>
                <NuxtLink :to="`/admin/products/${p.id}/edit`" class="p-2 text-[var(--color-bark)]/40 hover:text-[var(--color-clay)] transition-colors" title="Edit"><PencilIcon :size="14" /></NuxtLink>
                <button @click="confirmDelete(p)" class="p-2 text-[var(--color-bark)]/40 hover:text-red-500 transition-colors" title="Delete"><TrashIcon :size="14" /></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Delete confirm -->
    <div v-if="deleteTarget" class="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-bark)]/60 px-4">
      <div class="bg-white w-full max-w-sm p-8 text-center">
        <TrashIcon :size="28" class="text-red-400 mx-auto mb-4" />
        <h3 class="font-serif text-xl text-[var(--color-bark)] mb-2">Delete "{{ deleteTarget.name }}"?</h3>
        <p class="font-sans text-sm text-[var(--color-bark)]/60 mb-6">All images will be removed. This cannot be undone.</p>
        <div class="flex gap-3 justify-center">
          <button @click="doDelete" class="btn-primary text-sm" style="background:#ef4444;border-color:#ef4444;" :disabled="deleting">{{ deleting ? 'Deleting…' : 'Yes, Delete' }}</button>
          <button @click="deleteTarget = null" class="btn-outline text-sm">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PlusIcon, SearchIcon, PencilIcon, TrashIcon, PackageIcon, ExternalLinkIcon } from 'lucide-vue-next'
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: products, pending, refresh } = await useFetch('/api/admin/products')
const { data: categories } = await useFetch('/api/admin/categories')
const search = ref(''); const filterCat = ref('')
const deleteTarget = ref<any>(null); const deleting = ref(false)

const filteredProducts = computed(() => {
  let list = [...((products.value as any[]) || [])]
  if (search.value) { const q = search.value.toLowerCase(); list = list.filter((p:any) => p.name.toLowerCase().includes(q) || (p.material||'').toLowerCase().includes(q)) }
  if (filterCat.value) list = list.filter((p:any) => p.category_id == filterCat.value)
  return list
})

const confirmDelete = (p: any) => { deleteTarget.value = p }
const doDelete = async () => {
  if (!deleteTarget.value) return
  deleting.value = true
  try { await $fetch(`/api/admin/products/${deleteTarget.value.id}`, { method: 'DELETE' }); await refresh(); deleteTarget.value = null }
  finally { deleting.value = false }
}
</script>
