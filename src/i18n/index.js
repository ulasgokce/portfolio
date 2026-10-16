import { computed, reactive } from 'vue'
import en from './en'
import tr from './tr'

const stored = localStorage.getItem('locale')
const state = reactive({
  locale: stored === 'tr' ? 'tr' : 'en',
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
