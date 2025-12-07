import PropTypes from "prop-types"
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons"
import Input from "../../components/general/Input"
import Button from "../../components/general/Button"
import "./auth.css"

function Login({ username, password, setUsername, setPassword }) {
    
    const handleSubmit = (e) => {
        e.preventDefault()
        // Login logic will be implemented later
    }

    return (
        <>
            <div className="auth-inputs">
                <Input 
                    label="Username:"
                    type="text"
                    value={username}
                    setValue={setUsername}
                    icon={faUser}
                />
                <Input 
                    label="Password:"
                    type="password"
                    value={password}
                    setValue={setPassword}
                    icon={faKey}
                />
            </div>
            <div className="auth-submit">
                <Button 
                    label="Sign In"
                    onClick={handleSubmit}
                    icon={faKey}
                />
            </div>
        </>
    )
}

Login.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
}

export default Login

