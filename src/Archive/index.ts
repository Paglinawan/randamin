import getSheetData from '../utils/spreadsheet'

const archiveRow = (originalSheetName: string, archiveSheetName: string) => {
  const originalSheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(originalSheetName)
  const archiveSheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(archiveSheetName)
  if (!originalSheet || !archiveSheet) return

  const sheetData = getSheetData(originalSheetName)
  const deleteRows = sheetData
    .filter((item) => item.done === true)
    .map((item) => item.id + 1)
  if (deleteRows.length < 1) return

  deleteRows.forEach((row) => {
    const data = originalSheet
      .getRange(row, 1, 1, originalSheet.getLastColumn())
      .getValues()[0]
    archiveSheet.appendRow(data)
  })
  deleteRows
    .sort((a, b) => b - a)
    .forEach((rowIndex) => {
      originalSheet.deleteRow(rowIndex)
    })
}

export const doArchive = () => {
  archiveRow('1-English', '1-ArchiveEnglish')
  archiveRow('2-Words', '2-ArchiveWords')
  archiveRow('3-Messages', '3-ArchiveMessages')
  archiveRow('4-Articles', '4-ArchiveArticles')
  archiveRow('5-Books', '5-ArchiveBooks')
}
