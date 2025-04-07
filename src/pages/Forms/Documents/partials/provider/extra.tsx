import { TBlock } from "../../../../../utils/@types/components/Form"
import { TErrorsCheck } from "../../../../../utils/@types/helpers/checkErrors"

export const extraProvider = (
  form: any,
  formSubmitFields: TBlock["groups"][number],

  errors: TErrorsCheck
): TBlock[] => {
  const content: TBlock[] = [
    {
      title: "Cadastrar documentações",
      groups: [
        // CND Federal
        {
          type: "fields",
          centeredLines: [2],
          fields: [
            [
              {
                type: "input",
                field: "federalCnd",
                label: "CND Federal",
                value: form.federalCnd,
                placeholder: "000000000000",
                gridSizes: { big: 4, small: 12 },
                error: {
                  has: errors.fields.includes("federalCnd"),
                  message: "Digite a CND Federal",
                },
              },
              {
                type: "date",
                field: "federalCndStart",
                label: "Início",
                value: form.federalCndStart,
                gridSizes: { big: 4, small: 12 },
                maxDate: new Date(),
                error: {
                  has: errors.fields.includes("federalCndStart"),
                  message: "Escolha a data",
                },
              },
              {
                type: "date",
                field: "federalCndEnd",
                label: "Final",
                value:
                  form.federalCndStart &&
                  form.federalCndEnd &&
                  new Date(form.federalCndStart).getTime() >
                    new Date(form.federalCndEnd).getTime()
                    ? form.federalCndStart
                    : form.federalCndEnd,
                gridSizes: { big: 4, small: 12 },
                minDate: form.federalCndStart ?? undefined,
                error: {
                  has: errors.fields.includes("federalCndEnd"),
                  message: "Escolha a data",
                },
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
                error: {
                  has: errors.fields.includes("federalCndDocument"),
                  message: "",
                },
              },
            ],
          ],
        },

        // CND Estadual
        {
          type: "fields",
          centeredLines: [2],
          fields: [
            [
              {
                type: "input",
                field: "stateCnd",
                label: "CND Estadual",
                value: form.stateCnd,
                placeholder: "000000000000",
                gridSizes: { big: 4, small: 12 },
                error: {
                  has: errors.fields.includes("stateCnd"),
                  message: "Digite a CND Estadual",
                },
              },
              {
                type: "date",
                field: "stateCndStart",
                label: "Início",
                value: form.stateCndStart,
                gridSizes: { big: 4, small: 12 },
                maxDate: new Date(),
                error: {
                  has: errors.fields.includes("stateCndStart"),
                  message: "Escolha a data",
                },
              },
              {
                type: "date",
                field: "stateCndEnd",
                label: "Final",
                value:
                  form.stateCndStart &&
                  form.stateCndEnd &&
                  new Date(form.stateCndStart).getTime() >
                    new Date(form.stateCndEnd).getTime()
                    ? form.stateCndStart
                    : form.stateCndEnd,
                gridSizes: { big: 4, small: 12 },
                minDate: form.stateCndStart ?? undefined,
                error: {
                  has: errors.fields.includes("stateCndEnd"),
                  message: "Escolha a data",
                },
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
          centeredLines: [2],
          fields: [
            [
              {
                type: "input",
                field: "cityCnd",
                label: "CND Municipal",
                value: form.cityCnd,
                placeholder: "000000000000",
                gridSizes: { big: 4, small: 12 },
                error: {
                  has: errors.fields.includes("cityCnd"),
                  message: "Digite a CND Municipal",
                },
              },
              {
                type: "date",
                field: "cityCndStart",
                label: "Início",
                value: form.cityCndStart,
                gridSizes: { big: 4, small: 12 },
                maxDate: new Date(),
                error: {
                  has: errors.fields.includes("cityCndStart"),
                  message: "Escolha a data",
                },
              },
              {
                type: "date",
                field: "cityCndEnd",
                label: "Final",
                value:
                  form.cityCndStart &&
                  form.cityCndEnd &&
                  new Date(form.cityCndStart).getTime() >
                    new Date(form.cityCndEnd).getTime()
                    ? form.cityCndStart
                    : form.cityCndEnd,
                gridSizes: { big: 4, small: 12 },
                minDate: form.cityCndStart ?? undefined,
                error: {
                  has: errors.fields.includes("cityCndEnd"),
                  message: "Escolha a data",
                },
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
          centeredLines: [2],
          fields: [
            [
              {
                type: "input",
                field: "fgtsCnd",
                label: "FGTS",
                value: form.fgtsCnd,
                placeholder: "000000000000",
                gridSizes: { big: 4, small: 12 },
                error: {
                  has: errors.fields.includes("fgtsCnd"),
                  message: "Digite o FGTS",
                },
              },
              {
                type: "date",
                field: "fgtsCndStart",
                label: "Início",
                value: form.fgtsCndStart,
                gridSizes: { big: 4, small: 12 },
                maxDate: new Date(),
                error: {
                  has: errors.fields.includes("fgtsCndStart"),
                  message: "Escolha a data",
                },
              },
              {
                type: "date",
                field: "fgtsCndEnd",
                label: "Final",
                value:
                  form.fgtsCndStart &&
                  form.fgtsCndEnd &&
                  new Date(form.fgtsCndStart).getTime() >
                    new Date(form.fgtsCndEnd).getTime()
                    ? form.fgtsCndStart
                    : form.fgtsCndEnd,
                gridSizes: { big: 4, small: 12 },
                minDate: form.fgtsCndStart ?? undefined,
                error: {
                  has: errors.fields.includes("fgtsCndEnd"),
                  message: "Escolha a data",
                },
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
