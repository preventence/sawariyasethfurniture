<template>
  <main class="pt-20">
    <div v-if="pending" class="min-h-screen flex items-center justify-center">
      <div class="font-serif text-2xl text-[var(--color-clay)] animate-pulse">Loading…</div>
    </div>

    <template v-else-if="product">
      <!-- Breadcrumb -->
      <div class="bg-[var(--color-linen)] py-4">
        <div class="max-w-7xl mx-auto px-6 lg:px-10 flex items-center gap-3">
          <NuxtLink to="/" class="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-clay)] hover:text-[var(--color-bark)] transition-colors">Home</NuxtLink>
          <span class="text-[var(--color-bark)]/30 text-xs">›</span>
          <NuxtLink to="/collections" class="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-clay)] hover:text-[var(--color-bark)] transition-colors">Collections</NuxtLink>
          <span class="text-[var(--color-bark)]/30 text-xs">›</span>
          <NuxtLink :to="`/collections/${product.category_slug}`" class="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-clay)] hover:text-[var(--color-bark)] transition-colors">{{ product.category_name }}</NuxtLink>
          <span class="text-[var(--color-bark)]/30 text-xs">›</span>
          <span class="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-bark)]/60 truncate max-w-[160px]">{{ product.name }}</span>
        </div>
      </div>

      <!-- Main content -->
      <div class="section bg-[var(--color-warm-white)]">
        <div class="max-w-7xl mx-auto px-6 lg:px-10">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            <!-- Image gallery -->
            <div>
              <!-- Main image -->
              <div class="aspect-[4/3] overflow-hidden bg-[var(--color-linen)] mb-3">
                <img v-if="activeImage" :src="activeImage.url" :alt="activeImage.alt_text || product.name" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <span class="font-serif text-8xl text-[var(--color-clay)]/20">{{ product.name[0] }}</span>
                </div>
              </div>
              <!-- Thumbnail strip -->
              <div v-if="product.images?.length > 1" class="flex gap-2 overflow-x-auto pb-1">
                <button
                  v-for="(img, i) in product.images"
                  :key="img.id"
                  @click="activeIndex = i"
                  :class="['flex-shrink-0 w-20 h-20 overflow-hidden border-2 transition-colors', activeIndex === i ? 'border-[var(--color-clay)]' : 'border-transparent hover:border-[var(--color-clay)]/40']"
                >
                  <img :src="img.url" :alt="img.alt_text || product.name" class="w-full h-full object-cover" />
                </button>
              </div>
            </div>

            <!-- Product info -->
            <div>
              <div class="flex items-center gap-3 mb-3">
                <NuxtLink :to="`/collections/${product.category_slug}`" class="font-sans text-[10px] tracking-[0.22em] uppercase text-[var(--color-clay)] hover:text-[var(--color-bark)] transition-colors">{{ product.category_name }}</NuxtLink>
                <span v-if="product.custom_order" class="font-sans text-[8px] tracking-[0.2em] uppercase bg-[var(--color-bark)] text-[var(--color-sand-light)] px-2 py-1">Custom Available</span>
                <span v-if="product.featured" class="font-sans text-[8px] tracking-[0.2em] uppercase bg-[var(--color-clay)] text-[var(--color-sand-light)] px-2 py-1">Featured</span>
              </div>

              <h1 class="font-serif text-[clamp(1.8rem,4vw,3rem)] text-[var(--color-bark)] leading-tight mb-4">{{ product.name }}</h1>

              <!-- Price -->
              <div class="mb-6 pb-6 border-b border-[var(--color-linen)]">
                <span v-if="product.price_on_request" class="font-serif text-xl text-[var(--color-bark)]/70 italic">Price on request</span>
                <span v-else-if="product.price" class="font-serif text-3xl text-[var(--color-bark)]">₹{{ Number(product.price).toLocaleString('en-IN') }}</span>
                <span v-else class="font-serif text-xl text-[var(--color-bark)]/70 italic">Price on request</span>
              </div>

              <!-- Description -->
              <p v-if="product.description" class="font-sans text-sm text-[var(--color-bark)]/65 leading-relaxed mb-8">{{ product.description }}</p>

              <!-- Specs -->
              <div class="space-y-3 mb-8">
                <div v-if="product.material" class="flex items-start gap-4">
                  <span class="font-sans text-[10px] tracking-[0.18em] uppercase text-[var(--color-clay)] w-24 pt-0.5 flex-shrink-0">Material</span>
                  <span class="font-sans text-sm text-[var(--color-bark)]">{{ product.material }}</span>
                </div>
                <div v-if="hasDimensions" class="flex items-start gap-4">
                  <span class="font-sans text-[10px] tracking-[0.18em] uppercase text-[var(--color-clay)] w-24 pt-0.5 flex-shrink-0">Dimensions</span>
                  <span class="font-sans text-sm text-[var(--color-bark)]">{{ dimensionString }}</span>
                </div>
                <div v-if="product.lead_time" class="flex items-start gap-4">
                  <span class="font-sans text-[10px] tracking-[0.18em] uppercase text-[var(--color-clay)] w-24 pt-0.5 flex-shrink-0">Lead Time</span>
                  <span class="font-sans text-sm text-[var(--color-bark)]">{{ product.lead_time }}</span>
                </div>
                <div class="flex items-start gap-4">
                  <span class="font-sans text-[10px] tracking-[0.18em] uppercase text-[var(--color-clay)] w-24 pt-0.5 flex-shrink-0">Availability</span>
                  <span :class="['font-sans text-sm', product.in_stock ? 'text-[var(--color-moss)]' : 'text-red-500']">{{ product.in_stock ? 'In Stock' : 'Made to Order' }}</span>
                </div>
              </div>

              <!-- Enquire -->
              <div class="space-y-3">
                <button @click="showEnquiry = !showEnquiry" class="btn-primary w-full justify-center">
                  {{ showEnquiry ? 'Close Enquiry Form' : 'Enquire About This Piece' }}
                  <component :is="showEnquiry ? ChevronUpIcon : ArrowRightIcon" :size="14" />
                </button>
                <NuxtLink to="/#showroom" class="btn-outline w-full justify-center">Visit Showroom to See It In Person</NuxtLink>
              </div>

              <!-- Inline enquiry form -->
              <Transition name="slide-down">
                <div v-if="showEnquiry" class="mt-6 bg-[var(--color-sand-light)] border border-[var(--color-linen)] p-6">
                  <Transition name="fade">
                    <div v-if="submitted" class="text-center py-8">
                      <CheckCircleIcon :size="28" class="text-[var(--color-moss)] mx-auto mb-3" />
                      <p class="font-serif text-lg text-[var(--color-bark)] mb-1">Enquiry Sent!</p>
                      <p class="font-sans text-xs text-[var(--color-bark)]/60">We'll be in touch within one business day.</p>
                    </div>
                  </Transition>
                  <form v-if="!submitted" @submit.prevent="submit" class="space-y-4">
                    <div class="grid grid-cols-2 gap-3">
                      <div><label class="form-label">First Name *</label><input v-model="form.firstName" type="text" class="form-input" required placeholder="Priya" /></div>
                      <div><label class="form-label">Phone</label><input v-model="form.phone" type="tel" class="form-input" placeholder="+91 80000…" /></div>
                    </div>
                    <div><label class="form-label">Email *</label><input v-model="form.email" type="email" class="form-input" required placeholder="you@example.com" /></div>
                    <div><label class="form-label">Message</label><textarea v-model="form.message" class="form-input resize-none" rows="3" placeholder="Any specific requirements, finish preferences, delivery timeline…" /></div>
                    <p v-if="error" class="font-sans text-xs text-red-600">{{ error }}</p>
                    <button type="submit" class="btn-primary w-full justify-center" :disabled="loading">
                      <span v-if="loading" class="animate-pulse">Sending…</span>
                      <template v-else>Send Enquiry <SendIcon :size="13" /></template>
                    </button>
                  </form>
                </div>
              </Transition>

              <!-- Guarantees -->
              <div class="mt-8 pt-8 border-t border-[var(--color-linen)] grid grid-cols-3 gap-4 text-center">
                <div v-for="g in guarantees" :key="g.label">
                  <component :is="g.icon" :size="18" class="text-[var(--color-clay)] mx-auto mb-1.5" />
                  <p class="font-sans text-[9px] tracking-[0.12em] uppercase text-[var(--color-bark)]/60">{{ g.label }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related products -->
      <div v-if="product.related?.length" class="section bg-[var(--color-linen)]">
        <div class="max-w-7xl mx-auto px-6 lg:px-10">
          <p class="font-sans text-[10px] tracking-[0.28em] uppercase text-[var(--color-clay)] mb-3">You Might Also Like</p>
          <h2 class="font-serif text-2xl text-[var(--color-bark)] mb-8">From the Same Collection</h2>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <ProductCard v-for="p in product.related" :key="p.id" :product="p" />
          </div>
        </div>
      </div>
    </template>
  </main>
</template>
<script setup lang="ts">
import { ArrowRightIcon, ChevronUpIcon, SendIcon, CheckCircleIcon, ShieldCheckIcon, LeafIcon, TruckIcon } from 'lucide-vue-next'
const route = useRoute()
const { data: product, pending } = await useFetch(() => `/api/products/${route.params.slug}`)
const activeIndex = ref(0)
const showEnquiry = ref(false)

const activeImage = computed(() => {
  const imgs = (product.value as any)?.images
  return imgs?.length ? imgs[activeIndex.value] : null
})

const hasDimensions = computed(() => {
  const p = product.value as any
  return p?.width_cm || p?.height_cm || p?.depth_cm
})

const dimensionString = computed(() => {
  const p = product.value as any
  if (!p) return ''
  const parts = []
  if (p.width_cm) parts.push(`W ${p.width_cm}cm`)
  if (p.height_cm) parts.push(`H ${p.height_cm}cm`)
  if (p.depth_cm) parts.push(`D ${p.depth_cm}cm`)
  return parts.join(' × ')
})

const { form, submitted, loading, error, submit } = useEnquiry('Product Enquiry')
watch(product, (p: any) => { if (p) form.product = p.name; form.interest = `${p?.name} — ${p?.category_name}` }, { immediate: true })

const guarantees = [
  { label: 'Lifetime Guarantee', icon: ShieldCheckIcon },
  { label: 'Sustainably Sourced', icon: LeafIcon },
  { label: 'Free Delivery, Pune', icon: TruckIcon },
]

useSeoMeta({
  title: computed(() => `${(product.value as any)?.name || 'Product'} — Sawariya Seth Furniture`),
  description: computed(() => (product.value as any)?.description || 'Handcrafted furniture from Sawariya Seth Furniture, Ajmer.'),
})
useScrollReveal()
</script>
<style scoped>
.form-label{display:block;font-family:var(--font-sans);font-size:.6875rem;letter-spacing:.15em;text-transform:uppercase;color:var(--color-bark);opacity:.6;margin-bottom:.4rem;}
.form-input{width:100%;font-family:var(--font-sans);font-size:.875rem;color:var(--color-bark);background:#fff;border:1px solid rgba(44,26,14,.18);padding:.6rem .875rem;outline:none;transition:border-color .2s;appearance:none;}
.form-input:focus{border-color:var(--color-clay);}
.form-input::placeholder{color:rgba(44,26,14,.28);}
.slide-down-enter-active,.slide-down-leave-active{transition:all .35s ease;}
.slide-down-enter-from,.slide-down-leave-to{opacity:0;transform:translateY(-10px);}
.fade-enter-active,.fade-leave-active{transition:opacity .3s;}
.fade-enter-from,.fade-leave-to{opacity:0;}
</style>
