import { getColsIndex, getRowsData } from './spreadsheet'
import { sendMessage } from './line'
import type { RowsType } from './type'

const sendFromSheet = (sheetName: string) => {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = activeSpreadsheet.getSheetByName(sheetName)
  if (!sheet) {
    throw new Error('Sheet not found')
  }

  const colsIndex = getColsIndex(sheet)
  const rowsData: RowsType[] = getRowsData(sheet, colsIndex)

  const createRandomIndex = (flag: string, limit: number): number => {
    const filteredRows = rowsData.filter((row) => {
      if (flag === 'max') {
        if (typeof row.count === 'number') return row.count <= limit
      } else if (flag === 'min') {
        if (typeof row.count === 'number') return row.count > limit
      }
      return false
    })
    const randomIndex = Math.floor(Math.random() * filteredRows.length)
    return rowsData.indexOf(filteredRows[randomIndex])
  }
  const { english: english1, japanese: japanese1 } =
    rowsData[createRandomIndex('max', 25)]
  const { english: english2, japanese: japanese2 } =
    rowsData[createRandomIndex('min', 25)]

  sendMessage(`■ ${english1}\n□ ${japanese1}`)
  sendMessage(`■ ${english2}\n□ ${japanese2}`)
}

export const Main = () => {
  sendFromSheet('Main')
}
