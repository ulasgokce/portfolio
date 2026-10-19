import { computed, reactive } from 'vue'

const query = window.matchMedia('(prefers-color-scheme: dark)')

function stored() {
  const value = localStorage.getItem('theme')
  return value === 'dark' || value === 'light' ? value : null
}

const state = reactive({
  theme: stored() || (query.matches ? 'dark' : 'light'),
})

function apply(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#0c1826' : '#f6f1e8')
}

apply(state.theme)

query.addEventListener('change', (event) => {
  if (stored()) return
  state.theme = event.matches ? 'dark' : 'light'
  apply(state.theme)
})

export function useTheme() {
  const theme = computed(() => state.theme)

  function setTheme(next) {
    state.theme = next === 'dark' ? 'dark' : 'light'
    localStorage.setItem('theme', state.theme)
    apply(state.theme)
  }

  function toggleTheme() {
    setTheme(state.theme === 'dark' ? 'light' : 'dark')
  }

  return { theme, setTheme, toggleTheme }
}
