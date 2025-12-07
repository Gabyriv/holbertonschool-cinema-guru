import { useState } from "react"
import axios from "axios"
import PropTypes from "prop-types"
import Button from "../../components/general/Button"
import Login from "./Login"
import Register from "./Register"
import "./auth.css"

function Authentication({ setIsLoggedIn, setUserUsername }) {
    // State for switching between Sign In and Sign Up
    const [_switch, setSwitch] = useState(true)
    // State for form inputs
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    // Handle form submission for login or register
    const handleSubmit = (event) => {
        // Prevent default form submission behavior
        event.preventDefault()

        // Determine the endpoint based on _switch state
        const endpoint = _switch ? "http://localhost:8000/api/auth/login" : "http://localhost:8000/api/auth/register"

        // Send POST request with username and password
        axios.post(endpoint, { username, password })
            .then((response) => {
                // On success, store the JWT token in localStorage
                localStorage.setItem("accessToken", response.data.accessToken)
                // Set the userUsername state to username
                setUserUsername(username)
                // Set the isLoggedIn state to true
                setIsLoggedIn(true)
            })
            .catch((error) => {
                console.error("Authentication error:", error)
            })
    }

    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleSubmit}>
                {/* Header buttons to switch between Sign In and Sign Up */}
                <div className="auth-header">
                    <Button 
                        label="Sign In" 
                        onClick={() => setSwitch(true)}
                        className={_switch ? "active" : ""}
                    />
                    <Button 
                        label="Sign Up" 
                        onClick={() => setSwitch(false)}
                        className={!_switch ? "active" : ""}
                    />
                </div>

                {/* Form content area */}
                <div className="auth-content">
                    {/* Title changes based on current view */}
                    <p className="auth-title">
                        {_switch ? "Sign in with your account" : "Create a new account"}
                    </p>

                    {/* Render Login or Register based on _switch state */}
                    {_switch ? (
                        <Login 
                            username={username}
                            password={password}
                            setUsername={setUsername}
                            setPassword={setPassword}
                        />
                    ) : (
                        <Register 
                            username={username}
                            password={password}
                            setUsername={setUsername}
                            setPassword={setPassword}
                        />
                    )}
                </div>
            </form>
        </div>
    )
}

Authentication.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
    setUserUsername: PropTypes.func.isRequired,
}

export default Authentication