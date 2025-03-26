import { TBlock } from "../../../../../utils/@types/components/Form"
import { FormField } from "../../../../../utils/@types/components/FormFields"
import { TErrorsCheck } from "../../../../../utils/@types/helpers/checkErrors"

type Props = {
  form: any
  isEditing: boolean

  errors: TErrorsCheck
}

export const basicManager = ({
  form,
  isEditing,
  errors,
}: Props): TBlock["groups"] => {
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
            error: {
              has: errors.fields.includes("name"),
              message: "Digite um nome",
            },
          },
          {
            type: "input",
            field: "surname",
            label: "Sobrenome",
            value: form.surname,
            placeholder: "Digite aqui",
            gridSizes: { big: 6, small: 12 },
            error: {
              has: errors.fields.includes("surname"),
              message: "Digite um sobrenome",
            },
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
                error: {
                  has: errors.fields.includes("email"),
                  message: "Digite o email",
                },
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
          field: "photo",
          value: form.photo,
          gridSizes: { big: 12 },
        },
      ],
    },
  ]

  return content
}
