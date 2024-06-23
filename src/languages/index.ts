import createCard from './layout'
import { getColsIndex, getRowsData } from './spreadsheet'
import { sendMessage } from '../hooks/line'
type RowsType = {
  original: string
  translation: string
  count: number
  frequency: number
  done: boolean
}

const sendLanguages = (sheetName: string) => {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = activeSpreadsheet.getSheetByName(sheetName)
  if (!sheet) throw new Error('シートが見つかりません')

  const colsIndex = getColsIndex(sheet)
  const rowsData: RowsType[] = getRowsData(sheet, colsIndex)

  const createRandomIndices = (
    flag: string,
    limit: number,
    count: number,
  ): number[] => {
    const filteredRows = rowsData.filter((row) => {
      if (flag === 'max') return row.count <= limit
      if (flag === 'min') return row.count > limit
      return false
    })

    const indicesSet = new Set<number>()
    while (indicesSet.size < count && indicesSet.size < filteredRows.length) {
      const randomIndex = Math.floor(Math.random() * filteredRows.length)
      indicesSet.add(rowsData.indexOf(filteredRows[randomIndex]))
    }

    return Array.from(indicesSet)
  }

  const numLoops = 3
  const shortIndices = createRandomIndices('max', 40, numLoops)
  const longIndices = createRandomIndices('min', 40, numLoops)

  const data: { original: string; translation: string }[] = []

  shortIndices.forEach((index) => {
    if (index >= 0) data.push(rowsData[index])
  })

  longIndices.forEach((index) => {
    if (index >= 0) data.push(rowsData[index])
  })

  const cards = createCard(data)
  sendMessage(cards)
}

export const sendEnglish = () => sendLanguages('English')
export const sendTagalog = () => sendLanguages('Tagalog')
