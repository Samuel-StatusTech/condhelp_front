import ReactDOM from "react-dom/client"
import "./index.css"

import { ThemeProvider } from "styled-components"
import { theme } from "./theme"

import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import "dayjs/locale/pt-br"
import { GoogleOAuthProvider } from "@react-oauth/google"

import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <GoogleOAuthProvider
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
      >
        <App />
      </GoogleOAuthProvider>
    </LocalizationProvider>
  </ThemeProvider>
)
