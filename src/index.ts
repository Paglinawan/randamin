import { DeleteRowEnglish } from './languages/archive'
import { English, Tagalog } from './languages'

declare const global: {
  [x: string]: unknown
}

global.DeleteRowEnglish = DeleteRowEnglish
global.English = English
global.Tagalog = Tagalog
