<script setup>
import { useI18n } from '../i18n'

const { t } = useI18n()
</script>

<template>
  <main class="mx-auto max-w-6xl px-5 pt-32 pb-20 sm:px-8 sm:pt-36">
    <p class="text-sm tracking-[0.18em] text-sea uppercase">{{ t.work.label }}</p>
    <h1 class="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] sm:text-6xl">{{ t.work.title }}</h1>
    <p class="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{{ t.work.intro }}</p>

    <ol class="mt-14">
      <li
        v-for="(slug, index) in t.order"
        :key="slug"
        class="rise border-t border-line"
        :style="{ animationDelay: `${index * 70}ms` }"
      >
        <RouterLink :to="`/work/${slug}`" class="group grid items-center gap-5 py-7 sm:grid-cols-[9rem_1fr] sm:gap-8">
          <span class="flex h-24 items-center justify-center border border-line bg-logo px-3 transition-colors duration-500">
            <img
              :src="t.pieces[slug].image"
              :alt="t.pieces[slug].imageAlt"
              width="160"
              height="64"
              loading="lazy"
              decoding="async"
              class="max-h-16 w-full object-contain"
            />
          </span>
          <div class="grid gap-2 sm:grid-cols-[minmax(0,1fr)_18rem] sm:items-center sm:gap-10">
            <div>
              <p class="text-xs tracking-[0.16em] text-sea uppercase">{{ t.pieces[slug].kicker }}</p>
              <h2 class="mt-1 font-serif text-3xl group-hover:text-sea">{{ t.pieces[slug].title }}</h2>
            </div>
            <p class="text-sm leading-relaxed text-muted">{{ t.pieces[slug].summary }}</p>
          </div>
        </RouterLink>
      </li>
    </ol>
  </main>
</template>
