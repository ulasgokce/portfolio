<script setup>
import { useI18n } from '../i18n'

const { t } = useI18n()
</script>

<template>
  <main>
    <section class="mx-auto grid min-h-[100svh] max-w-6xl items-center gap-10 px-5 pt-28 pb-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pt-24">
      <div class="rise">
        <p class="text-sm tracking-[0.18em] text-sea uppercase">{{ t.home.role }}</p>
        <h1 class="mt-4 max-w-4xl font-serif text-[clamp(4.2rem,10vw,7rem)] leading-[0.88] font-normal tracking-tight text-ink">
          Ulaş<br />
          <span class="italic text-sea">Gökçe</span>
        </h1>
        <p class="mt-8 max-w-xl text-lg leading-relaxed text-ink sm:text-xl">{{ t.home.lede }}</p>
        <ol class="mt-8 flex flex-col gap-2 text-sm text-muted sm:flex-row sm:gap-8">
          <li v-for="item in t.home.timeline" :key="item.place">
            <span class="text-sea">{{ item.years }}</span>
            {{ item.place }}
          </li>
        </ol>
        <RouterLink to="/about" class="mt-8 inline-flex text-sea hover:text-ink">
          {{ t.home.aboutLink }}
        </RouterLink>
      </div>
      <img
        src="/images/me-in-suit.webp"
        :alt="t.home.photoAlt"
        width="664"
        height="1182"
        decoding="async"
        fetchpriority="high"
        class="rise rise-late h-80 w-full object-cover object-[center_18%] sm:h-[28rem] lg:h-[32rem]"
      />
    </section>

    <section class="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div class="flex items-end justify-between gap-6">
        <h2 class="text-sm tracking-[0.18em] text-muted uppercase">{{ t.home.featured }}</h2>
        <RouterLink to="/work" class="text-sm text-sea hover:text-ink">{{ t.home.all }}</RouterLink>
      </div>
      <div class="mt-8 grid gap-5 md:grid-cols-2">
        <RouterLink
          v-for="(slug, index) in t.featured"
          :key="slug"
          :to="`/work/${slug}`"
          class="group rise lift flex flex-col overflow-hidden border border-line bg-card"
          :class="index === 0 ? 'md:col-span-2' : ''"
          :style="{ animationDelay: `${index * 90}ms` }"
        >
          <div
            class="flex items-center justify-center bg-logo"
            :class="index === 0 ? 'h-56 sm:h-72' : 'h-44'"
          >
            <img
              :src="t.pieces[slug].image"
              :alt="t.pieces[slug].imageAlt"
              width="320"
              height="120"
              loading="lazy"
              decoding="async"
              class="max-h-[62%] max-w-[72%] object-contain transition duration-500 group-hover:scale-[1.03]"
            />
          </div>
          <div class="p-6 sm:p-8">
            <p class="text-xs tracking-[0.16em] text-sea uppercase">{{ t.pieces[slug].kicker }}</p>
            <h3 class="mt-2 font-serif text-4xl sm:text-5xl">{{ t.pieces[slug].title }}</h3>
            <p class="mt-3 max-w-lg text-muted">{{ t.pieces[slug].summary }}</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <section class="rise mx-auto mb-20 max-w-6xl border-y border-line bg-deep px-6 py-16 sm:mb-28 sm:px-12 sm:py-20">
      <p class="max-w-xl font-serif text-3xl leading-snug text-ink sm:text-4xl">{{ t.home.ai }}</p>
      <RouterLink to="/work/eklentiler" class="mt-5 inline-flex text-sea hover:text-ink">{{ t.home.aiLink }}</RouterLink>
    </section>
  </main>
</template>
