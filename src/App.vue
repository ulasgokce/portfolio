<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from './i18n'
import { useTheme } from './theme'

const route = useRoute()
const { t, locale, setLocale } = useI18n()
const { theme, toggleTheme } = useTheme()

const pageTitle = computed(() => {
  if (route.name === 'about') return t.value.about.metaTitle
  if (route.name === 'work') return t.value.work.metaTitle
  if (route.name === 'growth') return t.value.growth.metaTitle
  if (route.name === 'work-detail') {
    const piece = t.value.pieces[route.params.slug]
    return piece ? `${piece.title} — Ulaş Gökçe` : t.value.meta.title
  }
  return t.value.meta.title
})

const pageDescription = computed(() => {
  if (route.name === 'about') return t.value.about.paragraphs[0]
  if (route.name === 'work') return t.value.work.intro
  if (route.name === 'growth') return t.value.growth.title
  if (route.name === 'work-detail') {
    return t.value.pieces[route.params.slug]?.summary || t.value.meta.description
  }
  return t.value.meta.description
})

function setMeta(selector, content) {
  const el = document.querySelector(selector)
  if (el && content) el.setAttribute('content', content)
}

watch(locale, (value) => {
  document.documentElement.lang = value
}, { immediate: true })

watch([pageTitle, pageDescription, () => route.fullPath], () => {
  document.title = pageTitle.value
  const url = `${window.location.origin}${route.fullPath}`
  setMeta('meta[name="description"]', pageDescription.value)
  setMeta('meta[property="og:title"]', pageTitle.value)
  setMeta('meta[property="og:description"]', pageDescription.value)
  setMeta('meta[property="og:url"]', url)
  setMeta('meta[name="twitter:title"]', pageTitle.value)
  setMeta('meta[name="twitter:description"]', pageDescription.value)
  const canonical = document.querySelector('link[rel="canonical"]')
  if (canonical) canonical.setAttribute('href', url)
}, { immediate: true })
</script>

<template>
  <div class="min-h-screen text-ink">
    <header class="fixed inset-x-0 top-0 z-20 border-b border-line bg-paper/80 backdrop-blur-md">
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <RouterLink to="/" class="flex shrink-0 items-center gap-2.5 font-serif text-xl tracking-tight text-ink" aria-label="Ulaş Gökçe">
          <img src="/images/mark.webp" alt="" width="144" height="120" decoding="async" class="h-8 w-8 sm:h-9 sm:w-9" />
          <span class="hidden sm:inline">Ulaş Gökçe</span>
        </RouterLink>
        <nav class="flex items-center gap-2.5 text-[13px] whitespace-nowrap sm:gap-7 sm:text-sm">
          <RouterLink
            to="/work"
            class="text-ink/80 hover:text-sea"
            active-class="!text-sea"
          >
            {{ t.nav.work }}
          </RouterLink>
          <RouterLink
            to="/about"
            class="text-ink/80 hover:text-sea"
            active-class="!text-sea"
          >
            {{ t.nav.about }}
          </RouterLink>
          <RouterLink
            to="/growth"
            class="text-ink/80 hover:text-sea"
            active-class="!text-sea"
          >
            {{ t.nav.growth }}
          </RouterLink>
          <button
            type="button"
            class="flex items-center text-muted hover:text-ink"
            :aria-pressed="theme === 'dark'"
            :aria-label="theme === 'dark' ? t.nav.toLight : t.nav.toDark"
            @click="toggleTheme"
          >
            <svg
              class="h-4 w-4 sm:hidden"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <template v-if="theme === 'dark'">
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </template>
              <path v-else d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
            </svg>
            <span class="hidden sm:inline">{{ theme === 'dark' ? t.nav.light : t.nav.dark }}</span>
          </button>
          <div class="flex items-center gap-0.5 text-muted sm:gap-1" role="group" aria-label="Language">
            <button
              type="button"
              class="px-1"
              :class="locale === 'tr' ? 'text-ink' : 'hover:text-ink'"
              :aria-pressed="locale === 'tr'"
              @click="setLocale('tr')"
            >
              TR
            </button>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              class="px-1"
              :class="locale === 'en' ? 'text-ink' : 'hover:text-ink'"
              :aria-pressed="locale === 'en'"
              @click="setLocale('en')"
            >
              EN
            </button>
          </div>
        </nav>
      </div>
    </header>

    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>

    <footer class="border-t border-line">
      <div class="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <RouterLink to="/" class="flex items-center gap-2.5 font-serif text-2xl text-ink">
          <img src="/images/mark.webp" alt="" width="144" height="120" decoding="async" loading="lazy" class="h-8 w-8" />
          Ulaş Gökçe
        </RouterLink>
        <ul class="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <li v-for="link in t.footer.links" :key="link.href">
            <a class="text-sea hover:text-ink" :href="link.href" target="_blank" rel="noopener noreferrer">
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>
