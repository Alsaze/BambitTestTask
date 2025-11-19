<template>
  <UModal
    v-model:open="open"
    :title="user.email"
    class="user-modal"
    @after:leave="emit('close')"
  >
    <template #body>
      <div>
        <div>Имя: {{ user.name }}</div>
        <div>Логин: {{ user.username }}</div>
        <div>
          <a
            :href="`mailto:${user.email}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            Электронная почта: <span>{{ user.email }}</span>
          </a>
        </div>
        <div>
          <a
            :href="`tel:${user.phone}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            Телефон: <span>{{ user.phone }}</span>
          </a>
        </div>
        <a
          :href="`https://${user.website}`"
          target="_blank"
        >
          Веб-сайт: <span>{{ user.website }}</span>
        </a>
        <div>Название компании: {{ user.company.name }}</div>
        <div>Адрес: {{ `${user.address.street} ${user.address.suite} ${user.address.city}` }}</div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const props = defineProps<{ user: User }>()

const emit = defineEmits<{
  close: []
}>()

const open = ref(!!props.user)

watch(() => props.user, (user) => {
  if (!user)
    return

  open.value = true
})
</script>

<style lang="scss">
.user-modal {
  a {
    span {
      cursor: pointer;
      text-decoration: underline;
      color: var(--ui-primary);

      &:hover {
        color: var(--ui-primary-hover);
      }
    }
  }
}
</style>
