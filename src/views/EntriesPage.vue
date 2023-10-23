<script setup lang="ts">
import dayjs from 'dayjs'
import type { IEntry } from '@/declarations/entries'
import type { IFilters } from '@/declarations/filters'
import { Tag } from '@/declarations/entries'
import { getEntries } from '@/services/api/entries'

const router = useRouter()
const route = useRoute()

let entries = $ref<IEntry[] | null>(null)
let loading = $ref<boolean>(false)
let selectedAuthor = $ref<string>('')
let selectedTag = $ref<string>('')
let selectedMonth = $ref<string>('')
let filters = $ref({
  author: route.query.author,
  tags: route.query.tags,
  title: route.query.title
})

const longMonthList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const listOfMonth = $computed(() => {
  const set = new Set<string>()
  entries?.forEach((entry) => {
    set.add(`${longMonthList[dayjs(entry.createdAt).month()]}`)
  })

  return Array.from(set).sort((a, b) =>
    longMonthList.indexOf(a) > longMonthList.indexOf(b) ? 1 : -1
  )
})

const listOfTags = $computed<string[]>(() => Object.values(Tag))

const listOfAuthors = $computed(() => {
  const set = new Set<string>()
  entries?.forEach((entry) => {
    set.add(entry.author)
  })

  return Array.from(set).sort((a, b) => (a > b ? 1 : -1))
})

const entriesCountByMonth = $computed<number | null>(
  () =>
    entries?.filter((entry) => longMonthList[dayjs(entry.createdAt).month()] === selectedMonth)
      .length ?? null
)
const entriesCountByAuthor = $computed<number | null>(
  () => entries?.filter((entry) => entry.author === selectedAuthor).length ?? null
)
const entriesCountByTag = $computed<number | null>(
  () => entries?.filter((entry) => (entry.tags as string[]).includes(selectedTag)).length ?? null
)

const fields = $computed<string[]>(() => {
  const set = new Set<string>()
  entries?.forEach((entry) => {
    Object.keys(entry).forEach((key) => set.add(key))
  })
  return Array.from(set)
})

const onSort = (field: string) => {
  const { sortBy, dir } = route.query
  router.push({
    query: {
      ...route.query,
      sortBy: field,
      dir: sortBy !== field ? 'asc' : (dir === 'asc' && 'desc') || 'asc'
    }
  })
}

const onFilter = (filter: IFilters) => {
  const queryParams = { ...route.query, [filter.type]: filter.value }
  router.push({ query: queryParams })
}

const onClearFilters = () => {
  router.push({ query: {} })
  filters.author = null
  filters.tags = null
  filters.title = null
}

const loadEntries = async () => {
  loading = true
  try {
    entries = await getEntries()
  } catch (ex) {
    console.error(ex)
  }
  loading = false
}

// the sooner the better..
loadEntries()

const entriesData = $computed(() => {
  return entries
    ?.sort((a, b) => {
      let direction
      if (a[route.query.sortBy as keyof IEntry] < b[route.query.sortBy as keyof IEntry]) {
        direction = -1
      } else if (a[route.query.sortBy as keyof IEntry] > b[route.query.sortBy as keyof IEntry]) {
        direction = 1
      } else direction = 0

      return route.query.dir === 'asc' ? direction : -direction
    })
    .filter((entry) => entry.author.includes((route.query.author as string) ?? ''))
    .filter((entry) => entry.title.includes((route.query.title as string) ?? ''))
    .filter((entry) => entry.tags.find((tag) => tag.includes((route.query.tags as Tag) ?? '')))
})
</script>

<template>
  <div class="entries container mx-auto px-5 mt-5">
    <div v-if="loading" class="flex justify-center">
      <LoadingSpinner />
    </div>
    <div v-else>
      <h2 class="text-xl uppercase font-bold text-right border-b mb-3">statistics</h2>
      <!--
        this section could be a component with some dynamic fields but lack of time to perform it better...
      -->
      <div class="stats flex flex-col justify-center md:justify-between md:flex-row gap-4 mb-10">
        <BaseCard>
          <p class="text-sm font-bold mb-2">Total number of entries: {{ entries?.length }}</p>
        </BaseCard>
        <BaseCard class="gap-2">
          <p class="text-sm font-bold">
            Number of entries by author: {{ selectedAuthor ? entriesCountByAuthor : '' }}
          </p>
          <BaseSelect v-model="selectedAuthor" :options="listOfAuthors" />
        </BaseCard>
        <BaseCard class="gap-2">
          <p class="text-sm font-bold">
            Number of entries by tag: {{ selectedTag ? entriesCountByTag : '' }}
          </p>
          <BaseSelect v-model="selectedTag" :options="listOfTags" />
        </BaseCard>
        <BaseCard class="gap-2">
          <p class="text-sm font-bold">
            Number of entries by month: {{ selectedMonth ? entriesCountByMonth : '' }}
          </p>
          <BaseSelect v-model="selectedMonth" :options="listOfMonth" />
        </BaseCard>
      </div>

      <h2 class="text-xl uppercase font-bold text-right border-b mb-3">filters</h2>
      <div class="filters flex flex-col justify-center md:justify-between md:flex-row gap-4 mb-10">
        <BaseSelect
          @change="onFilter({ type: 'author', value: ($event.target as HTMLInputElement).value })"
          :options="listOfAuthors"
          :modelValue="filters.author as string"
        />
        <BaseSelect
          @change="onFilter({ type: 'tags', value: ($event.target as HTMLInputElement).value })"
          :options="listOfTags"
          :modelValue="filters.tags as string"
        />
        <BaseInput
          @input="onFilter({ type: 'title', value: ($event.target as HTMLInputElement).value })"
          placeholder="-- insert a title --"
          :modelValue="filters.title as string"
        />
        <button @click="onClearFilters">clear</button>
      </div>

      <!-- 
        Would be nice to have a pagination on the api
        I would have done a simple one but lack of time...
      -->
      <div class="relative overflow-x-auto">
        <BaseTable :fields="fields" :data="entriesData" sortable @sort="onSort">
          <template #action="{ id }">
            <RouterLink :to="`/entries/${id}`">view</RouterLink>
          </template>
        </BaseTable>
      </div>
    </div>
  </div>
</template>
