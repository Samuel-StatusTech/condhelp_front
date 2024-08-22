import "./styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      gold: string
      purple: string
      blue: string
      yellow: string
      green: string
      red: string
      brown: {
        soft: string
        light: string
        medium: string
        dark: string
      }
      neutral: {
        white: string
        soft: string
        medium: string
        main: string
        dark: string
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
