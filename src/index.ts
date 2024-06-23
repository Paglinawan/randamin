import { sendEnglish, sendTagalog } from './languages'
import { archiveRowEnglish } from './languages/archive'
import { sendOtherWords } from './terms'

declare const global: {
  [x: string]: unknown
}

global.Languages = () => {
  sendEnglish()
  sendTagalog()
}
global.Archive = archiveRowEnglish
global.sendOtherWords = sendOtherWords
