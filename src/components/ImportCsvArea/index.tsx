import * as S from "./styled"
import { Icons } from "../../assets/icons/icons"
import Button from "../Button"
import csvtojson from "csvtojson"

type Props = {
  onLoadList: (list: any[]) => void
}

const ImportCsvArea = ({ onLoadList }: Props) => {
  const parseList = (list: any[]) => {
    let parsed: any[] = list

    return parsed
  }

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 2. Monitor element

    if (e.target.files) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = async (f: any) => {
        const text = f.target.result
        const data = await csvtojson(
          {
            delimiter: [";", "\t"],
          },
          {
            encoding: "utf-8",
          }
        ).fromString(text)

        const parsed = parseList(data)
        onLoadList(parsed)
      }

      reader.readAsText(file, "utf-8")
    }
  }

  const handlePressButton = () => {
    // 1. Create element
    const inp = document.createElement("input")

    inp.type = "file"
    inp.accept = ".csv"

    inp.onchange = handleFilePick as any

    inp.click()
  }

  return (
    <S.Wrapper>
      <Button
        type="main"
        text="Importar CSV"
        icon={<Icons.Upload />}
        iconLeft={true}
        fit={true}
        action={handlePressButton}
      />
      <S.Message>
        <span>Atenção: </span>
        <span>
          Ao importar um arquivo CSV, todas as suas alterações serão
          substituídas pelos dados do arquivo.
        </span>
      </S.Message>
    </S.Wrapper>
  )
}

export default ImportCsvArea
