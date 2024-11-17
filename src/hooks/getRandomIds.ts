type DataType = { id: number; [key: string]: string | number | boolean }

const getRandomIds = (data: DataType[], count = 3) => {
  const totalFrequency = data.reduce(
    (total, item) => total + (Number(item.frequency) || 0),
    0,
  )

  const selectedIds: number[] = []

  for (let i = 0; i < count; i++) {
    let randomValue = Math.random() * totalFrequency
    let cumulativeFrequency = 0

    for (const item of data) {
      cumulativeFrequency += Number(item.frequency) || 0
      if (randomValue < cumulativeFrequency) {
        selectedIds.push(item.id)
        break
      }
    }
  }

  return selectedIds
}
export default getRandomIds
