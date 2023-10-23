export interface ILocales {
  [key: string]: ILocale
}

interface ILocale {
  code: string
  name: string
}
