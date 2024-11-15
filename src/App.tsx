import { useEffect } from "react"
import Router from "./routes"
import { getStore } from "./store"
import Feedback from "./components/Feedback"

function App() {
  const { controllers, feedback } = getStore()

  useEffect(() => {
    if (feedback.visible) {
      setTimeout(() => {
        controllers.feedback.fade()
        setTimeout(() => {
          controllers.feedback.clear()
        }, 500)
      }, 4000)
    }
    console.log(feedback)
  }, [feedback, controllers.feedback])

  return (
    <>
      <Feedback data={feedback} />
      <Router />
    </>
  )
}

export default App
