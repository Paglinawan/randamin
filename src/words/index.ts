import createCard from './layout'
import { getColsIndex, getRowsData } from './spreadsheet'
import { sendMessage } from '../hooks/line'
type RowsType = {
  label: string
  concept: string
  example: string
  url: string
  frequency: number
  done: boolean
}

const sendFromSheet = (sheetName: string) => {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = activeSpreadsheet.getSheetByName(sheetName)
  if (!sheet) {
    throw new Error('Sheet not found')
  }

  const colsIndex = getColsIndex(sheet)
  const rowsData: RowsType[] = getRowsData(sheet, colsIndex)

  let data: { label: string; concept: string; example: string; url: string }[] =
    []
  const loopTime = 3
  for (let i = 0; i < loopTime; i++) {
    const randomIndex = Math.floor(Math.random() * rowsData.length)
    data.push(rowsData[randomIndex])
  }
  const cards = createCard(data)
  sendMessage(cards)
}

export const Words = () => sendFromSheet('Words')
