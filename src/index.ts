import { Main } from './remind'

declare const global: {
  [x: string]: unknown
}

global.Main = Main
