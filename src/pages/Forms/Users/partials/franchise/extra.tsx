import { Icons } from "../../../../../assets/icons/icons"
import Button from "../../../../../components/Button"
import Input from "../../../../../components/Input"
import { TBlock } from "../../../../../utils/@types/components/Form"
import { TOption } from "../../../../../utils/@types/data/option"
import { TRegion } from "../../../../../utils/@types/data/region"
import { formatCNPJ } from "../../../../../utils/tb/format/cnpj"
import { formatCpf } from "../../../../../utils/tb/format/cpf"
import {
  formatStateInscription,
  formatCityInscription,
} from "../../../../../utils/tb/format/inscription"

export const extraFranchise = (
  form: any,
  regions: TRegion[],
  options: { [key: string]: TOption[] },
  handleField: (field: string, value: any) => void,
  formSubmitFields: TBlock["groups"][number]
): TBlock[] => {
  const content: TBlock[] = [
    {
      title: "Região e cidades",
      groups: [
        {
          type: "custom",
          element: (() => (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
                width: "100%",
                alignItems: "end",
                gap: 16,
              }}
            >
              <Input.Select
                value={form.region}
                label="Selecione a região"
                options={options.franchises}
                field="franchises"
                onChange={handleField}
                gridSizes={{ big: 9, small: 12 }}
              />
              <div style={{ gridColumn: `span 3`, paddingBottom: 2 }}>
                <Button
                  type="main"
                  action={() => {}}
                  text="Editar franquia"
                  icon={<Icons.Edit />}
                  iconLeft={true}
                />
              </div>
            </div>
          ))(),
        },
        {
          type: "custom",
          element: (() => {
            const region = regions.find((i) => i.id === form.region)

            const content = !region
              ? []
              : region.cities.map((city: TRegion["cities"][number]) => {
                  return (
                    <div
                      style={{
                        padding: 6,
                        borderRadius: 18,
                        backgroundColor: "white",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        cursor: "pointer",
                      }}
                    >
                      <span>{city?.name}</span>
                      <Icons.Close width={8} height={8} />
                    </div>
                  ) as JSX.Element
                })

            return (
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {content}
              </div>
            )
          })(),
        },
      ],
    },
    {
      title: "Informações do perfil",
      groups: [
        {
          type: "fields",
          // @ts-ignore
          fields: form.responsable
            ? [
                {
                  type: "radio",
                  field: "responsableType",
                  value: form.responsable.type,
                  gridSizes: { big: 12 },
                  options: [
                    { key: "cnpj", value: "Pessoa Jurídica" },
                    { key: "cpf", value: "Pessoa Física" },
                  ],
                },
                ...(form.responsable.type === "cnpj"
                  ? [
                      {
                        type: "input",
                        field: "responsableName",
                        label: "Pessoa Jurídica responsável",
                        value: form.responsable.name,
                        placeholder: "Informe a razão social",
                        gridSizes: { big: 12 },
                      },
                      [
                        {
                          type: "input",
                          field: "responsableFantasyName",
                          label: "Nome fantasia",
                          value: form.responsable.fantasyName,
                          placeholder: "Informe o nome fantasia",
                          gridSizes: { big: 6, small: 12 },
                        },
                        {
                          type: "input",
                          field: "responsableRegister",
                          label: "CNPJ",
                          value: formatCNPJ(form.responsable.register),
                          placeholder: "00.000.000/0001-00",
                          gridSizes: { big: 6, small: 12 },
                        },
                      ],
                      [
                        {
                          type: "input",
                          field: "responsableInscriptionState",
                          label: "Inscrição estadual",
                          value: formatStateInscription(
                            form.responsable.inscriptionState
                          ),
                          placeholder: "Apenas números",
                          gridSizes: { big: 6, small: 12 },
                        },
                        {
                          type: "input",
                          field: "responsableInscriptionCity",
                          label: "Inscrição municipal",
                          value: formatCityInscription(
                            form.responsable.inscriptionCity
                          ),
                          placeholder: "Apenas números",
                          gridSizes: { big: 6, small: 12 },
                        },
                      ],
                    ]
                  : [
                      [
                        {
                          type: "input",
                          field: "responsableName",
                          label: "Pessoa responsável",
                          value: form.responsable.name,
                          placeholder: "Informe o nome da pessoa",
                          gridSizes: { big: 6, small: 12 },
                        },
                        {
                          type: "input",
                          field: "responsableRegister",
                          label: "CPF",
                          value: formatCpf(form.responsable.register),
                          gridSizes: { big: 6, small: 12 },
                        },
                      ],
                    ]),
              ]
            : [],
        },

        formSubmitFields,
      ],
    },
  ]

  return content
}
