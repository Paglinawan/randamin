import { getColsIndex, getRowsData } from './spreadsheet'
type RowsType = {
  original: string
  translation: string
  count: number
  frequency: number
  done: boolean
}

const DeleteRow = (sheetName: string) => {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = activeSpreadsheet.getSheetByName(sheetName)
  if (!sheet) throw new Error('Sheet not found')
  const archiveSheet = activeSpreadsheet.getSheetByName('Archive')
  if (!archiveSheet) throw new Error('Archive sheet not found')
  const colsIndex = getColsIndex(sheet)
  const rowsData: RowsType[] = getRowsData(sheet, colsIndex)

  const rowsToArchive = rowsData.filter((row) => row.done)
  if (rowsToArchive.length === 0) return

  const archiveLastRow = archiveSheet.getLastRow()
  rowsToArchive.forEach((row, index) => {
    Object.keys(colsIndex).forEach((key) => {
      const col = colsIndex[key as keyof RowsType] + 1
      archiveSheet
        .getRange(archiveLastRow + 1 + index, col)
        .setValue(row[key as keyof RowsType])
    })
  })

  for (let i = rowsData.length - 1; i >= 0; i--) {
    if (rowsData[i].done) {
      sheet.deleteRow(i + 2)
    }
  }
}

export const DeleteRowEnglish = () => {
  DeleteRow('English')
}
