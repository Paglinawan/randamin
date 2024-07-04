import createCard from './layout'
import { getColsIndex, getRowsData } from './spreadsheet'
import { sendMessage } from '../hooks/line'
import { RowsType } from './types'

const sendTerms = (sheetName: string) => {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = activeSpreadsheet.getSheetByName(sheetName)
  if (!sheet) throw new Error('シートが見つかりません')

  const colsIndex = getColsIndex(sheet)
  const rowsData: RowsType[] = getRowsData(sheet, colsIndex)

  let data: RowsType[] = []
  const numLoops = 3

  const totalWeight = rowsData.reduce((sum, row) => sum + row.frequency, 0)

  const getRandomIndex = () => {
    let randomValue = Math.random() * totalWeight
    for (let i = 0; i < rowsData.length; i++) {
      randomValue -= rowsData[i].frequency
      if (randomValue <= 0) return i
    }
    return rowsData.length - 1
  }

  const indices: Set<number> = new Set()

  while (indices.size < numLoops) {
    const randomIndex = getRandomIndex()
    indices.add(randomIndex)
  }

  indices.forEach((index) => {
    data.push(rowsData[index])
  })

  const cards = createCard(data)
  sendMessage(cards)
}

export const sendOtherWords = () => sendTerms('OtherWords')
