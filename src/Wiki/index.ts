import getSheetData from '../hooks/spreadsheet'
import getRandomIds from '../hooks/getRandomIds'
import { sendMessage } from '../hooks/line'
import createCard from './layout'

const getWiki = (sheetName: string) => {
  const sheetData = getSheetData(sheetName)
  const randomIds = getRandomIds(sheetData, 3)
  const targetData = sheetData.filter((item) => randomIds.includes(item.id))
  const cards = createCard(targetData)
  sendMessage(cards)
}

export const Wiki = () => getWiki('4-Wiki')
