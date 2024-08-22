import { DefaultTheme } from "styled-components"

export const theme: DefaultTheme = {
  colors: {
    gold: "#CEB77D",
    purple: "#7D37B4",
    blue: "#45D0EE",
    yellow: "#FFA903",
    green: "#90CC61",
    red: "#D8484A",
    brown: {
      soft: "#EDEEEE",
      light: "#A59486",
      medium: "#786047",
      dark: "#282525",
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
