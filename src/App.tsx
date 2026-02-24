import { useEffect } from "react"
import Router from "./routes"
import { getStore } from "./store"
import Feedback from "./components/Feedback"

const isOnMaintence = false

function App() {
  const { controllers, feedback } = getStore()

  useEffect(() => {
    window.document.documentElement.style.overflow = isOnMaintence ? "hidden" : "auto"
    if (isOnMaintence) {
      controllers.modal.open({
        role: "maintence",
        visible: true
      })
    }
  }, [controllers.modal])

  useEffect(() => {
    if (feedback.visible) {
      setTimeout(() => {
        controllers.feedback.fade()
        setTimeout(() => {
          controllers.feedback.clear()
        }, 500)
      }, 4000)
    }
  }, [feedback, controllers.feedback])

  return (
    <>
      <Feedback data={feedback} />
      <Router />
    </>
  )
}

export default App
