<template>
  <form @submit.prevent="handleSubmit" class="space-y-8">

    <!-- Basic info -->
    <div class="bg-white border border-[var(--color-linen)] p-6 space-y-5">
      <h2 class="font-sans text-sm font-medium text-[var(--color-bark)] tracking-wide border-b border-[var(--color-linen)] pb-3">Basic Information</h2>
      <div>
        <label class="admin-label">Product Name *</label>
        <input v-model="form.name" type="text" class="admin-input" placeholder="e.g. Malabar Teak Dining Table" required />
      </div>
      <div>
        <label class="admin-label">Category *</label>
        <select v-model="form.category_id" class="admin-input admin-select" required>
          <option value="">Select a category…</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
        <p v-if="!categories?.length" class="font-sans text-xs text-amber-600 mt-1">No categories yet — <NuxtLink to="/admin/categories" class="underline">create one first</NuxtLink>.</p>
      </div>
      <div>
        <label class="admin-label">Description</label>
        <textarea v-model="form.description" class="admin-input resize-none" rows="4" placeholder="Describe the piece — materials, style, construction details, size options…" />
      </div>
    </div>

    <!-- Pricing -->
    <div class="bg-white border border-[var(--color-linen)] p-6 space-y-4">
      <h2 class="font-sans text-sm font-medium text-[var(--color-bark)] tracking-wide border-b border-[var(--color-linen)] pb-3">Pricing</h2>
      <label class="flex items-center gap-3 cursor-pointer">
        <div @click="form.price_on_request = !form.price_on_request" :class="['w-10 h-6 rounded-full transition-colors relative cursor-pointer', form.price_on_request ? 'bg-[var(--color-clay)]' : 'bg-[var(--color-bark)]/20']">
          <div :class="['absolute top-1 w-4 h-4 bg-white rounded-full transition-transform', form.price_on_request ? 'translate-x-5' : 'translate-x-1']" />
        </div>
        <span class="font-sans text-sm text-[var(--color-bark)]">Price on request (hide price publicly)</span>
      </label>
      <div v-if="!form.price_on_request">
        <label class="admin-label">Price (₹)</label>
        <input v-model.number="form.price" type="number" class="admin-input" placeholder="e.g. 85000" min="0" step="100" />
      </div>
    </div>

    <!-- Details -->
    <div class="bg-white border border-[var(--color-linen)] p-6 space-y-5">
      <h2 class="font-sans text-sm font-medium text-[var(--color-bark)] tracking-wide border-b border-[var(--color-linen)] pb-3">Product Details</h2>
      <div>
        <label class="admin-label">Material / Wood Type</label>
        <input v-model="form.material" type="text" class="admin-input" placeholder="e.g. Solid Malabar Teak, Hand-rubbed Oil Finish" />
      </div>
      <div>
        <label class="admin-label">Dimensions (cm)</label>
        <div class="grid grid-cols-3 gap-3">
          <div><input v-model.number="form.width_cm" type="number" class="admin-input" placeholder="Width" min="0" step="0.5" /><p class="font-sans text-[10px] text-[var(--color-bark)]/40 mt-1">Width</p></div>
          <div><input v-model.number="form.height_cm" type="number" class="admin-input" placeholder="Height" min="0" step="0.5" /><p class="font-sans text-[10px] text-[var(--color-bark)]/40 mt-1">Height</p></div>
          <div><input v-model.number="form.depth_cm" type="number" class="admin-input" placeholder="Depth" min="0" step="0.5" /><p class="font-sans text-[10px] text-[var(--color-bark)]/40 mt-1">Depth</p></div>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <label class="flex items-center gap-3 cursor-pointer">
          <div @click="form.custom_order = !form.custom_order" :class="['w-10 h-6 rounded-full transition-colors relative cursor-pointer flex-shrink-0', form.custom_order ? 'bg-[var(--color-clay)]' : 'bg-[var(--color-bark)]/20']">
            <div :class="['absolute top-1 w-4 h-4 bg-white rounded-full transition-transform', form.custom_order ? 'translate-x-5' : 'translate-x-1']" />
          </div>
          <span class="font-sans text-sm text-[var(--color-bark)]">Custom order available</span>
        </label>
        <label class="flex items-center gap-3 cursor-pointer">
          <div @click="form.featured = !form.featured" :class="['w-10 h-6 rounded-full transition-colors relative cursor-pointer flex-shrink-0', form.featured ? 'bg-[var(--color-clay)]' : 'bg-[var(--color-bark)]/20']">
            <div :class="['absolute top-1 w-4 h-4 bg-white rounded-full transition-transform', form.featured ? 'translate-x-5' : 'translate-x-1']" />
          </div>
          <span class="font-sans text-sm text-[var(--color-bark)]">Featured product</span>
        </label>
        <label class="flex items-center gap-3 cursor-pointer">
          <div @click="form.in_stock = !form.in_stock" :class="['w-10 h-6 rounded-full transition-colors relative cursor-pointer flex-shrink-0', form.in_stock ? 'bg-[var(--color-moss)]' : 'bg-[var(--color-bark)]/20']">
            <div :class="['absolute top-1 w-4 h-4 bg-white rounded-full transition-transform', form.in_stock ? 'translate-x-5' : 'translate-x-1']" />
          </div>
          <span class="font-sans text-sm text-[var(--color-bark)]">{{ form.in_stock ? 'In Stock' : 'Made to Order' }}</span>
        </label>
      </div>
    </div>

    <!-- Images -->
    <div class="bg-white border border-[var(--color-linen)] p-6 space-y-4">
      <h2 class="font-sans text-sm font-medium text-[var(--color-bark)] tracking-wide border-b border-[var(--color-linen)] pb-3">Photos</h2>
      <p class="font-sans text-xs text-[var(--color-bark)]/50">First image will be used as the cover. Drag to reorder (coming soon).</p>

      <!-- Upload button -->
      <label :class="['flex items-center justify-center gap-3 border-2 border-dashed border-[var(--color-clay)]/40 hover:border-[var(--color-clay)] transition-colors cursor-pointer p-6', uploading ? 'opacity-50 cursor-not-allowed' : '']">
        <UploadIcon :size="18" class="text-[var(--color-clay)]" />
        <span class="font-sans text-sm text-[var(--color-clay)]">{{ uploading ? 'Uploading…' : 'Click to upload photos' }}</span>
        <input type="file" class="hidden" accept="image/*" multiple @change="handleUpload" :disabled="uploading" />
      </label>

      <!-- Or paste URL -->
      <div class="flex gap-2">
        <input v-model="urlInput" type="text" class="admin-input flex-1" placeholder="Or paste an image URL and press Enter" @keydown.enter.prevent="addUrl" />
        <button type="button" @click="addUrl" class="btn-outline px-4 py-2 text-sm flex-shrink-0">Add</button>
      </div>

      <!-- Image grid -->
      <div v-if="form.images.length" class="grid grid-cols-3 sm:grid-cols-4 gap-3">
        <div v-for="(img, i) in form.images" :key="i" class="relative group aspect-square">
          <img :src="img.url" :alt="img.alt_text" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-[var(--color-bark)]/0 group-hover:bg-[var(--color-bark)]/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button type="button" @click="removeImage(i)" class="bg-red-500 text-white rounded-full p-1.5"><XIcon :size="12" /></button>
          </div>
          <div v-if="i === 0" class="absolute bottom-0 left-0 right-0 bg-[var(--color-clay)] text-[var(--color-sand-light)] font-sans text-[8px] tracking-[0.15em] uppercase text-center py-0.5">Cover</div>
        </div>
      </div>
    </div>

    <!-- Submit -->
    <div class="flex items-center gap-4">
      <button type="submit" class="btn-primary" :disabled="saving">
        <span v-if="saving" class="animate-pulse">Saving…</span>
        <template v-else>{{ isEditing ? 'Save Changes' : 'Create Product' }} <CheckIcon :size="14" /></template>
      </button>
      <NuxtLink to="/admin/products" class="btn-outline">Cancel</NuxtLink>
      <p v-if="saveError" class="font-sans text-xs text-red-600 ml-2">{{ saveError }}</p>
    </div>
  </form>
