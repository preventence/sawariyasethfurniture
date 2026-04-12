<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="font-serif text-3xl text-[var(--color-bark)] mb-1">Categories</h1>
        <p class="font-sans text-sm text-[var(--color-bark)]/50">Manage your furniture collections</p>
      </div>
      <button @click="openCreate" class="btn-primary text-sm py-3 px-5">
        <PlusIcon :size="14" /> Add Category
      </button>
    </div>

    <!-- List -->
    <div v-if="pending" class="space-y-3">
      <div v-for="n in 4" :key="n" class="h-16 bg-[var(--color-linen)] animate-pulse" />
    </div>

    <div v-else-if="!categories?.length" class="text-center py-20 bg-white border border-[var(--color-linen)]">
      <TagIcon :size="32" class="text-[var(--color-clay)]/40 mx-auto mb-4" />
      <p class="font-serif text-xl text-[var(--color-bark)] mb-2">No categories yet</p>
      <p class="font-sans text-sm text-[var(--color-bark)]/50 mb-6">Create your first collection to start adding products.</p>
      <button @click="openCreate" class="btn-primary">Add First Category</button>
    </div>

    <div v-else class="space-y-2">
      <div v-for="cat in categories" :key="cat.id" class="bg-white border border-[var(--color-linen)] hover:border-[var(--color-clay)]/40 transition-colors p-4 flex items-center gap-4">
        <!-- Cover thumb -->
        <div class="w-14 h-14 flex-shrink-0 overflow-hidden bg-[var(--color-linen)]">
          <img v-if="cat.cover_image" :src="cat.cover_image" :alt="cat.name" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full flex items-center justify-center">
            <span class="font-serif text-xl text-[var(--color-clay)]/30">{{ cat.name[0] }}</span>
          </div>
        </div>
        <!-- Info -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-0.5">
            <span class="font-sans text-sm font-medium text-[var(--color-bark)]">{{ cat.name }}</span>
            <span v-if="cat.featured" class="font-sans text-[8px] tracking-[0.15em] uppercase bg-[var(--color-clay)] text-[var(--color-sand-light)] px-1.5 py-0.5">Featured</span>
          </div>
          <span class="font-sans text-xs text-[var(--color-bark)]/45">{{ cat.product_count }} products · /collections/{{ cat.slug }}</span>
        </div>
        <!-- Actions -->
        <div class="flex items-center gap-2 flex-shrink-0">
          <NuxtLink :to="`/collections/${cat.slug}`" target="_blank" class="p-2 text-[var(--color-bark)]/40 hover:text-[var(--color-clay)] transition-colors" title="View on site">
            <ExternalLinkIcon :size="14" />
          </NuxtLink>
          <button @click="openEdit(cat)" class="p-2 text-[var(--color-bark)]/40 hover:text-[var(--color-clay)] transition-colors" title="Edit">
            <PencilIcon :size="14" />
          </button>
          <button @click="confirmDelete(cat)" class="p-2 text-[var(--color-bark)]/40 hover:text-red-500 transition-colors" title="Delete">
            <TrashIcon :size="14" />
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-bark)]/60 px-4">
      <div class="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto p-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="font-serif text-2xl text-[var(--color-bark)]">{{ editingCat ? 'Edit Category' : 'New Category' }}</h2>
          <button @click="closeModal" class="text-[var(--color-bark)]/40 hover:text-[var(--color-bark)]"><XIcon :size="20" /></button>
        </div>

        <form @submit.prevent="saveCategory" class="space-y-5">
          <div>
            <label class="admin-label">Category Name *</label>
            <input v-model="form.name" type="text" class="admin-input" placeholder="e.g. Dining Room" required />
          </div>
          <div>
            <label class="admin-label">Description</label>
            <textarea v-model="form.description" class="admin-input resize-none" rows="3" placeholder="Brief description shown on the collections page…" />
          </div>
          <div>
            <label class="admin-label">Cover Image</label>
            <div class="flex gap-3 items-start">
              <input v-model="form.cover_image" type="text" class="admin-input" placeholder="Paste image URL or upload below" />
            </div>
            <!-- Upload -->
            <div class="mt-2">
              <label class="flex items-center gap-2 cursor-pointer font-sans text-xs text-[var(--color-clay)] hover:text-[var(--color-bark)] transition-colors">
                <UploadIcon :size="13" />
                <span>{{ uploading ? 'Uploading…' : 'Upload image from device' }}</span>
                <input type="file" class="hidden" accept="image/*" @change="handleUpload" :disabled="uploading" />
              </label>
            </div>
            <div v-if="form.cover_image" class="mt-3 w-24 h-24 overflow-hidden">
              <img :src="form.cover_image" alt="Preview" class="w-full h-full object-cover" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="admin-label">Sort Order</label>
              <input v-model.number="form.sort_order" type="number" class="admin-input" placeholder="0" min="0" />
            </div>
            <div class="flex items-end pb-1">
              <label class="flex items-center gap-3 cursor-pointer">
                <div @click="form.featured = !form.featured" :class="['w-10 h-6 rounded-full transition-colors relative cursor-pointer', form.featured ? 'bg-[var(--color-clay)]' : 'bg-[var(--color-bark)]/20']">
                  <div :class="['absolute top-1 w-4 h-4 bg-white rounded-full transition-transform', form.featured ? 'translate-x-5' : 'translate-x-1']" />
                </div>
                <span class="font-sans text-sm text-[var(--color-bark)]">Featured on homepage</span>
              </label>
            </div>
          </div>
          <p v-if="saveError" class="font-sans text-xs text-red-600">{{ saveError }}</p>
          <div class="flex gap-3 pt-2">
            <button type="submit" class="btn-primary flex-1 justify-center" :disabled="saving">
              <span v-if="saving" class="animate-pulse">Saving…</span>
              <template v-else>{{ editingCat ? 'Save Changes' : 'Create Category' }}</template>
            </button>
            <button type="button" @click="closeModal" class="btn-outline px-6">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete confirm -->
    <div v-if="deleteTarget" class="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-bark)]/60 px-4">
      <div class="bg-white w-full max-w-sm p-8 text-center">
        <TrashIcon :size="28" class="text-red-400 mx-auto mb-4" />
        <h3 class="font-serif text-xl text-[var(--color-bark)] mb-2">Delete "{{ deleteTarget.name }}"?</h3>
        <p class="font-sans text-sm text-[var(--color-bark)]/60 mb-6">This will also delete all products in this category. This cannot be undone.</p>
        <div class="flex gap-3 justify-center">
          <button @click="doDelete" class="btn-primary text-sm" style="background:#ef4444;border-color:#ef4444;" :disabled="deleting">{{ deleting ? 'Deleting…' : 'Yes, Delete' }}</button>
          <button @click="deleteTarget = null" class="btn-outline text-sm">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PlusIcon, PencilIcon, TrashIcon, TagIcon, XIcon, ExternalLinkIcon, UploadIcon } from 'lucide-vue-next'
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: categories, pending, refresh } = await useFetch('/api/admin/categories')
const { uploading, uploadImage } = useImageUpload()

