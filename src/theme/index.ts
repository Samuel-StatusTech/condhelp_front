import { DefaultTheme } from "styled-components"

export const theme: DefaultTheme = {
  colors: {
    green: {
      dark: "#1C321E",
      medium: "#2F5024",
      light: "#4E7C3C",
      soft: "#90CC61",
    },
    blue: {
      cyan: "#1E788C",
      purple: "#7D37B4",
    },
    red: {
      main: "#D8484A",
      dark: "#B13335",
    },
    yellow: {
      dark: "#EDC32E",
      main: "#F3D332",
      light: "rgba(243, 211, 50, 0.5)",
    },
    orange: {
      main: "#FFA903",
    },
    neutral: {
      dark: "#434546",
      main: "#61676A",
      lightMain: "#96999E",
      medium: "#E0E4EB",
      soft: "#F4F5F7",
      white: "#FFFFFF",
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
  shadows: {
    default: "0 3px 32px -4px rgba(0, 0, 0, 0.08)",
  },
  default: {
    formLineGridColumns: 20,
  },
}
