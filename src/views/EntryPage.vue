<script setup lang="ts">
import type { IEntry } from '@/declarations/entries'
import type { IProject } from '@/declarations/projects'
import type { ILocales } from '@/declarations/locales'
import { getEntry } from '@/services/api/entries'
import { getProjects, createProject } from '@/services/api/projects'
import { getLocales } from '@/services/api/locales'

const route = useRoute()
let entry = $ref<IEntry[] | undefined>(undefined)
let projects = $ref<IProject[] | undefined>(undefined)
let locales = $ref<ILocales | null>(null)
let showModal = $ref<boolean>(false)
let selectedLocales = $ref<string[]>([])

const loadEntry = async () => {
  entry = [await getEntry(route.params.id as string)]
}

const loadProjects = async () => {
  projects = await getProjects()
}

const loadLocales = async () => {
  locales = await getLocales()
}

const loadPage = async () => {
  try {
    await Promise.all([loadEntry(), loadProjects(), loadLocales()]) // or Promise.allSettled depending
  } catch (error) {
    console.log(error)
  }
}

const onAddProject = async () => {
  const entryId = Number(route.params.id)
  try {
    const response = await createProject(entryId, selectedLocales)
    projects?.push(response)
  } catch (error) {
    console.error(error)
  }
}

const onCancel = () => {
  showModal = false
  selectedLocales = []
}

const entryFields = $computed<string[]>(() => (entry && entry[0] ? Object.keys(entry[0]) : []))
const projectsFields = $computed<string[]>(() => {
  const set = new Set<string>()
  projects?.forEach((project) => {
    Object.keys(project).forEach((key) => set.add(key))
  })
  return Array.from(set)
})

loadPage()
</script>

<template>
  <div class="entry container mx-auto px-5">
    <div>
      <h2 class="text-xl uppercase font-bold text-right border-b mb-3">Entry</h2>
      <BaseTable :fields="entryFields" :data="entry">
        <template #action>
          <button @click="showModal = true">add project</button>
        </template>
      </BaseTable>
    </div>

    <div class="my-5">
      <h2 class="text-xl uppercase font-bold text-right border-b mb-3">Projects</h2>
      <BaseTable :fields="projectsFields" :data="projects">
        <template #locales="{ item }">
          <ul>
            <li v-for="(lineItem, idx) in item" :key="idx">
              <strong>Name:</strong> {{ lineItem.name }}, <strong>Status:</strong>
              {{ lineItem.status }}
            </li>
          </ul>
        </template>
      </BaseTable>
    </div>
    <BaseModal :show="showModal">
      <div class="flex flex-col w-1/4 text-black bg-white p-3">
        <div v-if="locales" class="flex flex-wrap justify-evenly gap-2 mb-10">
          <label v-for="[key, value] in Object.entries(locales)" :key="key" class="capitalize">
            <input type="checkbox" :value="value.code" v-model="selectedLocales" />
            {{ key }}
          </label>
        </div>
        <div class="flex gap-3 justify-center">
          <button @click="onAddProject">add project</button>
          <button @click="onCancel">cancel</button>
        </div>
      </div>
    </BaseModal>
  </div>
</template>
