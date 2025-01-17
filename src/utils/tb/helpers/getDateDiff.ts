export const getDateDiff = (
  date: Date | string | number,
  compareDate: Date | string | number
) => {
  const d = new Date(date)

  const todayTime = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate()
  ).getTime()
  const compareTime = new Date(compareDate).getTime()

  const diff = Math.floor((compareTime - todayTime) / 1000 / 60 / 60 / 24)

  return diff
}
