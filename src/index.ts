import { English, Tagalog } from './remind'

declare const global: {
  [x: string]: unknown
}

global.English = English
global.Tagalog = Tagalog
