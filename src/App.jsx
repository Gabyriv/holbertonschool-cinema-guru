import { useState, useEffect } from "react"
import Authentication from "./routes/auth/Authentication"
import "./App.css"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userUsername, setUserUsername] = useState("")

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")
    if (!accessToken) return

    fetch("/api/auth/", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Auth failed")
        return res.json()
      })
      .then(data => {
        setIsLoggedIn(true)
        setUserUsername(data.username)
      })
      .catch(() => {
        setIsLoggedIn(false)
        setUserUsername("")
      })
  }, [])


  return (
    <div className="App">
      {isLoggedIn ? (
        // if true, The Dashboard component should be rendered (Will be built in later tasks)
        <></>
      ) : (
        // if false, The Authentication component shoule be rendered (Will be built in later tasks)
        <Authentication setIsLoggedIn={setIsLoggedIn} setUserUsername={setUserUsername} />
      )}
    </div>
  )
}

export default App
