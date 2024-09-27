import "./styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      green: {
        dark: string
        medium: string
        light: string
        soft: string
      }
      red: {
        main: string
      }
      yellow: {
        dark: string
        main: string
        light: string
      }
      orange: {
        main: string
      }
      neutral: {
        dark: string
        main: string
        lightMain: string
        medium: string
        soft: string
        white: string
      }
    }
    animations: {
      types: {
        fade: string
        fadeTop: string
        fadeRight: string
        fadeBottom: string
        fadeLeft: string
      }
      durations: {
        main: string
        slow: string
        fast: string
      }
      delays: {
        main: (x?: number) => string
        slow: (x?: number) => string
        slower: (x?: number) => string
      }
    }
    bp: {
      small: number
    }
  }
}
