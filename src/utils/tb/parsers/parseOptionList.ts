import { TOption } from "../../../components/Input/points"

export const parseOptionList = (
  list: any[],
  keyName: string,
  valueName: string
): TOption[] => {
  const newList: TOption[] = list.map((i) => ({
    key: i[keyName],
    value: i[valueName],
  }))

  return newList
}