</template>
<script setup lang="ts">
import { UploadIcon, XIcon, CheckIcon } from 'lucide-vue-next'

const props = defineProps<{ categories: any[]; initial?: any }>()
const emit = defineEmits<{ saved: [product: any] }>()

const isEditing = computed(() => !!props.initial?.id)
const { uploading, uploadImage } = useImageUpload()
const saving = ref(false)
const saveError = ref('')
const urlInput = ref('')

const form = reactive({
  name: '', category_id: '', description: '',
  price: null as number | null, price_on_request: false,
  material: '', width_cm: null as number | null, height_cm: null as number | null, depth_cm: null as number | null,
  custom_order: false, featured: false, in_stock: true, sort_order: 0,
  images: [] as { url: string; alt_text: string }[],
})

// Populate if editing
watch(() => props.initial, (v) => {
  if (!v) return
  Object.assign(form, {
    name: v.name, category_id: v.category_id, description: v.description,
    price: v.price, price_on_request: !!v.price_on_request,
    material: v.material, width_cm: v.width_cm, height_cm: v.height_cm, depth_cm: v.depth_cm,
    custom_order: !!v.custom_order, featured: !!v.featured, in_stock: !!v.in_stock, sort_order: v.sort_order,
    images: v.images?.map((i: any) => ({ url: i.url, alt_text: i.alt_text || '' })) || [],
  })
}, { immediate: true })

const handleUpload = async (e: Event) => {
  const files = Array.from((e.target as HTMLInputElement).files || [])
  for (const file of files) {
    const url = await uploadImage(file)
    if (url) form.images.push({ url, alt_text: form.name })
  }
}

const addUrl = () => {
  if (!urlInput.value.trim()) return
  form.images.push({ url: urlInput.value.trim(), alt_text: form.name })
  urlInput.value = ''
}

const removeImage = (i: number) => form.images.splice(i, 1)

const handleSubmit = async () => {
  if (!form.name || !form.category_id) { saveError.value = 'Name and category are required.'; return }
  saving.value = true; saveError.value = ''
  try {
    let result
    if (isEditing.value) {
      result = await $fetch(`/api/admin/products/${props.initial.id}`, { method: 'PATCH', body: form })
    } else {
      result = await $fetch('/api/admin/products', { method: 'POST', body: form })
    }
    emit('saved', result)
  } catch (e: any) { saveError.value = e?.data?.statusMessage || 'Failed to save. Please try again.' }
  finally { saving.value = false }
}
</script>
