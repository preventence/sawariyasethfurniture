<template>
  <section id="contact" class="section bg-[var(--color-sand-light)]">
    <div class="max-w-7xl mx-auto px-6 lg:px-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">

        <!-- Left info -->
        <div class="reveal">
          <p class="font-sans text-[10px] tracking-[0.28em] uppercase text-[var(--color-clay)] mb-3">
            Get In Touch
          </p>
          <h2 class="font-serif text-[clamp(2rem,4vw,3rem)] text-[var(--color-bark)] mb-4">
            Let's Build Something<br />Together
          </h2>
          <div class="wood-rule" />
          <p class="font-sans text-sm text-[var(--color-bark)]/65 leading-relaxed mb-10">
            Whether you have a complete floor plan or just an idea on a napkin, our design team
            will work with you from brief to installation. Enquiries receive a response within
            24 hours.
          </p>

          <div class="space-y-5">
            <a
              v-for="method in contactMethods"
              :key="method.label"
              :href="method.href"
              class="flex items-center gap-4 group"
              :target="method.external ? '_blank' : undefined"
              :rel="method.external ? 'noopener noreferrer' : undefined"
            >
              <div class="w-10 h-10 bg-[var(--color-bark)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-clay)] transition-colors duration-300">
                <component :is="method.icon" :size="16" class="text-[var(--color-sand-light)]" />
              </div>
              <div>
                <div class="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-clay)] mb-0.5">
                  {{ method.label }}
                </div>
                <div class="font-sans text-sm text-[var(--color-bark)] group-hover:text-[var(--color-clay)] transition-colors duration-300">
                  {{ method.value }}
                </div>
              </div>
            </a>
          </div>

          <div class="mt-12 pt-8 border-t border-[var(--color-linen)] grid grid-cols-3 gap-4">
            <div v-for="proof in socialProof" :key="proof.value" class="text-center">
              <div class="font-serif text-2xl text-[var(--color-bark)] mb-1">{{ proof.value }}</div>
              <div class="font-sans text-[9px] tracking-[0.2em] uppercase text-[var(--color-clay)]">{{ proof.label }}</div>
            </div>
          </div>
        </div>

        <!-- Form card -->
        <div class="bg-white border border-[var(--color-linen)] p-8 lg:p-10 reveal">

          <Transition name="fade">
            <div v-if="submitted" class="flex flex-col items-center justify-center h-full py-16 text-center">
              <div class="w-14 h-14 bg-[var(--color-moss)]/10 flex items-center justify-center mb-5">
                <CheckCircleIcon :size="24" class="text-[var(--color-moss)]" />
              </div>
              <h3 class="font-serif text-2xl text-[var(--color-bark)] mb-2">Enquiry Sent</h3>
              <p class="font-sans text-sm text-[var(--color-bark)]/60 mb-6 max-w-xs">
                Thank you! We'll be in touch within one business day.
              </p>
              <button class="btn-outline text-xs" @click="reset">Send Another</button>
            </div>
          </Transition>

          <form v-if="!submitted" @submit.prevent="submit" class="space-y-5" novalidate>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="form-label" for="firstName">First Name *</label>
                <input id="firstName" v-model="form.firstName" type="text" class="form-input" placeholder="Priya" required />
              </div>
              <div>
                <label class="form-label" for="lastName">Last Name</label>
                <input id="lastName" v-model="form.lastName" type="text" class="form-input" placeholder="Sharma" />
              </div>
            </div>

            <div>
              <label class="form-label" for="email">Email *</label>
              <input id="email" v-model="form.email" type="email" class="form-input" placeholder="priya@example.com" required />
            </div>

            <div>
              <label class="form-label" for="phone">Phone</label>
              <input id="phone" v-model="form.phone" type="tel" class="form-input" placeholder="+91 98765 43210" />
            </div>

            <div>
              <label class="form-label" for="interest">I'm Interested In</label>
              <select id="interest" v-model="form.interest" class="form-input">
                <option value="">Select a category</option>
                <option v-for="opt in interestOptions" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>

            <div>
              <label class="form-label" for="message">Tell Us More</label>
              <textarea id="message" v-model="form.message" class="form-input resize-none" rows="4" placeholder="Room dimensions, inspiration, timeline…" />
            </div>

            <p v-if="error" class="font-sans text-xs text-red-600">{{ error }}</p>

            <button type="submit" class="btn-primary w-full justify-center" :disabled="loading">
              <span v-if="loading" class="animate-pulse">Sending…</span>
              <template v-else>
                Send Enquiry <SendIcon :size="14" />
              </template>
            </button>

            <p class="font-sans text-[10px] text-[var(--color-bark)]/40 text-center">
              No spam, ever. We respond within one business day.
            </p>
          </form>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PhoneIcon, MailIcon, MapPinIcon, SendIcon, CheckCircleIcon } from 'lucide-vue-next'

const { form, submitted, loading, error, submit, reset } = useEnquiry()

const interestOptions = [
  'Complete Home Furnishing', 'Living Room', 'Dining Room',
  'Bedroom', 'Home Office / Study', 'Custom / Bespoke Piece',
  'Showroom Visit', 'Workshop Tour',
]

const contactMethods = [
  { label: 'Call Us', icon: PhoneIcon, value: '+91 78528 233458', href: 'tel:+917852823345', external: false },
  { label: 'Email', icon: MailIcon, value: 'hello@woodcraftstudio.in', href: 'mailto:shaktiking2920@gmail.com', external: false },
  { label: 'Showroom', icon: MapPinIcon, value: 'JB HOTEL near Rajgarh road Saradhna Ajmer 305206', href: 'https://maps.google.com/?q=Hadapsar+Pune', external: true },
]

const socialProof = [
  { value: '2,400+', label: 'Happy Homes' },
  { value: '4.9★', label: 'Google Rating' },
  { value: '20 Yrs', label: 'Est. 2004' },
]
</script>

<style scoped>
.form-label {
  display: block;
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-bark);
  opacity: 0.6;
  margin-bottom: 0.4rem;
}
.form-input {
  width: 100%;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--color-bark);
  background: transparent;
  border: 1px solid rgba(44, 26, 14, 0.18);
  padding: 0.65rem 0.875rem;
  outline: none;
  transition: border-color 0.2s ease;
  appearance: none;
  -webkit-appearance: none;
}
.form-input:focus { border-color: var(--color-clay); }
.form-input::placeholder { color: rgba(44, 26, 14, 0.28); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
