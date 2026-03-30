<template>
  <section id="showroom" class="section bg-[var(--color-warm-white)]">
    <div class="max-w-7xl mx-auto px-6 lg:px-10">

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <!-- Text side -->
        <div class="reveal order-2 lg:order-1">
          <p class="font-sans text-[10px] tracking-[0.28em] uppercase text-[var(--color-clay)] mb-3">
            Visit Us
          </p>
          <h2 class="font-serif text-[clamp(2rem,4vw,3rem)] text-[var(--color-bark)] mb-4">
            Experience Every<br />Piece in Person
          </h2>
          <div class="wood-rule" />
          <p class="font-sans text-sm text-[var(--color-bark)]/65 leading-relaxed mb-8">
            Our 8,000 sq. ft. showroom on Hadapsar main road is a carefully curated space — not a warehouse floor. Each room is styled as a lived-in home so you can truly imagine a piece in your own space.
          </p>

          <!-- Info tiles -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div
              v-for="info in showroomInfo"
              :key="info.label"
              class="border border-[var(--color-linen)] bg-[var(--color-sand-light)] p-5"
            >
              <component :is="info.icon" :size="18" class="text-[var(--color-clay)] mb-3" />
              <div class="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-clay)] mb-1">
                {{ info.label }}
              </div>
              <div class="font-sans text-sm text-[var(--color-bark)]" v-html="info.value" />
            </div>
          </div>

          <div class="flex flex-wrap gap-4">
            <a href="#contact" class="btn-primary">
              Book a Showroom Visit
              <CalendarIcon :size="14" />
            </a>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener"
              class="btn-outline"
            >
              Get Directions
              <MapPinIcon :size="14" />
            </a>
          </div>
        </div>

        <!-- Showroom images -->
        <div class="order-1 lg:order-2 grid grid-cols-2 gap-3">
          <div class="img-hover col-span-2 aspect-[16/9]">
            <img
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=80"
              alt="Sawariyaseth Furniture showroom interior"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="img-hover aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80"
              alt="Showroom seating display"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="img-hover aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80"
              alt="Showroom bedroom setup"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>

      <!-- Testimonials strip -->
      <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="review in reviews"
          :key="review.name"
          class="bg-[var(--color-sand-light)] border border-[var(--color-linen)] p-8 reveal"
        >
          <!-- Stars -->
          <div class="flex gap-1 mb-4">
            <span v-for="n in 5" :key="n" class="text-[var(--color-clay)] text-sm">★</span>
          </div>
          <p class="font-serif text-base text-[var(--color-bark)] leading-relaxed mb-5 italic">
            "{{ review.quote }}"
          </p>
          <div class="font-sans text-xs text-[var(--color-bark)]/50 tracking-wide">
            — {{ review.name }}, {{ review.location }}
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { MapPinIcon, ClockIcon, PhoneIcon, CalendarIcon } from 'lucide-vue-next'

const showroomInfo = [
  {
    label: 'Address',
    icon: MapPinIcon,
    value: 'JB HOTEL near Rajgarh road Saradhna,<br>Ajmer 305206',
  },
  {
    label: 'Hours',
    icon: ClockIcon,
    value: 'Mon–Sat: 9am – 7pm<br>Sunday: 11am – 5pm',
  },
  {
    label: 'Phone',
    icon: PhoneIcon,
    value: '+91 20 1234 5678<br>+91 78528 23345',
  },
  {
    label: 'Appointment',
    icon: CalendarIcon,
    value: 'Walk-ins welcome<br>Private visits available',
  },
]

const reviews = [
  {
    quote: 'We furnished our entire home with Sawariya Seth Furniture. Three years in and everything looks even better than the day it arrived.',
    name: 'Priya & Rahul Joshi',
    location: 'Pushkar, Ajmer',
  },
  {
    quote: 'The team understood our brief perfectly. Our dining table is the conversation piece of every dinner party we host.',
    name: 'Anand Mehta',
    location: 'Kishangarh, Ajmer',
  },
  {
    quote: 'Worth every rupee. The craftsmanship is exceptional and the showroom experience made choosing so easy.',
    name: 'Sunita Desai',
    location: 'Beawar, Ajmer',
  },
]
</script>
