<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="font-serif text-3xl text-[var(--color-bark)] mb-1">Enquiries</h1>
        <p class="font-sans text-sm text-[var(--color-bark)]/50">
          {{ enquiries?.length || 0 }} total ·
          <span class="text-[var(--color-clay)] font-medium">{{ unread }} unread</span>
        </p>
      </div>
      <button v-if="unread > 0" @click="markAllRead" class="btn-outline text-sm py-2 px-4">
        Mark All as Read
      </button>
    </div>

    <div v-if="pending" class="space-y-3">
      <div v-for="n in 5" :key="n" class="h-20 bg-[var(--color-linen)] animate-pulse" />
    </div>

    <div v-else-if="!enquiries?.length" class="text-center py-24 bg-white border border-[var(--color-linen)]">
      <MailIcon :size="32" class="text-[var(--color-clay)]/40 mx-auto mb-4" />
      <p class="font-serif text-xl text-[var(--color-bark)] mb-2">No enquiries yet</p>
      <p class="font-sans text-sm text-[var(--color-bark)]/50">Submissions from your website contact form will appear here.</p>
    </div>

    <div v-else class="space-y-2">
      <div
        v-for="enq in enquiries"
        :key="enq.id"
        :class="['bg-white border transition-colors', !enq.read ? 'border-[var(--color-clay)]/50 border-l-4' : 'border-[var(--color-linen)]']"
      >
        <!-- Collapsed header -->
        <div
          class="flex items-center gap-4 p-4 cursor-pointer hover:bg-[var(--color-linen)]/30 transition-colors"
          @click="toggle(enq.id)"
        >
          <!-- Unread dot -->
          <div :class="['w-2 h-2 rounded-full flex-shrink-0', !enq.read ? 'bg-[var(--color-clay)]' : 'bg-transparent']" />

          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-3 flex-wrap">
              <span class="font-sans text-sm font-medium text-[var(--color-bark)]">
                {{ enq.first_name }} {{ enq.last_name }}
              </span>
              <span v-if="enq.interest || enq.product" class="font-sans text-[10px] tracking-[0.12em] uppercase bg-[var(--color-linen)] text-[var(--color-clay)] px-2 py-0.5">
                {{ enq.product || enq.interest }}
              </span>
            </div>
            <div class="flex items-center gap-4 mt-0.5">
              <a :href="`mailto:${enq.email}`" class="font-sans text-xs text-[var(--color-clay)] hover:underline" @click.stop>
                {{ enq.email }}
              </a>
              <span v-if="enq.phone" class="font-sans text-xs text-[var(--color-bark)]/50">{{ enq.phone }}</span>
            </div>
          </div>

          <div class="flex items-center gap-3 flex-shrink-0">
            <span class="font-sans text-xs text-[var(--color-bark)]/40">
              {{ formatDate(enq.created_at) }}
            </span>
            <ChevronDownIcon :size="14" :class="['text-[var(--color-bark)]/40 transition-transform', expanded === enq.id ? 'rotate-180' : '']" />
          </div>
        </div>

        <!-- Expanded detail -->
        <div v-if="expanded === enq.id" class="border-t border-[var(--color-linen)] px-6 py-5">
          <p v-if="enq.message" class="font-sans text-sm text-[var(--color-bark)]/75 leading-relaxed mb-5 whitespace-pre-wrap">{{ enq.message }}</p>
          <p v-else class="font-sans text-sm text-[var(--color-bark)]/40 italic mb-5">No message provided.</p>

          <div class="flex items-center gap-3 flex-wrap">
            <a :href="`mailto:${enq.email}?subject=Re: your enquiry about ${enq.product || enq.interest}`"
              class="btn-primary text-xs py-2 px-4">
              Reply via Email
              <MailIcon :size="12" />
            </a>
            <button
              @click="toggleRead(enq)"
              class="btn-outline text-xs py-2 px-4">
              {{ enq.read ? 'Mark as Unread' : 'Mark as Read' }}
            </button>
            <button
              @click="deleteEnquiry(enq)"
              class="font-sans text-xs text-red-400 hover:text-red-600 transition-colors ml-auto">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MailIcon, ChevronDownIcon } from 'lucide-vue-next'
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: enquiries, pending, refresh } = await useFetch('/api/admin/enquiries')
const expanded = ref<number | null>(null)

const unread = computed(() => ((enquiries.value as any[]) || []).filter((e: any) => !e.read).length)

const toggle = async (id: number) => {
  if (expanded.value === id) {
    expanded.value = null
    return
  }
  expanded.value = id
  // Auto-mark as read when opened
  const enq = (enquiries.value as any[]).find((e: any) => e.id === id)
  if (enq && !enq.read) await toggleRead(enq)
}

const toggleRead = async (enq: any) => {
  await $fetch(`/api/admin/enquiries/${enq.id}`, { method: 'PATCH', body: { read: !enq.read } })
  await refresh()
}

const markAllRead = async () => {
  const unreadList = ((enquiries.value as any[]) || []).filter((e: any) => !e.read)
  await Promise.all(unreadList.map((e: any) =>
    $fetch(`/api/admin/enquiries/${e.id}`, { method: 'PATCH', body: { read: true } })
  ))
  await refresh()
}

const deleteEnquiry = async (enq: any) => {
  if (!confirm(`Delete enquiry from ${enq.first_name}?`)) return
  await $fetch(`/api/admin/enquiries/${enq.id}`, { method: 'DELETE' })
  expanded.value = null
  await refresh()
}

const formatDate = (str: string) => {
  const d = new Date(str)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}
</script>