import { DefaultTheme } from "styled-components"

export const theme: DefaultTheme = {
  colors: {
    green: {
      dark: "#1C321E",
      medium: "#2F5024",
      light: "#4E7C3C",
      soft: "#90CC61",
    },
    red: {
      main: "#D8484A",
    },
    yellow: {
      dark: "#EDC32E",
      main: "#F3D332",
      light: "rgba(243, 211, 50, 0.5)",
    },
    neutral: {
      white: "#FFFFFF",
      soft: "#F4F5F7",
      medium: "#E0E4EB",
      main: "#61676A",
      dark: "#434546",
    },
  },
  animations: {
    types: {
      fade: "animation: fade; animation-fill-mode: forwards;",
      fadeTop: "animation: fadeTop; animation-fill-mode: forwards;",
      fadeRight: "animation: fadeRight; animation-fill-mode: forwards;",
      fadeBottom: "animation: fadeBottom; animation-fill-mode: forwards;",
      fadeLeft: "animation: fadeLeft; animation-fill-mode: forwards;",
    },
    durations: {
      main: `animation-duration: 0.4s;`,
      slow: `animation-duration: 0.8s;`,
      fast: `animation-duration: 0.2s;`,
    },
    delays: {
      main: (x = 1) => `animation-delay: calc( ${x} * 0.2s);`,
      slow: (x = 1) => `animation-delay: calc( ${x} * 0.4s);`,
      slower: (x = 1) => `animation-delay: calc( ${x} * 0.6s);`,
    },
  },
  bp: {
    small: 520,
  },
}
