type DataType = { id: number; [key: string]: string | number | boolean }

const getSheetData = (sheetName: string) => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)
  if (!sheet) throw new Error('シートが見つかりません')
  const allRows = sheet.getDataRange().getValues()
  const header = allRows[0]

  const items: DataType[] = []
  let item: DataType
  for (let i = 1; i < allRows.length; i++) {
    const dataRow = allRows[i]
    item = { id: i }
    header.forEach((headerName, i) => {
      item[headerName] = dataRow[i]
    })
    items.push(item)
  }
  return items
}

export default getSheetData
