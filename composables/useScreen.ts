import { useMediaQuery } from '@vueuse/core'

export default function useScreen() {
  const isMobile = useMediaQuery('(max-width: 1279px)')

  const isDesktop = computed(() => !isMobile.value)

  return {
    isMobile,
    isDesktop,
  }
}
