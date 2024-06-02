import { getColsIndex, getRowsData } from './spreadsheet'
import { sendMessage } from './line'
import type { RowsType } from './type'

const sendFromSheet = (sheetName: string) => {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = activeSpreadsheet.getSheetByName(sheetName)
  if (!sheet) throw new Error('Sheet not found')

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
  const RandomShort = createRandomIndex('max', 25)
  const RandomLong = createRandomIndex('min', 25)
  if (RandomShort > 0) {
    const { foreign: foreign1, japanese: japanese1 } = rowsData[RandomShort]
    sendMessage(`■ ${foreign1}\n□ ${japanese1}`)
  }
  if (RandomLong > 0) {
    const { foreign: foreign2, japanese: japanese2 } = rowsData[RandomLong]
    sendMessage(`■ ${foreign2}\n□ ${japanese2}`)
  }
}

export const English = () => {
  sendFromSheet('English')
}
export const Tagalog = () => {
  sendFromSheet('Tagalog')
}
