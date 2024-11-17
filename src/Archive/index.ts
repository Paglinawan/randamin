import getSheetData from '../hooks/spreadsheet'

const archiveRow = (originalSheetName: string, archiveSheetName: string) => {
  const sheetData = getSheetData(originalSheetName)
  const doneIds = sheetData
    .filter((item) => item.done === true)
    .map((item) => item.id)

  const originalSheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(originalSheetName)
  const archiveSheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(archiveSheetName)

  doneIds.forEach((id) => {
    if (originalSheet && archiveSheet) {
      const data = originalSheet
        .getRange(id, 1, 1, originalSheet.getLastColumn())
        .getValues()
      archiveSheet.appendRow(data[0])
      originalSheet.deleteRow(id)
    }
  })
}

export const archiveEnglish = () => archiveRow('1-English', '5-ArchiveEnglish')
