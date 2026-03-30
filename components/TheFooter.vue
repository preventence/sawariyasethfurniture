<template>
  <footer class="bg-[var(--color-bark)] text-[var(--color-sand)] pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-6 lg:px-10">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">

        <!-- Brand -->
        <div class="md:col-span-2">
          <div class="font-serif text-3xl text-[var(--color-sand-light)] mb-1">Sawariyaseth Furniture</div>
          <div class="text-[9px] tracking-[0.28em] uppercase text-[var(--color-clay-light)] mb-5">
            Est. 2004 · Handcrafted Furniture
          </div>
          <p class="text-sm leading-relaxed text-[var(--color-sand)]/70 max-w-xs">
            Every piece we make begins as a conversation. From raw timber to finished heirloom — made by hand, made to last.
          </p>
          <div class="flex gap-4 mt-6">
            <a href="#" class="w-9 h-9 border border-[var(--color-sand)]/20 flex items-center justify-center hover:border-[var(--color-clay)] transition-colors" aria-label="Instagram">
              <InstagramIcon :size="15" />
            </a>
            <a href="#" class="w-9 h-9 border border-[var(--color-sand)]/20 flex items-center justify-center hover:border-[var(--color-clay)] transition-colors" aria-label="Pinterest">
              <component :is="PinIcon" :size="15" />
            </a>
            <a href="#" class="w-9 h-9 border border-[var(--color-sand)]/20 flex items-center justify-center hover:border-[var(--color-clay)] transition-colors" aria-label="Facebook">
              <FacebookIcon :size="15" />
            </a>
          </div>
        </div>

        <!-- Quick links -->
        <div>
          <div class="text-[10px] tracking-[0.22em] uppercase text-[var(--color-clay-light)] mb-4">Navigate</div>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.href">
              <a :href="link.href" class="text-sm text-[var(--color-sand)]/70 hover:text-[var(--color-sand)] transition-colors">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact --> 
        <div>
          <div class="text-[10px] tracking-[0.22em] uppercase text-[var(--color-clay-light)] mb-4">Visit Us</div>
          <address class="not-italic space-y-3 text-sm text-[var(--color-sand)]/70">
            <p>JB HOTEL, near Rajgarh road, Saradhna<br>Ajmer 305206</p>
            <p>
              <a href="tel:+912012345678" class="hover:text-[var(--color-sand)] transition-colors">
                +91 78528 23345
              </a>
            </p>
            <p>
              <a href="mailto:Shaktiking2920@gmail.com" class="hover:text-[var(--color-sand)] transition-colors">
                hello@sawariyasethfurniture.com
              </a>
            </p>
            <p class="text-[var(--color-sand)]/50 text-xs">Mon–Sat: 10am – 7pm</p>
          </address>
        </div>

      </div>

      <div class="border-t border-[var(--color-sand)]/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <p class="text-xs text-[var(--color-sand)]/40">
          © {{ year }} Sawariya Seth Furniture. All rights reserved.
        </p>
        <p class="text-xs text-[var(--color-sand)]/40">
          Designed & built in Ajmer, India
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { InstagramIcon, FacebookIcon, PinIcon } from 'lucide-vue-next'

const year = new Date().getFullYear()

const quickLinks = [
  { label: 'Collections', href: '#collections' },
  { label: 'Workshop', href: '#workshop' },
  { label: 'Showroom', href: '#showroom' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
]
</script>
