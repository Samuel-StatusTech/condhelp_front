import ProviderLegalization from "../../../../../components/ProviderLegalization"
import { TBlock } from "../../../../../utils/@types/components/Form"
import { TPendency } from "../../../../../utils/@types/data/user"

type Props = {
  pendencies: {
    federalCnd: TPendency
    stateCnd: TPendency
    cityCnd: TPendency
    fgts: TPendency
  }
}

export const basicProvider = ({ pendencies }: Props): TBlock[] => {
  const content: TBlock[] = [
    {
      title: "STATUS DA DOCUMENTAÇÃO (INTEGRAÇÃO API)",
      isWhite: true,
      groups: [
        {
          type: "custom",
          element: (() => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: 320
                }}
              >
                <ProviderLegalization
                  label={"CND Federal"}
                  value={pendencies.federalCnd}
                />
                <ProviderLegalization
                  label={"CND Estadual"}
                  value={pendencies.stateCnd}
                />
                <ProviderLegalization
                  label={"CND Municipal"}
                  value={pendencies.cityCnd}
                />
                <ProviderLegalization label={"FGTS"} value={pendencies.fgts} />
              </div>
            )
          })(),
        },
      ],
    },
  ]

  return content
}
