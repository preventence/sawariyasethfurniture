<template>
  <section id="about" class="section bg-[var(--color-bark)] text-[var(--color-sand)]">
    <div class="max-w-7xl mx-auto px-6 lg:px-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
        <div class="lg:col-span-4 lg:border-r border-[var(--color-sand)]/10 lg:pr-14 reveal">
          <div class="font-serif text-[8rem] leading-none text-[var(--color-sand)]/10 select-none mb-4">2025</div>
          <blockquote class="font-serif text-xl text-[var(--color-sand-light)] leading-relaxed mb-6">"We don't make furniture to fill rooms. We make it to anchor lives."</blockquote>
          <div class="font-sans text-xs tracking-[0.2em] uppercase text-[var(--color-clay-light)]">— Shakti Singh Rawat, Founder</div>
        </div>
        <!-- <div class="lg:col-span-8 lg:pl-14">
          <p class="font-sans text-[10px] tracking-[0.28em] uppercase text-[var(--color-clay-light)] mb-3">Our Story</p>
          <h2 class="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] text-[var(--color-sand-light)] mb-6">Built From Sawdust<br />and Stubbornness</h2>
          <div class="space-y-4 font-sans text-sm text-[var(--color-sand)]/65 leading-relaxed mb-10">
            <p>Sawariya Seth Furniture was born in a rented 400 sq. ft. shed in Hadapsar, with two second-hand lathe machines and a single vision — that well-made furniture should be available to anyone who values it.</p>
            <p>Twenty years later, our workshop spans 15,000 sq. ft. and our showroom is one of Pune's most visited destinations for premium home furnishing. But the philosophy hasn't changed: no particle board, no shortcuts, no compromises.</p>
            <p>We work with over 40 craftsmen, many of whom have been with us for a decade or more. Each one is a specialist — in hand-carving, in Rajasthani inlay work, in lacquering, in metal-hardware fitting. Their expertise is the product.</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div v-for="val in values" :key="val.title">
              <component :is="val.icon" :size="20" class="text-[var(--color-clay-light)] mb-3" />
              <div class="font-sans text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-sand-light)] mb-1">{{ val.title }}</div>
              <div class="font-sans text-xs text-[var(--color-sand)]/50 leading-relaxed">{{ val.desc }}</div>
            </div>
          </div>
        </div> -->
      
        <div class="lg:col-span-8 lg:pl-14">
          <p class="font-sans text-[10px] tracking-[0.28em] uppercase text-[var(--color-clay-light)] mb-3">
            Our Story
          </p>
          <h2 class="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] text-[var(--color-sand-light)] mb-6">
            Built From Sawdust<br />and Stubbornness
          </h2>
          <!-- <div class="space-y-4 font-sans text-sm text-[var(--color-sand)]/65 leading-relaxed mb-10">
            <p>
              Sawariyaseth Furniture was born in a rented 400 sq. ft. shed in Ajmer, with two
              second-hand lathe machines and a single vision — that well-made furniture should be
              available to anyone who values it.
            </p>
            <p>
              Twenty years later, our workshop spans 15,000 sq. ft. and our showroom is one of
              Ajmer's most visited destinations for premium home furnishing. But the philosophy
              hasn't changed: no particle board, no shortcuts, no compromises.
            </p>
            <p>
              We work with over 40 craftsmen, many of whom have been with us for a decade or more.
              Each one is a specialist — in hand-carving, in Rajasthani inlay work, in lacquering,
              in metal-hardware fitting. Their expertise is the product.
            </p>
          </div> -->
          <div class="space-y-4 font-sans text-sm text-[var(--color-sand)]/65 leading-relaxed mb-10">
            <p>
              With a genuine desire to serve people with quality craftsmanship, the owner of Sawariya Seth Furniture established a spacious 120 × 90 sq. ft. showroom in Ajmer — creating a place where well-made furniture is accessible to anyone who values it.
            </p>
            <p>
              Over the years, it has become one of Ajmer’s most trusted destinations for premium home furnishing. The philosophy has always remained the same: no particle board, no shortcuts, no compromises.
            </p>
            <p>
              The workshop is powered by skilled craftsmen, many of whom have been part of the journey for years. Each artisan specializes in their craft — from hand-carving and traditional Rajasthani inlay work to fine lacquering and precision metal fitting — ensuring every piece reflects true expertise.
            </p>
          </div>

          <!-- Values -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div v-for="val in values" :key="val.title">
              <component :is="val.icon" :size="20" class="text-[var(--color-clay-light)] mb-3" />
              <div class="font-sans text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-sand-light)] mb-1">
                {{ val.title }}
              </div>
              <div class="font-sans text-xs text-[var(--color-sand)]/50 leading-relaxed">
                {{ val.desc }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { LeafIcon, AwardIcon, HandshakeIcon } from 'lucide-vue-next'
const values = [
  { title:'Sustainably Sourced', icon:LeafIcon, desc:'All timber from FSC-certified suppliers. We plant one tree for every piece we sell.' },
  { title:'Lifetime Guarantee', icon:AwardIcon, desc:'Structural defects covered for life. We stand behind every joint and finish.' },
  { title:'Transparent Process', icon:HandshakeIcon, desc:'Visit the workshop any time. Watch your piece being made, if you like.' },
]
</script>
