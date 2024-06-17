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

  const createRandomIndex = (numRows: number) => {
    const randomIndices: number[] = []
    while (randomIndices.length < numRows) {
      const randomIndex = Math.floor(Math.random() * rowsData.length)
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex)
      }
    }
    return randomIndices[numRows - 1]
  }
  const { label, concept, example, url } = rowsData[createRandomIndex(1)]

  let message = `■ ${label}\n${concept}`
  if (example) message += `\n${example}`
  if (url) message += `\n${url}`

  sendMessage(message)
}

export const Words = () => {
  sendFromSheet('Words')
}
