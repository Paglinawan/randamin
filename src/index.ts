import { sendEnglish } from './Languages'
import { Tech } from './Tech'
import { TechMessages } from './TechMessages'
import { Wiki } from './Wiki'
import { archiveEnglish } from './Archive'
import { doPost } from './Post'

declare const global: {
  [x: string]: unknown
}

global.Languages = sendEnglish
global.Tech = Tech
global.TechMessages = TechMessages
global.Wiki = Wiki
global.Archive = archiveEnglish
global.doPost = doPost
