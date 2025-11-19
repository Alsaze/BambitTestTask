<template>
  <div class="index-page">
    <div class="index-page__search">
      <UInput
        :model-value="search"
        size="xl"
        class="w-full"
        placeholder="Поиск..."
        :loading="postsIsLoading || usersIsLoading"
        @update:model-value="updateSearch"
      />
    </div>

    <UiTable :table-data="tableData" :columns="columns" height="600px" width="600px" />

    <UserModal v-if="selectedUser" :user="selectedUser" @close="selectedUser = null" />
  </div>
</template>

<script setup lang="ts">
import type { ColumnDef } from '@tanstack/table-core'
import { createColumnHelper } from '@tanstack/vue-table'
import { useDebounceFn } from '@vueuse/core'
import { useGetPosts, useGetUsers } from '~/api/queries'
import UserModal from '~/components/modals/UserModal.vue'
import ShortText from '~/components/ShortText.vue'
import UiTable from '~/components/UiTable.vue'

const selectedUser = ref<User | null>(null)
const search = ref('')
const updateSearch = useDebounceFn((value: string) => {
  search.value = value
}, 500)
const { data: posts, isLoading: postsIsLoading } = useGetPosts(search)
const { data: users, isLoading: usersIsLoading } = useGetUsers()

interface TablePost extends Post {
  userEmail: User['email']
}

const tableData = computed(() => {
  return (posts.value ?? []).map(post => ({
    ...post,
    userEmail: users?.value?.find(user => user?.id === post?.userId)?.email,
  } as TablePost))
})

const columnHelper = createColumnHelper<TablePost>()
const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    meta: {
      width: '55px',
    },
  }),
  columnHelper.accessor('title', {
    header: 'Заголовок',
    cell: info => h(ShortText, {
      text: info.getValue(),
    }),
    meta: {
      width: '150px',
    },
  }),
  columnHelper.accessor('userEmail', {
    header: 'Автор',
    cell: info =>
      h(ShortText, {
        text: info.getValue(),
        textPrimary: true,
        onClick: () => openPost(info.row.original),
      }),
    meta: {
      width: '170px',
    },
  }),
  columnHelper.accessor('body', {
    header: 'Контент',
    cell: info => h(ShortText, {
      text: info.getValue(),
    }),
    meta: {
      width: 'minmax(215px, 1fr)',
    },
  }),
] as ColumnDef<TablePost>[]

function openPost(post: Post) {
  const foundUser = users.value?.find(user => user?.id === post.userId)

  if (foundUser) {
    selectedUser.value = foundUser
  }
}
</script>

<style lang="scss">
.index-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin-inline: auto;
  padding-bottom: 40px;
  position: relative;

  &__search {
    position: fixed;
    top: 48px;
    left: 50%;
    transform: translateX(-50%);
    max-width: 600px;
    width: 100%;

    z-index: 1000;
    background: var(--ui-bg-base);

    @include mobile {
      padding-inline: 10px;
    }
  }
}
</style>
