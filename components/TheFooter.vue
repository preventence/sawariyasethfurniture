<template>
  <footer class="bg-[var(--color-bark)] text-[var(--color-sand)] pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-6 lg:px-10">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
        <div class="md:col-span-2">
          <div class="font-serif text-3xl text-[var(--color-sand-light)] mb-1">Sawariya Seth Furniture</div>
          <div class="text-[9px] tracking-[0.28em] uppercase text-[var(--color-clay-light)] mb-5">Est. 2025 · Handcrafted Furniture</div>
          <p class="text-sm leading-relaxed text-[var(--color-sand)]/70 max-w-xs">Every piece we make begins as a conversation. From raw timber to finished heirloom — made by hand, made to last.</p>
        </div>
        <div>
          <div class="text-[10px] tracking-[0.22em] uppercase text-[var(--color-clay-light)] mb-4">Navigate</div>
          <ul class="space-y-3">
            <li><NuxtLink to="/collections" class="text-sm text-[var(--color-sand)]/70 hover:text-[var(--color-sand)] transition-colors">Collections</NuxtLink></li>
            <li><NuxtLink to="/#workshop" class="text-sm text-[var(--color-sand)]/70 hover:text-[var(--color-sand)] transition-colors">Workshop</NuxtLink></li>
            <li><NuxtLink to="/#showroom" class="text-sm text-[var(--color-sand)]/70 hover:text-[var(--color-sand)] transition-colors">Showroom</NuxtLink></li>
            <li><NuxtLink to="/#about" class="text-sm text-[var(--color-sand)]/70 hover:text-[var(--color-sand)] transition-colors">About</NuxtLink></li>
            <li><NuxtLink to="/#contact" class="text-sm text-[var(--color-sand)]/70 hover:text-[var(--color-sand)] transition-colors">Contact</NuxtLink></li>
          </ul>
        </div>
        <div>
          <div class="text-[10px] tracking-[0.22em] uppercase text-[var(--color-clay-light)] mb-4">Visit Us</div>
          <address class="not-italic space-y-3 text-sm text-[var(--color-sand)]/70">
            <p>JB HOTEL, near Rajgarh road, Saradhna<br>Ajmer 305206</p>
            <p><a href="tel:+918000023345" class="hover:text-[var(--color-sand)] transition-colors">+91 80000 23345</a></p>
            <p><a href="mailto:sawariyasethfurnitures@gmail.com" class="hover:text-[var(--color-sand)] transition-colors">sawariyasethfurnitures@gmail.com</a></p>
            <p class="text-[var(--color-sand)]/50 text-xs">Mon–Sat: 10am – 7pm</p>
          </address>
        </div>
      </div>
      <div class="border-t border-[var(--color-sand)]/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <p class="text-xs text-[var(--color-sand)]/40">© {{ year }} Sawariya Seth Furniture. All rights reserved.</p>
        <!-- <p class="text-xs text-[var(--color-sand)]/40">Designed &amp; built in Pune, India</p> -->
        <p class="text-xs text-[var(--color-sand)]/40">
          Website by 
          <a href="https://preventence.com" target="_blank" rel="noopener noreferrer" class="hover:underline">
            Preventence Technology Pvt. Ltd.
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
const year = new Date().getFullYear()
</script>
