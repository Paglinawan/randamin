import { sendEnglish } from './English'
import { Words } from './Words'
import { Messages } from './Messages'
import { Articles } from './Articles'
import { Amazon } from './Amazon'
import { doArchive } from './Archive'
import { doPost } from './Post'

declare const global: {
  [x: string]: unknown
}

global.English = sendEnglish
global.Words = Words
global.Messages = Messages
global.Articles = Articles
global.Amazon = Amazon
global.doArchive = doArchive
global.doPost = doPost
