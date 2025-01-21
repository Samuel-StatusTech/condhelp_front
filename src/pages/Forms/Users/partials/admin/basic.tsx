import { TBlock } from "../../../../../utils/@types/components/Form"
import { FormField } from "../../../../../utils/@types/components/FormFields"

type Props = {
  form: any
  isEditing: boolean
}

export const basicAdmin = ({ form, isEditing }: Props): TBlock["groups"] => {
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
        ...((isEditing
          ? [
              {
                type: "readonly",
                label: "Email",
                field: "email",
                value: form.email,
                gridSizes: { big: 12 },
              },
            ]
          : [
              {
                type: "input",
                field: "email",
                label: "Email",
                value: form.email,
                placeholder: "Digite aqui",
                gridSizes: { big: 12 },
              },
            ]) as FormField[]),
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
