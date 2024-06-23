import { getColsIndex, getRowsData } from './spreadsheet'
type RowsType = {
  original: string
  translation: string
  count: number
  frequency: number
  done: boolean
}

const archiveRow = (sheetName: string, archiveSheetName: string) => {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = activeSpreadsheet.getSheetByName(sheetName)
  if (!sheet) throw new Error('シートが見つかりません')
  const archiveSheet = activeSpreadsheet.getSheetByName(archiveSheetName)
  if (!archiveSheet) throw new Error('Archiveシートが見つかりません')

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
    if (rowsData[i].done) sheet.deleteRow(i + 2)
  }
}

export const archiveRowEnglish = () => archiveRow('English', 'ArchiveEnglish')
