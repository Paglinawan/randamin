import { DeleteRowEnglish } from './languages/archive'
import { English, Tagalog } from './languages'
import { Words } from './words'

declare const global: {
  [x: string]: unknown
}

global.DeleteRowEnglish = DeleteRowEnglish
global.English = English
global.Tagalog = Tagalog
global.Words = Words
