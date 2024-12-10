type DataType = { id: number; [key: string]: string | number | boolean }

const getSheetData = (sheetName: string) => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)
  if (!sheet) throw new Error('シートが見つかりません')
  const range = sheet.getDataRange()
  const values = range.getValues()

  const headers = values[0]
  const data: DataType[] = []

  for (let i = 0; i < values.length; i++) {
    const row = values[i]
    const obj: DataType = {
      id: i + 1,
    }

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = row[j]
    }

    data.push(obj)
  }

  return data
}

export default getSheetData
