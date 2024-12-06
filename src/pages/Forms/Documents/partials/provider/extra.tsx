import { TBlock } from "../../../../../utils/@types/components/Form"

export const extraProvider = (
  form: any,
  formSubmitFields: TBlock["groups"][number]
): TBlock[] => {
  const content: TBlock[] = [
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