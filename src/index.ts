import { sendEnglish } from './English'
import { Words } from './Words'
import { Messages } from './Messages'
import { Resources } from './Resources'
import { Books } from './Books'
import { doArchive } from './Archive'
import { doPost } from './Post'

declare const global: {
  [x: string]: unknown
}

global.English = sendEnglish
global.Words = Words
global.Messages = Messages
global.Resources = Resources
global.Books = Books
global.doArchive = doArchive
global.doPost = doPost
