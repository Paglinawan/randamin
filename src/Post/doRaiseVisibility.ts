import { sendMessage } from '../utils/lineMessage'

export function doRaiseVisibility(
  postbackId: number,
  sheetName: string,
  label = '',
) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)
  if (!sheet) return

  const column = getColumnIndexByName('rate', sheet)
  const currentValue = sheet.getRange(postbackId, column).getValue()
  sheet.getRange(postbackId, column).setValue(currentValue + 1)

  sendMessage([
    {
      type: 'text',
      text: `今後、【${label}】の表示回数を増やします`,
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
