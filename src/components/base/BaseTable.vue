<script setup lang="ts">
defineProps<{
  fields: string[]
  data: Record<string, any>[] | undefined
  sortable?: boolean
}>()

const emit = defineEmits<{
  (_event: 'sort', _value: string): void
}>()

const route = useRoute()

const onSort = (field: string) => {
  emit('sort', field)
}

const slots = useSlots()
</script>

<template>
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th v-for="field in fields" :key="field" scope="col" class="px-6 py-3">
          <span
            v-if="sortable"
            :class="[
              {
                'text-blue-700 underline': field === route.query.sortBy
              },
              'cursor-pointer'
            ]"
            @click="onSort(field)"
          >
            {{ field }}
          </span>
          <span v-else>{{ field }}</span>
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="entry in data"
        :key="entry.id"
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      >
        <td v-for="item in Object.values(entry)" :key="`${item}`" class="px-6 py-4">
          <slot name="locales" v-if="!!slots.locales && Array.isArray(item)" :item="item"></slot>
          <span v-else>{{ item }}</span>
        </td>
        <td class="px-6 py-4">
          <slot name="action" :id="entry.id"></slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>
