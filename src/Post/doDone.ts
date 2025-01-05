import { sendMessage } from '../utils/lineMessage'

export function doDone(postbackId: number, sheetName: string, label = '') {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)
  if (!sheet) return

  const column = getColumnIndexByName('done', sheet)
  sheet.getRange(postbackId, column).setValue(true)

  sendMessage([
    {
      type: 'text',
      text: `【${label}】をアーカイブしました`,
    },
  ])
}

function getColumnIndexByName(
  name: string,
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
) {
  const headers = sheet.getDataRange().getValues()[0]
  return headers.indexOf(name) + 1
}
