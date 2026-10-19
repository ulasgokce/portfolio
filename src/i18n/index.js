import { computed, reactive } from 'vue'
import en from './en'
import tr from './tr'

function initialLocale() {
  const stored = localStorage.getItem('locale')
  if (stored === 'tr' || stored === 'en') return stored
  const preferred = navigator.languages?.[0] || navigator.language || ''
  return preferred.toLowerCase().startsWith('tr') ? 'tr' : 'en'
}

const state = reactive({
  locale: initialLocale(),
})

const catalogs = { tr, en }

export function useI18n() {
  const t = computed(() => catalogs[state.locale])
  const locale = computed(() => state.locale)

  function setLocale(next) {
    state.locale = next === 'en' ? 'en' : 'tr'
    localStorage.setItem('locale', state.locale)
    document.documentElement.lang = state.locale
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', catalogs[state.locale].meta.description)
  }

  return { t, locale, setLocale }
}
