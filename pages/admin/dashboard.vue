<template>
  <div>
    <div class="mb-8">
      <h1 class="font-serif text-3xl text-[var(--color-bark)] mb-1">Dashboard</h1>
      <p class="font-sans text-sm text-[var(--color-bark)]/50">Welcome back. Here's your store at a glance.</p>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
      <div class="bg-white border border-[var(--color-linen)] p-6">
        <p class="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-clay)] mb-2">Categories</p>
        <p class="font-serif text-4xl text-[var(--color-bark)]">{{ stats?.totalCategories ?? '—' }}</p>
      </div>
      <div class="bg-white border border-[var(--color-linen)] p-6">
        <p class="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-clay)] mb-2">Products</p>
        <p class="font-serif text-4xl text-[var(--color-bark)]">{{ stats?.totalProducts ?? '—' }}</p>
      </div>
      <div class="bg-white border border-[var(--color-linen)] p-6">
        <p class="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-clay)] mb-2">Enquiries</p>
        <p class="font-serif text-4xl text-[var(--color-bark)]">{{ stats?.totalEnquiries ?? '—' }}</p>
      </div>
      <NuxtLink to="/admin/enquiries" class="bg-white border p-6 hover:border-[var(--color-clay)] transition-colors"
        :class="stats?.unreadEnquiries ? 'border-[var(--color-clay)]/60 border-l-4' : 'border-[var(--color-linen)]'">
        <p class="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-clay)] mb-2">Unread</p>
        <p class="font-serif text-4xl" :class="stats?.unreadEnquiries ? 'text-[var(--color-clay)]' : 'text-[var(--color-bark)]'">
          {{ stats?.unreadEnquiries ?? '—' }}
        </p>
      </NuxtLink>
    </div>

    <!-- Quick actions -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
      <NuxtLink to="/admin/categories" class="bg-white border border-[var(--color-linen)] p-6 hover:border-[var(--color-clay)] transition-colors">
        <TagIcon :size="20" class="text-[var(--color-clay)] mb-3" />
        <h3 class="font-sans text-sm font-medium text-[var(--color-bark)] mb-1">Manage Categories</h3>
        <p class="font-sans text-xs text-[var(--color-bark)]/50">Add, edit or reorder your collections</p>
      </NuxtLink>
      <NuxtLink to="/admin/products/new" class="bg-white border border-[var(--color-linen)] p-6 hover:border-[var(--color-clay)] transition-colors">
        <PackageIcon :size="20" class="text-[var(--color-clay)] mb-3" />
        <h3 class="font-sans text-sm font-medium text-[var(--color-bark)] mb-1">Add New Product</h3>
        <p class="font-sans text-xs text-[var(--color-bark)]/50">Upload photos, set price, add to a collection</p>
      </NuxtLink>
      <NuxtLink to="/admin/enquiries" class="bg-white border p-6 hover:border-[var(--color-clay)] transition-colors relative"
        :class="stats?.unreadEnquiries ? 'border-[var(--color-clay)]/50' : 'border-[var(--color-linen)]'">
        <MailIcon :size="20" class="text-[var(--color-clay)] mb-3" />
        <h3 class="font-sans text-sm font-medium text-[var(--color-bark)] mb-1">View Enquiries</h3>
        <p class="font-sans text-xs text-[var(--color-bark)]/50">Customer messages from your website form</p>
        <span v-if="stats?.unreadEnquiries" class="absolute top-4 right-4 bg-[var(--color-clay)] text-[var(--color-sand-light)] font-sans text-[10px] font-medium px-2 py-0.5 rounded-full">
          {{ stats.unreadEnquiries }} new
        </span>
      </NuxtLink>
    </div>

    <!-- Recent products -->
    <div class="bg-white border border-[var(--color-linen)] p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-sans text-sm font-medium text-[var(--color-bark)] tracking-wide">Recent Products</h2>
        <NuxtLink to="/admin/products" class="font-sans text-xs text-[var(--color-clay)] hover:text-[var(--color-bark)] transition-colors">View all →</NuxtLink>
      </div>
      <div v-if="!stats?.recentProducts?.length" class="text-center py-8">
        <p class="font-sans text-sm text-[var(--color-bark)]/40">No products yet.</p>
        <NuxtLink to="/admin/products/new" class="btn-primary text-xs mt-4 inline-flex">Add First Product</NuxtLink>
      </div>
      <table v-else class="w-full">
        <thead>
          <tr class="border-b border-[var(--color-linen)]">
            <th class="font-sans text-[10px] tracking-[0.15em] uppercase text-[var(--color-bark)]/50 text-left pb-3">Name</th>
            <th class="font-sans text-[10px] tracking-[0.15em] uppercase text-[var(--color-bark)]/50 text-left pb-3 hidden sm:table-cell">Category</th>
            <th class="font-sans text-[10px] tracking-[0.15em] uppercase text-[var(--color-bark)]/50 text-right pb-3">Added</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in stats.recentProducts" :key="p.id" class="border-b border-[var(--color-linen)]/60 last:border-0">
            <td class="py-3 pr-4">
              <NuxtLink :to="`/admin/products/${p.id}/edit`" class="font-sans text-sm text-[var(--color-bark)] hover:text-[var(--color-clay)] transition-colors">{{ p.name }}</NuxtLink>
            </td>
            <td class="py-3 pr-4 hidden sm:table-cell font-sans text-xs text-[var(--color-bark)]/55">{{ p.category_name }}</td>
            <td class="py-3 font-sans text-xs text-[var(--color-bark)]/40 text-right">{{ new Date(p.created_at).toLocaleDateString('en-IN') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { TagIcon, PackageIcon, MailIcon } from 'lucide-vue-next'
definePageMeta({ layout: 'admin', middleware: 'admin' })
const { data: stats } = await useFetch('/api/admin/stats')
</script>
