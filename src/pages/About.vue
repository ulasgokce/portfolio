<script setup>
import { useI18n } from '../i18n'

const { t } = useI18n()
</script>

<template>
  <main class="pt-28">
    <section class="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:pb-24">
      <div class="rise-late overflow-hidden">
        <img
          src="/images/about-macbook.webp"
          :alt="t.about.imageAlt"
          width="864"
          height="1152"
          decoding="async"
          fetchpriority="high"
          class="h-[28rem] w-full object-cover object-center sm:h-[36rem]"
        />
      </div>
      <div class="rise">
        <p class="text-sm tracking-[0.18em] text-sea uppercase">{{ t.about.label }}</p>
        <h1 class="mt-4 max-w-xl font-serif text-5xl leading-[1.05] sm:text-6xl">{{ t.about.title }}</h1>
        <div class="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-ink/90">
          <p v-for="(paragraph, index) in t.about.paragraphs.slice(0, 3)" :key="index">{{ paragraph }}</p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-5 sm:px-8">
      <div class="max-w-2xl space-y-5 border-t border-line py-14 text-lg leading-relaxed text-ink/90">
        <p v-for="(paragraph, index) in t.about.paragraphs.slice(3)" :key="index">{{ paragraph }}</p>
      </div>
    </section>

    <section class="relative mt-4">
      <img
        src="/images/night-road.webp"
        :alt="t.about.roadAlt"
        width="1280"
        height="720"
        loading="lazy"
        decoding="async"
        class="h-[28rem] w-full object-cover sm:h-[36rem]"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#12324d]/80 via-[#12324d]/10 to-transparent"></div>
      <p class="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-5 pb-10 font-serif text-3xl leading-snug text-white sm:px-8 sm:text-5xl">
        {{ t.about.roadCaption }}
      </p>
    </section>

    <section class="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <h2 class="text-sm tracking-[0.18em] text-muted uppercase">{{ t.about.stackLabel }}</h2>
      <ul class="mt-6 flex flex-wrap gap-x-4 gap-y-3">
        <li v-for="item in t.about.stack" :key="item" class="text-ink">
          <span class="text-sea">·</span>
          {{ item }}
        </li>
      </ul>
      <div class="mt-16 border-t border-line pt-10">
        <p class="text-sm tracking-[0.18em] text-muted uppercase">{{ t.about.contactLabel }}</p>
        <p class="mt-3 text-lg">{{ t.about.contact }}</p>
        <ul class="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          <li v-for="link in t.footer.links" :key="link.href">
            <a class="text-sea hover:text-ink" :href="link.href" target="_blank" rel="noopener noreferrer">
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>
