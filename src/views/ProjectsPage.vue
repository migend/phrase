<script setup lang="ts">
import type { IProject } from '@/declarations/projects'
import { getProjects } from '@/services/api/projects'

let projects = $ref<IProject[] | undefined>(undefined)

const loadProjects = async () => {
  try {
    projects = await getProjects()
  } catch (error) {
    console.error(error)
  }
}

const fields = $computed<string[]>(() => {
  const set = new Set<string>()
  projects?.forEach((project) => {
    Object.keys(project).forEach((key) => set.add(key))
  })
  return Array.from(set)
})

loadProjects()
</script>

<template>
  <div class="projects container mx-auto px-5">
    <BaseTable :fields="fields" :data="projects">
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
</template>
