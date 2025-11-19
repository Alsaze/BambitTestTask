// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [], // Nuxt сам заполняет content автоматически
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // если используешь @nuxt/fonts или свою кастомную типографику
      },
    },
  },
  plugins: [],
}

export default config
