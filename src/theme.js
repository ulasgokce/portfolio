import { computed, reactive } from 'vue'

const stored = localStorage.getItem('theme')
const state = reactive({
  theme: stored === 'dark' ? 'dark' : 'light',
})

function apply(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#0c1826' : '#f6f1e8')
}

apply(state.theme)

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
