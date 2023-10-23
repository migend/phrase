import { httpClient } from '@/services/httpClient'
import type { IEntry } from '@/declarations/entries'

export const getEntries = async (): Promise<IEntry[]> => {
  const response = await httpClient.get<{ data: IEntry[] }>('/entries')

  return response.data?.data
}

export const getEntry = async (id: string) => {
  const response = await httpClient.get<{ data: IEntry }>(`/entries/${id}`)

  return response.data?.data
}
