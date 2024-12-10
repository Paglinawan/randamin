import getSheetData from '../utils/spreadsheet'
import getRandomIds from '../utils/getRandomIds'
import { sendMessage } from '../utils/line'
import createCard from './layout'

const getSendLanguages = (sheetName: string) => {
  const sheetData = getSheetData(sheetName)
  const randomIds = getRandomIds(sheetData, 3)
  const targetData = sheetData.filter((item) => randomIds.includes(item.id))
  const cards = createCard(targetData)
  sendMessage(cards)
}

export const sendEnglish = () => getSendLanguages('1-English')
export const sendTagalog = () => getSendLanguages('1-Tagalog')
