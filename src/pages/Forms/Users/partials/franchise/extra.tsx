import { Icons } from "../../../../../assets/icons/icons"
import Button from "../../../../../components/Button"
import Input from "../../../../../components/Input"
import { TBlock } from "../../../../../utils/@types/components/Form"
import { TOption } from "../../../../../utils/@types/data/option"
import { TCity, TRegion } from "../../../../../utils/@types/data/region"
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
  formSubmitFields: TBlock["groups"][number],
  setIsManagingFranchiseCities: (is: boolean) => void
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
                options={options.region}
                field="region"
                onChange={handleField}
                gridSizes={{ big: 9, small: 12 }}
              />
              <div style={{ gridColumn: `span 3`, paddingBottom: 2 }}>
                <Button
                  type="main"
                  action={() => setIsManagingFranchiseCities(true)}
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
              : form.cities.map((city: number, cityKey: number) => {
                  const cityData = region.cities.find(
                    (c) => c.id === city
                  ) as TCity

                  return (
                    <div
                      key={cityKey}
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
                      <span style={{ whiteSpace: "nowrap" }}>
                        {cityData.name}
                      </span>
                      {/* <Icons.Close width={16} height={16} /> */}
                    </div>
                  ) as JSX.Element
                })

            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  maxWidth: "100%",
                  gap: 12,
                }}
              >
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
          fields: form.responsible
            ? [
                {
                  type: "radio",
                  field: "responsableResponsibleType",
                  value: form.responsible.responsibleType,
                  gridSizes: { big: 12 },
                  options: [
                    { key: "CNPJ", value: "Pessoa Jurídica" },
                    { key: "CPF", value: "Pessoa Física" },
                  ],
                },
                ...(form.responsible.responsibleType === "CNPJ"
                  ? [
                      {
                        type: "input",
                        field: "responsableCompanyName",
                        label: "Pessoa Jurídica responsável",
                        value: form.responsible.companyName,
                        placeholder: "Informe a razão social",
                        gridSizes: { big: 12 },
                      },
                      [
                        {
                          type: "input",
                          field: "responsableFantasyName",
                          label: "Nome fantasia",
                          value: form.responsible.fantasyName,
                          placeholder: "Informe o nome fantasia",
                          gridSizes: { big: 6, small: 12 },
                        },
                        {
                          type: "input",
                          field: "responsableCnpj",
                          label: "CNPJ",
                          value: formatCNPJ(form.responsible.cnpj),
                          placeholder: "00.000.000/0001-00",
                          gridSizes: { big: 6, small: 12 },
                        },
                      ],
                      [
                        {
                          type: "input",
                          field: "responsableStateRegistration",
                          label: "Inscrição estadual",
                          value: formatStateInscription(
                            form.responsible.stateRegistration
                          ),
                          placeholder: "Apenas números",
                          gridSizes: { big: 6, small: 12 },
                        },
                        {
                          type: "input",
                          field: "responsableMunicipalRegistration",
                          label: "Inscrição municipal",
                          value: formatCityInscription(
                            form.responsible.municipalRegistration
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
                          field: "responsablePersonName",
                          label: "Pessoa responsável",
                          value: form.responsible.personName,
                          placeholder: "Informe o nome da pessoa",
                          gridSizes: { big: 6, small: 12 },
                        },
                        {
                          type: "input",
                          field: "responsableCpf",
                          label: "CPF",
                          placeholder: "123.456.789-10",
                          value: formatCpf(form.responsible.cpf),
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
