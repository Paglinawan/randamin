import createCard from './layout'
import { getColsIndex, getRowsData } from './spreadsheet'
import { sendMessage } from '../hooks/line'
type RowsType = {
  original: string
  translation: string
  count: number
  frequency: number
  done: boolean
}

const sendFromSheet = (sheetName: string) => {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = activeSpreadsheet.getSheetByName(sheetName)
  if (!sheet) throw new Error('Sheet not found')

  const colsIndex = getColsIndex(sheet)
  const rowsData: RowsType[] = getRowsData(sheet, colsIndex)

  const createRandomIndex = (flag: string, limit: number): number => {
    const filteredRows = rowsData.filter((row) => {
      if (flag === 'max') return row.count <= limit
      if (flag === 'min') return row.count > limit
      return false
    })

    // 重み付きランダム選択
    const cumulativeFrequency: number[] = []
    filteredRows.forEach((row, index) => {
      const frequency = Number(row.frequency) || 1
      const previousFrequency = cumulativeFrequency[index - 1] || 0
      cumulativeFrequency.push(previousFrequency + frequency)
    })

    const totalFrequency = cumulativeFrequency[cumulativeFrequency.length - 1]
    const randomValue = Math.random() * totalFrequency

    const selectedIndex = cumulativeFrequency.findIndex(
      (cumulativeFreq) => randomValue < cumulativeFreq,
    )

    return rowsData.indexOf(filteredRows[selectedIndex])
  }

  let data: { original: string; translation: string }[] = []
  const loopTime = 3
  for (let i = 0; i < loopTime; i++) {
    const RandomShort = createRandomIndex('max', 40)
    const RandomLong = createRandomIndex('min', 40)
    if (RandomShort > 0) data.push(rowsData[RandomShort])
    if (RandomLong > 0) data.push(rowsData[RandomLong])
  }
  const cards = createCard(data)
  sendMessage(cards)
}

export const English = () => sendFromSheet('English')
export const Tagalog = () => sendFromSheet('Tagalog')
