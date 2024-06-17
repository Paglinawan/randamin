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

  const RandomShort = createRandomIndex('max', 40)
  const RandomLong = createRandomIndex('min', 40)
  if (RandomShort > 0) {
    const { original: original1, translation: translation1 } =
      rowsData[RandomShort]
    sendMessage(`■ ${original1}\n□ ${translation1}`)
  }
  if (RandomLong > 0) {
    const { original: original2, translation: translation2 } =
      rowsData[RandomLong]
    sendMessage(`■ ${original2}\n□ ${translation2}`)
  }
}

export const English = () => {
  sendFromSheet('English')
}
export const Tagalog = () => {
  sendFromSheet('Tagalog')
}
