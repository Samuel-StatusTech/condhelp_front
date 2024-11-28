import { TBlock } from "../../../../../utils/@types/components/Form"

type Props = {
  form: any
}

export const basicManager = ({ form }: Props): TBlock["groups"] => {
  const content: TBlock["groups"] = [
    {
      type: "fields",
      fields: [
        [
          {
            type: "input",
            field: "name",
            label: "Nome",
            value: form.name,
            placeholder: "Digite aqui",
            gridSizes: { big: 6, small: 12 },
          },
          {
            type: "input",
            field: "surname",
            label: "Sobrenome",
            value: form.surname,
            placeholder: "Digite aqui",
            gridSizes: { big: 6, small: 12 },
          },
        ],
      ],
    },
    {
      type: "fields",
      fields: [
        {
          type: "input",
          field: "email",
          label: "Email",
          value: form.email,
          placeholder: "Digite aqui",
          gridSizes: { big: 12 },
        },
      ],
    },
    {
      type: "fields",
      fields: [
        {
          type: "profile",
          label: "Imagem de perfil",
          field: "image",
          value: form.image,
          gridSizes: { big: 12 },
        },
      ],
    },
  ]

  return content
}
