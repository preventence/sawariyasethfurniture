<template>
  <section id="collections" class="section bg-[var(--color-warm-white)]">
    <div class="max-w-7xl mx-auto px-6 lg:px-10">

      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <p class="font-sans text-[10px] tracking-[0.28em] uppercase text-[var(--color-clay)] mb-3">
            Our Work
          </p>
          <h2 class="font-serif text-[clamp(2.2rem,4.5vw,3.5rem)] text-[var(--color-bark)]">
            Curated Collections
          </h2>
          <div class="wood-rule" />
        </div>
        <p class="font-sans text-sm text-[var(--color-bark)]/60 max-w-xs leading-relaxed">
          Built from sustainably sourced teak, sheesham, mango wood, and solid oak — each collection is a conversation between material and form.
        </p>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-5">

        <!-- Featured large piece -->
        <div
          v-for="(item, i) in collections"
          :key="item.name"
          :class="[
            'group cursor-pointer img-hover reveal',
            i === 0 ? 'md:col-span-7' : i === 1 ? 'md:col-span-5' : i === 2 ? 'md:col-span-4' : i === 3 ? 'md:col-span-4' : 'md:col-span-4',
          ]"
          ref="cards"
        >
          <div class="relative overflow-hidden aspect-[4/3]">
            <img
              :src="item.image"
              :alt="item.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <!-- Overlay on hover -->
            <div
              class="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style="background: linear-gradient(to top, rgba(28,18,9,0.82) 0%, transparent 60%)"
            >
              <span class="font-sans text-[9px] tracking-[0.25em] uppercase text-[var(--color-clay-light)] mb-1">
                {{ item.category }}
              </span>
              <span class="font-serif text-xl text-[var(--color-sand-light)]">{{ item.name }}</span>
            </div>
            <!-- Static label bottom -->
            <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1C1209]/70 to-transparent group-hover:opacity-0 transition-opacity">
              <span class="font-serif text-lg text-[var(--color-sand-light)]">{{ item.name }}</span>
            </div>
          </div>
          <!-- Meta below image -->
          <div class="pt-4 pb-2 flex items-center justify-between">
            <span class="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-clay)]">
              {{ item.category }}
            </span>
            <span class="font-sans text-xs text-[var(--color-bark)]/40">
              {{ item.pieces }} pieces
            </span>
          </div>
        </div>

      </div>

      <!-- View all -->
      <div class="text-center mt-14">
        <a href="#contact" class="btn-outline">
          Request Full Catalogue
          <ArrowRightIcon :size="14" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from 'lucide-vue-next'
import bedImage from '@/assets/savariyasethfurniture_bed.jpeg'
import tvSetImage from '@/assets/savariyasethfurniture_tvset.jpeg'

const collections = [
  {
    name: 'The Heirloom Dining',
    category: 'Dining Room',
    pieces: 12,
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=900&q=80',
  },
  {
    name: 'Solid Teak Living',
    category: 'Living Room',
    pieces: 18,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80',
  },
  {
    name: 'Beds',
    category: 'Bedroom',
    pieces: 8,
    image: bedImage, // ✅ your local asset
  },
  {
    name: 'Studio Beds',
    category: 'Bedroom',
    pieces: 8,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
  },
   {
    name: 'TV Unit',
    category: 'Living Room',
    pieces: 8,
    image: tvSetImage, // ✅ your local asset
  },
  {
    name: 'Sheesham Storage',
    category: 'Storage',
    pieces: 10,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
  },
  {
    name: 'Oak Office',
    category: 'Workspace',
    pieces: 6,
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80',
  },
]

// Reveal on scroll
const cards = ref<HTMLElement[]>([])
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.1 }
  )
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>