const showModal = ref(false)
const editingCat = ref<any>(null)
const saving = ref(false)
const saveError = ref('')
const deleteTarget = ref<any>(null)
const deleting = ref(false)

const form = reactive({ name: '', description: '', cover_image: '', sort_order: 0, featured: false })

const openCreate = () => { editingCat.value = null; Object.assign(form, { name:'', description:'', cover_image:'', sort_order:0, featured:false }); showModal.value = true }
const openEdit = (cat: any) => { editingCat.value = cat; Object.assign(form, { name:cat.name, description:cat.description, cover_image:cat.cover_image, sort_order:cat.sort_order, featured:!!cat.featured }); showModal.value = true }
const closeModal = () => { showModal.value = false; saveError.value = '' }

const handleUpload = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const url = await uploadImage(file)
  if (url) form.cover_image = url
}

const saveCategory = async () => {
  saving.value = true; saveError.value = ''
  try {
    if (editingCat.value) {
      await $fetch(`/api/admin/categories/${editingCat.value.id}`, { method: 'PATCH', body: form })
    } else {
      await $fetch('/api/admin/categories', { method: 'POST', body: form })
    }
    await refresh(); closeModal()
  } catch (e: any) { saveError.value = e?.data?.statusMessage || 'Failed to save' }
  finally { saving.value = false }
}

const confirmDelete = (cat: any) => { deleteTarget.value = cat }
const doDelete = async () => {
  if (!deleteTarget.value) return
  deleting.value = true
  try {
    await $fetch(`/api/admin/categories/${deleteTarget.value.id}`, { method: 'DELETE' })
    await refresh(); deleteTarget.value = null
  } finally { deleting.value = false }
}
</script>
