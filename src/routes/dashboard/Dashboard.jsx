import PropTypes from "prop-types"
import Header from "../../components/navigation/Header"
import "./dashboard.css"

/**
 * Dashboard component - Main dashboard view for logged-in users
 * Contains the Header and other dashboard content
 */
function Dashboard({ userUsername, setIsLoggedIn }) {
    return (
        <div className="dashboard">
            {/* Header with user info and logout functionality */}
            <Header 
                userUsername={userUsername} 
                setIsLoggedIn={setIsLoggedIn} 
            />
            
            {/* Dashboard content will be added here */}
        </div>
    )
}

Dashboard.propTypes = {
    userUsername: PropTypes.string.isRequired,
    setIsLoggedIn: PropTypes.func.isRequired,
}

export default Dashboard
