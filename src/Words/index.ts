import getSheetData from '../utils/spreadsheet'
import getRandomIds from '../utils/getRandomIds'
import { sendMessage } from '../utils/line'
import createCard from './layout'

const getWords = (sheetName: string) => {
  const sheetData = getSheetData(sheetName)
  const randomIds = getRandomIds(sheetData, 6)
  const targetData = sheetData.filter((item) => randomIds.includes(item.id))
  const cards = createCard(targetData)
  sendMessage(cards)
}

export const Words = () => getWords('2-Words')
