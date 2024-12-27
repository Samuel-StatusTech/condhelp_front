import { TBlock } from "../../../../../utils/@types/components/Form"
import { TCategory } from "../../../../../utils/@types/data/category"
import { TOption } from "../../../../../utils/@types/data/option"
import { formatCNPJ } from "../../../../../utils/tb/format/cnpj"

export const extraProvider = (
  form: any,
  formSubmitFields: TBlock["groups"][number],
  options: { [key: string]: TOption[] },
  categories: TCategory[]
): TBlock[] => {
  const content: TBlock[] = [
    {
      title: "Informações Comerciais",
      groups: [
        {
          type: "fields",
          fields: [
            {
              type: "input",
              field: "socialRole",
              label: "Razão social",
              value: form.socialRole,
              placeholder: "Informe a razão social",
              gridSizes: { big: 12 },
            },
            [
              {
                type: "input",
                field: "documentRegister",
                label: "CNPJ",
                value: formatCNPJ(form.document.register),
                placeholder: "00.000.000/0001-00",
                gridSizes: { big: 6, small: 12 },
              },
              {
                type: "date",
                field: "documentDate",
                label: "Data de abertura da empresa",
                value: form.document.date,
                gridSizes: { big: 6, small: 12 },
                maxDate: new Date(),
              },
            ],
            {
              type: "file",
              field: "cnpjCard",
              label: "Cartão CNPJ",
              value: form.cnpjCard,
              gridSizes: { big: 12, small: 12 },
              allowsPdf: true,
            },
          ],
        },
        {
          type: "fields",
          fields: [
            {
              type: "multipleSelect",
              label: "Categorias de serviço prestado",
              placeholder: "Selecione as categorias",
              field: "categories",
              value: form.categories,
              selecteds: categories
                .filter((c) => form.categories.includes(c.id))
                .map((c) => c.name),
              options: options.category,
              gridSizes: { big: 12 },
            },
          ],
        },
      ],
    },
    {
      title: "Cadastrar documentações",
      groups: [
        // CND Federal
        {
          type: "fields",
          fields: [
            [
              {
                type: "input",
                field: "federalCnd",
                label: "CND Federal",
                value: form.federalCnd,
                placeholder: "000000000000",
                gridSizes: { big: 4, small: 12 },
              },
              {
                type: "date",
                field: "federalCndStart",
                label: "Início",
                value: form.federalCndStart,
                gridSizes: { big: 4, small: 12 },
              },
              {
                type: "date",
                field: "federalCndEnd",
                label: "Final",
                value: form.federalCndEnd,
                gridSizes: { big: 4, small: 12 },
              },
            ],
            [
              {
                type: "toggler",
                field: "federalCndFree",
                label: "Isento",
                value: form.federalCndFree,
                gridSizes: { big: 4, small: 12 },
              },
              {
                type: "file",
                field: "federalCndDocument",
                value: form.federalCndDocument,
                gridSizes: { big: 8, small: 12 },
                allowsPdf: true,
              },
            ],
          ],
        },

        // CND Estadual
        {
          type: "fields",
          fields: [
            [
              {
                type: "input",
                field: "stateCnd",
                label: "CND Estadual",
                value: form.stateCnd,
                placeholder: "000000000000",
                gridSizes: { big: 4, small: 12 },
              },
              {
                type: "date",
                field: "stateCndStart",
                label: "Início",
                value: form.stateCndStart,
                gridSizes: { big: 4, small: 12 },
              },
              {
                type: "date",
                field: "stateCndEnd",
                label: "Final",
                value: form.stateCndEnd,
                gridSizes: { big: 4, small: 12 },
              },
            ],
            [
              {
                type: "toggler",
                field: "stateCndFree",
                label: "Isento",
                value: form.stateCndFree,
                gridSizes: { big: 4, small: 12 },
              },
              {
                type: "file",
                field: "stateCndDocument",
                value: form.stateCndDocument,
                gridSizes: { big: 8, small: 12 },
                allowsPdf: true,
              },
            ],
          ],
        },

        // CND Municipal
        {
          type: "fields",
          fields: [
            [
              {
                type: "input",
                field: "cityCnd",
                label: "CND Municipal",
                value: form.cityCnd,
                placeholder: "000000000000",
                gridSizes: { big: 4, small: 12 },
              },
              {
                type: "date",
                field: "cityCndStart",
                label: "Início",
                value: form.cityCndStart,
                gridSizes: { big: 4, small: 12 },
              },
              {
                type: "date",
                field: "cityCndEnd",
                label: "Final",
                value: form.cityCndEnd,
                gridSizes: { big: 4, small: 12 },
              },
            ],
            [
              {
                type: "toggler",
                field: "cityCndFree",
                label: "Isento",
                value: form.cityCndFree,
                gridSizes: { big: 4, small: 12 },
              },
              {
                type: "file",
                field: "cityCndDocument",
                value: form.cityCndDocument,
                gridSizes: { big: 8, small: 12 },
                allowsPdf: true,
              },
            ],
          ],
        },

        // FGTS
        {
          type: "fields",
          fields: [
            [
              {
                type: "input",
                field: "fgtsCnd",
                label: "FGTS",
                value: form.fgtsCnd,
                placeholder: "000000000000",
                gridSizes: { big: 4, small: 12 },
              },
              {
                type: "date",
                field: "fgtsCndStart",
                label: "Início",
                value: form.fgtsCndStart,
                gridSizes: { big: 4, small: 12 },
              },
              {
                type: "date",
                field: "fgtsCndEnd",
                label: "Final",
                value: form.fgtsCndEnd,
                gridSizes: { big: 4, small: 12 },
              },
            ],
            [
              {
                type: "toggler",
                field: "fgtsCndFree",
                label: "Isento",
                value: form.fgtsCndFree,
                gridSizes: { big: 4, small: 12 },
              },
              {
                type: "file",
                field: "fgtsCndDocument",
                value: form.fgtsCndDocument,
                gridSizes: { big: 8, small: 12 },
                allowsPdf: true,
              },
            ],
          ],
        },

        formSubmitFields,
      ],
    },
  ]

  return content
}
