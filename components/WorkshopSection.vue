<template>
  <section id="workshop" class="section bg-[var(--color-linen)]">
    <div class="max-w-7xl mx-auto px-6 lg:px-10">

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        <!-- Images mosaic -->
        <div class="relative grid grid-cols-2 gap-3">
          <div class="img-hover col-span-2 aspect-[16/9]">
            <img
              src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=900&q=80"
              alt="Master craftsman at work"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="img-hover aspect-square">
            <img
              src="https://images.unsplash.com/photo-1416339442236-8ceb164046f8?w=600&q=80"
              alt="Wood joinery detail"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="img-hover aspect-square">
            <img
              src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=600&q=80"
              alt="Workshop tools"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Floating stat card -->
          <div
            class="absolute -bottom-5 -right-5 bg-[var(--color-bark)] text-[var(--color-sand-light)] p-6 hidden lg:block"
          >
            <div class="font-serif text-4xl mb-1">20+</div>
            <div class="font-sans text-[10px] tracking-[0.22em] uppercase text-[var(--color-clay-light)]">
              Years of Craft
            </div>
          </div>
        </div>

        <!-- Text content -->
        <div class="reveal">
          <p class="font-sans text-[10px] tracking-[0.28em] uppercase text-[var(--color-clay)] mb-3">
            How It's Made
          </p>
          <h2 class="font-serif text-[clamp(2rem,4vw,3rem)] text-[var(--color-bark)] mb-4">
            From Forest Floor<br />to Your Living Room
          </h2>
          <div class="wood-rule" />
          <p class="font-sans text-sm text-[var(--color-bark)]/65 leading-relaxed mb-8">
            Our 15,000 sq. ft. workshop in Hadapsar houses 40 craftsmen who have spent their lives
            mastering joinery, carving, and finishing. We work exclusively with responsibly sourced
            hardwoods — teak from certified plantations, reclaimed railway sleeper wood, and
            imported European oak.
          </p>

          <!-- Process steps -->
          <div class="space-y-6">
            <div
              v-for="(step, i) in steps"
              :key="step.title"
              class="flex gap-5 items-start"
            >
              <div
                class="flex-shrink-0 w-9 h-9 border border-[var(--color-clay)]/40 flex items-center justify-center font-serif text-sm text-[var(--color-clay)]"
              >
                {{ String(i + 1).padStart(2, '0') }}
              </div>
              <div>
                <div class="font-sans text-sm font-medium text-[var(--color-bark)] mb-1">
                  {{ step.title }}
                </div>
                <div class="font-sans text-xs text-[var(--color-bark)]/55 leading-relaxed">
                  {{ step.desc }}
                </div>
              </div>
            </div>
          </div>

          <a href="#contact" class="btn-primary mt-10">
            Book a Workshop Tour
            <ArrowRightIcon :size="14" />
          </a>
        </div>
      </div>

      <!-- Bottom stats row -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--color-clay)]/20 mt-20 border border-[var(--color-clay)]/20">
        <div
          v-for="stat in stats"
          :key="stat.value"
          class="bg-[var(--color-linen)] px-8 py-8 text-center"
        >
          <div class="font-serif text-3xl text-[var(--color-bark)] mb-1">{{ stat.value }}</div>
          <div class="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-clay)]">
            {{ stat.label }}
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from 'lucide-vue-next'

const steps = [
  {
    title: 'Material Selection',
    desc: 'We visit timber yards personally, selecting planks for grain pattern, density, and moisture content.',
  },
  {
    title: 'Design & Prototyping',
    desc: 'Each piece is hand-sketched, then a full-scale prototype is built before production begins.',
  },
  {
    title: 'Hand-Crafting',
    desc: 'Mortise-and-tenon joints, hand-turned legs, and hand-rubbed oil finishes — no shortcuts.',
  },
  {
    title: 'Quality & Delivery',
    desc: 'Every piece passes a 27-point inspection before it leaves our floor, packed in custom quilted crates.',
  },
]

const stats = [
  { value: '40+', label: 'Craftsmen' },
  { value: '2,400+', label: 'Pieces Delivered' },
  { value: '15K sqft', label: 'Workshop Space' },
  { value: '100%', label: 'Solid Wood' },
]
</script>
