<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from '../i18n'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const slug = computed(() => route.params.slug)
const piece = computed(() => t.value.pieces[slug.value])
const nextSlug = computed(() => {
  const list = t.value.order
  const index = list.indexOf(slug.value)
  if (index === -1) return list[0]
  return list[(index + 1) % list.length]
})

watch(piece, (value) => {
  if (!value) router.replace('/work')
}, { immediate: true })
</script>

<template>
  <main v-if="piece">
    <section class="border-b border-line bg-card pt-28">
      <div class="mx-auto flex max-w-6xl flex-col px-5 pb-12 sm:px-8">
        <span class="rise inline-flex w-fit bg-logo px-5 py-4">
          <img :src="piece.image" :alt="piece.imageAlt" width="320" height="80" decoding="async" class="h-20 w-auto max-w-xs object-contain object-left" />
        </span>
        <p class="mt-8 text-sm tracking-[0.18em] text-sea uppercase">{{ piece.kicker }}</p>
        <h1 class="mt-3 font-serif text-5xl text-ink sm:text-7xl">{{ piece.title }}</h1>
        <p class="mt-3 text-sm text-muted">{{ piece.meta }}</p>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <div class="max-w-2xl space-y-5 text-lg leading-relaxed">
        <p v-for="(paragraph, index) in piece.paragraphs" :key="index">{{ paragraph }}</p>
      </div>
      <a
        v-if="piece.href"
        class="mt-8 inline-block text-sea hover:text-ink"
        :href="piece.href"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ piece.link }}
      </a>

      <div class="mt-16 flex items-center justify-between border-t border-line pt-6 text-sm">
        <RouterLink to="/work" class="text-muted hover:text-ink">{{ t.back }}</RouterLink>
        <RouterLink :to="`/work/${nextSlug}`" class="text-sea hover:text-ink">
          {{ t.next }} · {{ t.pieces[nextSlug].title }}
        </RouterLink>
      </div>
    </section>
  </main>
</template>
