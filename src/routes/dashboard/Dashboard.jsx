import PropTypes from "prop-types"
import { Routes, Route, Navigate } from "react-router-dom"
import Header from "../../components/navigation/Header"
import SideBar from "../../components/navigation/Sidebar"
import HomePage from "./HomePage"
import Favorites from "./Favorites"
import WatchLater from "./WatchLater"
import "./dashboard.css"

/**
 * Dashboard component - Main dashboard view for logged-in users
 * Uses CSS Grid layout: Header on top, Sidebar + Content below
 * Contains routing for Home, Favorites, and Watch Later pages
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
                
                {/* Main content area - routes render here */}
                <main className="dashboard-main">
                    <Routes>
                        {/* Home page route */}
                        <Route path="/home" element={<HomePage />} />
                        
                        {/* Favorites page route */}
                        <Route path="/favorites" element={<Favorites />} />
                        
                        {/* Watch Later page route */}
                        <Route path="/watchlater" element={<WatchLater />} />
                        
                        {/* Redirect all other paths to /home */}
                        <Route path="*" element={<Navigate to="/home" replace />} />
                    </Routes>
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
