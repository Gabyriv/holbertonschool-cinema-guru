import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import "./navigation.css"

function Header({ userUsername, setIsLoggedIn }) {
    
    // Logout function - removes token and sets logged in state to false
    const logout = () => {
        // Remove the accessToken from localStorage
        localStorage.removeItem("accessToken")
        // Set isLoggedIn state to false
        setIsLoggedIn(false)
    }

    return (
        <nav className="header">
            <div className="header-logo">
                <p className="header-title">Cinema Guru</p>
            </div>

            <div className="header-user">
                <img 
                    src="https://picsum.photos/100/100" 
                    alt="User avatar" 
                    className="header-avatar"
                />
                <p className="header-welcome">
                    Welcome, <span className="header-username">{userUsername}</span>!
                </p>
                <span className="header-logout" onClick={logout}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    Logout
                </span>
            </div>
        </nav>
    )
}

Header.propTypes = {
    userUsername: PropTypes.string.isRequired,
    setIsLoggedIn: PropTypes.func.isRequired,
}

export default Header

