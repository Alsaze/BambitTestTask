<template>
  <div ref="wrapper" class="short-text">
    <!--    Mobile -->
    <UTooltip
      v-if="isMobile"
      :text="text"
      :open="open"
      :disabled="!tooltipEnabled"
      :ui="{ text: 'whitespace-normal break-words', content: 'max-w-50 h-auto' }"
    >
      <span :class="textPrimary ? 'short-text--primary' : ''">{{ text }}</span>
      <Icon
        v-if="tooltipEnabled"
        name="heroicons:information-circle"
        class="short-text__icon"
        @click.stop="open = !open"
      />
    </UTooltip>

    <!-- Desktop -->
    <UTooltip
      v-else
      :text="text"
      :disabled="!tooltipEnabled"
      :ui="{ text: 'whitespace-normal break-words', content: 'max-w-80 h-auto' }"
    >
      <span :class="textPrimary ? 'short-text--primary' : ''">{{ text }}</span>
    </UTooltip>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

defineProps<{ text: string, textPrimary?: boolean }>()

const wrapper = ref<HTMLElement | null>(null)
const open = ref(false)
const tooltipEnabled = ref(true)

const { isMobile } = useScreen()

onClickOutside(wrapper, () => {
  open.value = false
})
</script>

<style lang="scss">
.short-text {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;

  &--primary {
    cursor: pointer;
    text-decoration: underline;
    color: var(--ui-primary);

    &:hover {
      color: var(--ui-primary-hover);
    }
  }

  > span {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__icon {
    flex-shrink: 0;
  }
}
</style>
