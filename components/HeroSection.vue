<template>
  <section
    class="relative h-screen min-h-[640px] flex items-end overflow-hidden"
    aria-label="Hero"
  >
    <!-- Background image -->
    <div class="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1800&q=80"
        alt="Handcrafted wooden furniture"
        class="w-full h-full object-cover"
      />
      <!-- Dark gradient overlay -->
      <div
        class="absolute inset-0"
        style="background: linear-gradient(to top, rgba(28,18,9,0.90) 0%, rgba(28,18,9,0.45) 55%, rgba(28,18,9,0.15) 100%)"
      />
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20 lg:pb-24 w-full">
      <div class="max-w-2xl">
        <!-- Eyebrow -->
        <div class="flex items-center gap-3 mb-6" ref="eyebrow">
          <span class="w-8 h-px bg-[var(--color-clay)]" />
          <span class="font-sans text-[10px] tracking-[0.3em] uppercase text-[var(--color-clay-light)]">
            Handcrafted in Ajmer since 2025
          </span>
        </div>

        <!-- Headline -->
        <h1
          class="font-serif text-[clamp(3rem,7vw,5.5rem)] leading-[1.08] text-[var(--color-sand-light)] mb-6"
          ref="headline"
        >
          Furniture That<br />
          <em class="not-italic text-[var(--color-clay-light)]">Tells a Story</em>
        </h1>

        <!-- Subtext -->
        <p
          class="font-sans text-base text-[var(--color-sand)]/70 leading-relaxed max-w-md mb-10"
          ref="subtext"
        >
          Every grain, joint, and finish is an act of intention. We design, manufacture, and deliver
          heirloom-quality furniture — from our workshop floor to your home.
        </p>

        <!-- CTAs -->
        <div class="flex flex-wrap gap-4" ref="ctas">
          <a href="#collections" class="btn-primary">
            Explore Collections
            <ArrowRightIcon :size="14" />
          </a>
          <a href="#showroom" class="btn-outline" style="color: var(--color-sand-light); border-color: rgba(245,236,215,0.45)">
            Visit Showroom
          </a>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 right-8 lg:right-10 flex flex-col items-center gap-2 z-10">
      <span class="font-sans text-[9px] tracking-[0.25em] uppercase text-[var(--color-sand)]/40 [writing-mode:vertical-rl]">
        Scroll
      </span>
      <div class="w-px h-12 bg-[var(--color-sand)]/20 relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full bg-[var(--color-clay)] animate-scroll-line" style="height:40%" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from 'lucide-vue-next'
</script>

<style scoped>
@keyframes scroll-line {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(300%); }
}
.animate-scroll-line {
  animation: scroll-line 2s ease-in-out infinite;
}
</style>
