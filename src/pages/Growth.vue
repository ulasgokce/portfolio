<script setup>
import { computed } from 'vue'
import { useI18n } from '../i18n'

const { t } = useI18n()
const g = computed(() => t.value.growth)
const linkedin = computed(() => t.value.footer.links.find((link) => link.label === 'LinkedIn')?.href)
</script>

<template>
  <main class="pt-32 sm:pt-36">
    <section class="rise mx-auto max-w-6xl px-5 pb-16 sm:px-8 sm:pb-24">
      <p class="text-sm tracking-[0.18em] text-sea uppercase">{{ g.label }}</p>
      <h1 class="mt-4 max-w-4xl font-serif text-5xl leading-[1.05] sm:text-7xl">{{ g.title }}</h1>
      <p class="mt-8 max-w-2xl text-lg leading-relaxed text-ink/90 sm:text-xl">{{ g.intro }}</p>
    </section>

    <section class="mx-auto grid max-w-6xl gap-8 border-t border-line px-5 py-14 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <h2 class="font-serif text-4xl">{{ g.shiftLabel }}</h2>
      <div class="max-w-2xl space-y-5 text-lg leading-relaxed text-ink/90">
        <p v-for="(paragraph, index) in g.shift" :key="index">{{ paragraph }}</p>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <h2 class="text-sm tracking-[0.18em] text-muted uppercase">{{ g.servicesLabel }}</h2>
      <div class="mt-8 grid gap-5 sm:grid-cols-2">
        <article
          v-for="(service, index) in g.services"
          :key="service.title"
          class="rise lift border border-line bg-card p-6 sm:p-8"
          :style="{ animationDelay: `${index * 80}ms` }"
        >
          <h3 class="font-serif text-3xl">{{ service.title }}</h3>
          <p class="mt-3 text-muted">{{ service.body }}</p>
        </article>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <h2 class="text-sm tracking-[0.18em] text-muted uppercase">{{ g.tipsLabel }}</h2>
      <ol class="mt-8 space-y-10">
        <li
          v-for="(tip, index) in g.tips"
          :key="tip.title"
          class="grid gap-4 border-t border-line pt-8 sm:grid-cols-[6rem_1fr] sm:gap-8"
        >
          <span class="font-serif text-6xl leading-none text-sea italic">{{ String(index + 1).padStart(2, '0') }}</span>
          <div class="max-w-2xl">
            <h3 class="font-serif text-3xl sm:text-4xl">{{ tip.title }}</h3>
            <p class="mt-4 text-lg leading-relaxed text-ink/90">{{ tip.body }}</p>
          </div>
        </li>
      </ol>
    </section>

    <section class="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <h2 class="text-sm tracking-[0.18em] text-muted uppercase">{{ g.impactLabel }}</h2>
      <ul class="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2">
        <li v-for="impact in g.impacts" :key="impact" class="flex gap-3 text-lg leading-relaxed">
          <span class="mt-[0.7em] h-1.5 w-1.5 shrink-0 bg-sea" aria-hidden="true"></span>
          <span>{{ impact }}</span>
        </li>
      </ul>
    </section>

    <section class="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <div class="max-w-2xl border-t border-line pt-10">
        <h2 class="font-serif text-4xl">{{ g.moreTitle }}</h2>
        <p class="mt-5 text-lg leading-relaxed text-ink/90">{{ g.moreBody }}</p>
        <p class="mt-5 text-sm text-muted">{{ g.proof }}</p>
      </div>
    </section>

    <section class="mx-auto mb-20 max-w-6xl border-y border-line bg-deep px-6 py-16 sm:mb-28 sm:px-12 sm:py-20">
      <h2 class="max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">{{ g.ctaTitle }}</h2>
      <p class="mt-5 max-w-xl text-lg leading-relaxed text-ink/90">{{ g.ctaBody }}</p>
      <a
        v-if="linkedin"
        :href="linkedin"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-8 inline-flex border border-sea px-6 py-3 text-sea transition-colors hover:bg-sea hover:text-paper"
      >
        {{ g.ctaLink }}
      </a>
    </section>
  </main>
</template>
