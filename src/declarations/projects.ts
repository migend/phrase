export interface IProject {
  id: number
  created: Date
  updated: Date
  entryId: number
  status: string
  locales: ILocale[]
}

interface ILocale {
  code: string
  name: string
  status: string
}
