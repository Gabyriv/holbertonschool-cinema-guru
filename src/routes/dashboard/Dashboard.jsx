import PropTypes from "prop-types"
import Header from "../../components/navigation/Header"
import SideBar from "../../components/navigation/Sidebar"
import "./dashboard.css"

/**
 * Dashboard component - Main dashboard view for logged-in users
 * Uses CSS Grid layout: Header on top, Sidebar + Content below
 */
function Dashboard({ userUsername, setIsLoggedIn }) {
    return (
        <div className="dashboard">
            {/* Header with user info and logout functionality */}
            <Header 
                userUsername={userUsername} 
                setIsLoggedIn={setIsLoggedIn} 
            />
            
            {/* Main content area with sidebar and page content */}
            <div className="dashboard-content">
                {/* Navigation sidebar */}
                <SideBar />
                
                {/* Main content area - routes will render here */}
                <main className="dashboard-main">
                    {/* Page content will be added here */}
                </main>
            </div>
        </div>
    )
}

Dashboard.propTypes = {
    userUsername: PropTypes.string.isRequired,
    setIsLoggedIn: PropTypes.func.isRequired,
}

export default Dashboard
