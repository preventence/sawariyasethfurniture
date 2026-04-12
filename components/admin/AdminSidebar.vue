<template>
  <aside class="w-64 bg-[var(--color-bark)] flex flex-col min-h-screen flex-shrink-0 hidden lg:flex">
    <div class="px-7 py-7 border-b border-[var(--color-sand)]/10">
      <div class="font-serif text-xl text-[var(--color-sand-light)]">Sawariya Seth Furniture</div>
      <div class="font-sans text-[8px] tracking-[0.25em] uppercase text-[var(--color-clay-light)] mt-0.5">Admin Dashboard</div>
    </div>

    <nav class="flex-1 px-4 py-6 space-y-1">
      <NuxtLink
        v-for="item in navItems"
        :key="item.href"
        :to="item.href"
        class="flex items-center justify-between px-3 py-2.5 rounded-sm font-sans text-sm transition-colors duration-200"
        :class="isActive(item.href)
          ? 'bg-[var(--color-clay)] text-[var(--color-sand-light)]'
          : 'text-[var(--color-sand)]/60 hover:text-[var(--color-sand-light)] hover:bg-[var(--color-sand)]/5'"
      >
        <div class="flex items-center gap-3">
          <component :is="item.icon" :size="16" />
          {{ item.label }}
        </div>
        <!-- Unread badge for enquiries -->
        <span
          v-if="item.badge && unreadCount > 0"
          class="bg-[var(--color-clay)] text-[var(--color-sand-light)] font-sans text-[10px] font-medium px-1.5 py-0.5 rounded-full min-w-[20px] text-center"
          :class="isActive(item.href) ? 'bg-white/30' : ''"
        >
          {{ unreadCount }}
        </span>
      </NuxtLink>
    </nav>

    <div class="px-4 py-6 border-t border-[var(--color-sand)]/10 space-y-2">
      <NuxtLink to="/" target="_blank" class="flex items-center gap-3 px-3 py-2.5 text-[var(--color-sand)]/50 hover:text-[var(--color-sand-light)] font-sans text-sm transition-colors">
        <ExternalLinkIcon :size="16" />View Site
      </NuxtLink>
      <button @click="logout" class="flex items-center gap-3 px-3 py-2.5 text-[var(--color-sand)]/50 hover:text-red-400 font-sans text-sm transition-colors w-full">
        <LogOutIcon :size="16" />Log Out
      </button>
    </div>
  </aside>
</template>
<script setup lang="ts">
import { LayoutDashboardIcon, TagIcon, PackageIcon, MailIcon, ExternalLinkIcon, LogOutIcon } from 'lucide-vue-next'
const route = useRoute()
const { logout } = useAdminAuth()

// Poll unread count every 60s
const { data: stats } = await useFetch('/api/admin/stats', { server: false })
const unreadCount = computed(() => (stats.value as any)?.unreadEnquiries || 0)

const navItems = [
  { href: '/admin/dashboard',  label: 'Dashboard',  icon: LayoutDashboardIcon },
  { href: '/admin/categories', label: 'Categories', icon: TagIcon },
  { href: '/admin/products',   label: 'Products',   icon: PackageIcon },
  { href: '/admin/enquiries',  label: 'Enquiries',  icon: MailIcon, badge: true },
]
const isActive = (href: string) => route.path.startsWith(href)
</script>
