type DataType = { id: number; [key: string]: string | number | boolean }

const getRandomIds = (data: DataType[], count = 3) => {
  const totalRate = data.reduce(
    (total, item) => total + (Number(item.rate) || 0),
    0,
  )

  const selectedIds: number[] = []

  for (let i = 0; i < count; i++) {
    let randomValue = Math.random() * totalRate
    let cumulativeRate = 0

    for (const item of data) {
      cumulativeRate += Number(item.rate) || 0
      if (randomValue < cumulativeRate) {
        selectedIds.push(item.id)
        break
      }
    }
  }

  return selectedIds
}
export default getRandomIds
