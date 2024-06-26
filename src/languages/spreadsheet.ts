import { RowsType } from './types'

export const sheetHeader = [
  'original',
  'translation',
  'count',
  'frequency',
  'done',
] as const
type sheetHeader = (typeof sheetHeader)[number]
type sheetColumns = Record<sheetHeader, number>
const isSheetHeader = (item: string): item is sheetHeader => {
  return sheetHeader.some((type) => type === item)
}

export const getColsIndex = (
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
): sheetColumns => {
  const headerValues: string[] = sheet
    .getRange(1, 1, 1, sheet.getLastColumn())
    .getValues()[0]
  return headerValues.reduce<sheetColumns>((acc, item, index) => {
    if (isSheetHeader(item)) {
      acc[item] = index
    }
    return acc
  }, {} as sheetColumns)
}

export const getRowsData = (
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  colIndex: sheetColumns,
): RowsType[] => {
  const data: RowsType[] = []
  const lastRow = sheet.getLastRow()
  const headers = Object.keys(colIndex) as sheetHeader[]
  for (let row = 2; row <= lastRow; row++) {
    const rowData: Partial<RowsType> = {}
    headers.forEach((header) => {
      const columnIndex = colIndex[header] + 1
      const value = sheet.getRange(row, columnIndex).getValue()
      rowData[header] = value
    })
    data.push(rowData as RowsType)
  }
  return data
}
