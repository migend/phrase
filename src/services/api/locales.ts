import { httpClient } from '@/services/httpClient'
import type { ILocales } from '@/declarations/locales'

export const getLocales = async (): Promise<ILocales> => {
  const response = await httpClient.get<{ data: ILocales }>('/locales')

  return response.data?.data
}
