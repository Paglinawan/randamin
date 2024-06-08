import { DeleteRowEnglish } from './archive'
import { English, Tagalog } from './remind'

declare const global: {
  [x: string]: unknown
}

global.DeleteRowEnglish = DeleteRowEnglish
global.English = English
global.Tagalog = Tagalog
