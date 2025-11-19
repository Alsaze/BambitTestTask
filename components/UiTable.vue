<template>
  <div
    ref="tableContainerRef"
    class="table-wrapper"
    :style="{ height, width }"
  >
    <div :style="{ height: `${totalSize}px` }">
      <table>
        <thead>
          <tr
            v-for="headerGroup in table?.getHeaderGroups()"
            :key="headerGroup?.id"
            :style="{ gridTemplateColumns }"
          >
            <th
              v-for="header in headerGroup?.headers"
              :key="header.id"
              :colspan="header?.colSpan"
              @click="header?.column?.getToggleSortingHandler()?.($event)"
            >
              <FlexRender
                v-if="!header?.isPlaceholder"
                :render="header?.column?.columnDef?.header"
                :props="header?.getContext()"
              />

              {{ { asc: ' 🔼', desc: ' 🔽' }[header.column.getIsSorted() as string] }}
            </th>
          </tr>
        </thead>

        <tbody :style="{ height: `${totalSize}px` }">
          <tr
            v-for="vRow in virtualRows"
            :ref="measureElement"
            :key="rows[vRow?.index]?.id"
            :data-index=" vRow?.index"
            :style="{ gridTemplateColumns, transform: `translateY(${vRow?.start}px)` }"
          >
            <td
              v-for="cell in rows[vRow?.index]?.getVisibleCells()"
              :key="cell?.id"
            >
              <FlexRender
                :render="cell?.column?.columnDef?.cell"
                :props="cell?.getContext()"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RowData } from '@tanstack/table-core'
import type { ColumnDef } from '@tanstack/vue-table'
import { FlexRender, getCoreRowModel, getSortedRowModel, useVueTable } from '@tanstack/vue-table'
import { useVirtualizer } from '@tanstack/vue-virtual'

declare module '@tanstack/vue-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    width?: string
  }
}

const props = defineProps<{
  tableData: any[]
  columns: ColumnDef<any>[]
  height: string
  width: string
}>()

const table = useVueTable({
  get data() {
    return props?.tableData
  },
  columns: props?.columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
})

const rows = computed(() => table?.getRowModel()?.rows)
const tableContainerRef = ref<HTMLDivElement | null>(null)

const rowVirtualizerOptions = computed(() => {
  return {
    count: rows?.value?.length,
    estimateSize: () => 50,
    getScrollElement: () => tableContainerRef?.value,
    overscan: 5,
  }
})

const rowVirtualizer = useVirtualizer(rowVirtualizerOptions)

const virtualRows = computed(() => rowVirtualizer?.value?.getVirtualItems())
const totalSize = computed(() => rowVirtualizer?.value?.getTotalSize())

const gridTemplateColumns = computed(() => {
  return props.columns.map((column) => {
    return column.meta?.width || '1fr'
  }).join(' ')
})

function measureElement(el?: Element) {
  if (!el) {
    return
  }

  rowVirtualizer?.value?.measureElement(el)

  return undefined
}
</script>

<style lang="scss">
/* -------------------- TABLE WRAPPER -------------------- */
.table-wrapper {
  position: relative;
  margin-top: calc(40px + 10px);
  border-radius: 14px;
  overflow: auto;
  width: 100%;

  @include mobile {
    height: 500px !important;
    width: 100% !important;
  }
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  background: var(--ui-bg-elevated);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  white-space: nowrap;
}

/* -------------------- HEADER -------------------- */

thead {
  position: sticky;
  top: 0;
  z-index: 1;
  background: var(--ui-bg-accented);
}

thead tr {
  width: 100%;
}

thead th {
  flex-shrink: 0;
  background: var(--ui-bg-accented);
  color: var(--ui-text);
  padding: 12px 14px;

  border-bottom: 1px solid var(--ui-border);
  user-select: none;

  transition: background 0.15s ease;
}

thead th:hover {
  cursor: pointer;
}

/* -------------------- BODY -------------------- */

tbody {
  position: relative;
}

tbody tr {
  position: absolute;
  width: 100%;
  height: 50px;
  transition: background 0.2s ease;
}

tbody tr:nth-child(odd) {
  background: var(--ui-bg-subtle);
}

tbody tr:hover {
  background: var(--ui-bg-accented);
}

tbody td {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 10px 12px;
  border-bottom: 1px solid var(--ui-border-subtle);
}

tbody tr:last-child td {
  border-bottom: none;
}

tr {
  display: grid;
}

th,
td {
  overflow: hidden;
}
</style>
