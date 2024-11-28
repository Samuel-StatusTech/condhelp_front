import { Icons } from "../../../../../assets/icons/icons"
import Button from "../../../../../components/Button"
import Input from "../../../../../components/Input"
import { TBlock, TForm } from "../../../../../utils/@types/components/Form"
import { TOption } from "../../../../../utils/@types/data/option"
import { fdata } from "../../../../../utils/_dev/falseData"
import { formatCep } from "../../../../../utils/tb/format/cep"
import { formatPhone } from "../../../../../utils/tb/format/phone"

type Props = {
  form: any
  options: {
    [key: string]: TOption[]
  }
  handleField: TForm["handleField"]
}

export const basicProvider = ({
  form,
  options,
  handleField,
}: Props): TBlock["groups"] => {
  const content: TBlock["groups"] = [
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
            value={""}
            label="Selecione as franquias"
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
        const content = form.franchises.map((f: any) => {
          const franchiseData = fdata.people
            .filter((i) => i.profile === "FRANQUEADO")
            .find((i) => i.id === f)

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
              <span>{franchiseData?.name}</span>
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
    {
      type: "fields",
      title: "Identidade do prestador",
      fields: [
        [
          {
            type: "logo",
            field: "image",
            value: form.image,
            gridSizes: { big: 3, small: 12 },
          },
          {
            type: "input",
            label: "Nome fantasia",
            field: "fantasyName",
            value: form.fantasyName,
            placeholder: "Informe o nome fantasia",
            gridSizes: { big: 9, small: 12 },
          },
        ],
      ],
    },

    // Address
    {
      type: "fields",
      fields: [
        [
          {
            type: "select",
            label: "País",
            placeholder: "País",
            field: "country",
            value: form.address?.country ?? "",
            options: options.country,
            gridSizes: { big: 3, small: 6 },
            elevation: 10,
          },
          {
            type: "select",
            label: "Estado",
            placeholder: "Estado",
            field: "state",
            value: form.address?.state ?? ("" as string),
            options: options.state,
            gridSizes: { big: 3, small: 6 },
          },
          {
            type: "input",
            field: "city",
            label: "Nome da cidade",
            value: form.address?.city ?? "",
            placeholder: "Digite aqui",
            gridSizes: { big: 6, small: 12 },
          },
        ],
        [
          {
            type: "input",
            field: "street",
            label: "Endereço",
            value: form.address?.street ?? "",
            placeholder: "Digite aqui",
            gridSizes: { big: 8, small: 7 },
          },
          {
            type: "input",
            field: "number",
            label: "Número",
            value: form.address?.number.replace(/\D/g, "") ?? "",
            placeholder: "0",
            gridSizes: { big: 4, small: 5 },
          },
        ],
        [
          {
            type: "input",
            field: "complement",
            label: "Complemento",
            value: form.address?.complement ?? "",
            placeholder: "Digite aqui",
            gridSizes: { big: 8, small: 7 },
          },
          {
            type: "input",
            field: "cep",
            label: "CEP",
            value: formatCep(form.address?.cep ?? ""),
            placeholder: "00000-000",
            gridSizes: { big: 4, small: 5 },
          },
        ],
      ],
    },

    // Responsable
    {
      type: "fields",
      fields: [
        [
          {
            type: "input",
            field: "responsable",
            label: "Nome do responsável",
            value: form.responsable,
            placeholder: "Nome do responsável",
            gridSizes: { big: 6, small: 12 },
          },
          {
            type: "input",
            field: "website",
            label: "Website",
            value: form.website,
            placeholder: "Website",
            gridSizes: { big: 6, small: 12 },
          },
        ],
        [
          {
            type: "input",
            field: "phone1",
            label: "Telefone principal com DDD",
            value: formatPhone(form.phone1),
            placeholder: "00 00000-0000",
            gridSizes: { big: 6, small: 12 },
          },
          {
            type: "input",
            field: "email",
            label: "Email",
            value: form.email,
            placeholder: "00 00000-0000",
            gridSizes: { big: 6, small: 12 },
          },
        ],
        [
          {
            type: "input",
            field: "phone2",
            label: "Telefone 2",
            value: formatPhone(form.phone2),
            placeholder: "00 00000-0000",
            gridSizes: { big: 6, small: 12 },
          },
          {
            type: "input",
            field: "phone3",
            label: "Telefone 3",
            value: formatPhone(form.phone3),
            placeholder: "00 00000-0000",
            gridSizes: { big: 6, small: 12 },
          },
        ],
      ],
    },
  ]

  return content
}
