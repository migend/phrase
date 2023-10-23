import { httpClient } from '../httpClient'
import type { IProject } from '@/declarations/projects'

export const getProjects = async () => {
  const response = await httpClient.get<{ data: IProject[] }>('/projects')

  return response.data?.data
}

export const getProject = async (id: number) => {
  const response = await httpClient.get<{ data: IProject }>(`/projects/${id}`)

  return response.data?.data
}

export const createProject = async (entryId: number, locales: string[]) => {
  const response = await httpClient.post('/projects', { entryId, locales })

  return response.data?.data
}
