import { useState } from "react"
import PropTypes from "prop-types"
import Button from "../../components/general/Button"
import Login from "./Login"
import Register from "./Register"
import "./auth.css"

function Authentication({ setIsLoggedIn, setUserUsername }) {
    // State for switching between Sign In and Sign Up
    const [_switch, setSwitch] = useState(true)
    // State for form inputs (will be used in Login/Register components)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="auth-page">
            <form className="auth-form">
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