import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
    faHouse, 
    faStar, 
    faClock,
    faBolt
} from "@fortawesome/free-solid-svg-icons"
import Activity from "../Activity"
import "./navigation.css"

/**
 * SideBar component - Navigation sidebar with page links and recent activities
 * Allows users to navigate between Home, Favorites, and Watch Later pages
 */
function SideBar() {
    // State for tracking selected page
    const [selected, setSelected] = useState("home")
    // State for sidebar collapsed/expanded mode
    const [small, setSmall] = useState(true)
    // State for storing user activities
    const [activities, setActivities] = useState([])
    // State for showing/hiding activities section
    const [showActivities, setShowActivities] = useState(false)

    // Hook for programmatic navigation
    const navigate = useNavigate()

    /**
     * setPage - Handles navigation to different pages
     * @param {string} pageName - The name of the page to navigate to
     */
    const setPage = (pageName) => {
        // Update selected state
        setSelected(pageName)

        // Navigate to the corresponding route
        switch (pageName) {
            case "Home":
                navigate("/home")
                break
            case "Favorites":
                navigate("/favorites")
                break
            case "Watch Later":
                navigate("/watchlater")
                break
            default:
                navigate("/home")
        }
    }

    // Fetch activities on component mount
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                // Get the access token from localStorage
                const token = localStorage.getItem("accessToken")
                
                // Send GET request to fetch activities
                const response = await axios.get("http://localhost:8000/api/activity", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                
                // Set activities state with response data
                setActivities(response.data)
            } catch (error) {
                console.error("Error fetching activities:", error)
            }
        }

        fetchActivities()
    }, [])

    return (
        <nav 
            className={`sidebar ${small ? "small" : ""}`}
            onMouseEnter={() => setSmall(false)}
            onMouseLeave={() => setSmall(true)}
        >
            {/* Navigation links */}
            <ul className="sidebar-nav">
                <li 
                    className={selected === "Home" ? "active" : ""}
                    onClick={() => setPage("Home")}
                >
                    <FontAwesomeIcon icon={faHouse} />
                    {!small && <span>Home</span>}
                </li>
                <li 
                    className={selected === "Favorites" ? "active" : ""}
                    onClick={() => setPage("Favorites")}
                >
                    <FontAwesomeIcon icon={faStar} />
                    {!small && <span>Favorites</span>}
                </li>
                <li 
                    className={selected === "Watch Later" ? "active" : ""}
                    onClick={() => setPage("Watch Later")}
                >
                    <FontAwesomeIcon icon={faClock} />
                    {!small && <span>Watch Later</span>}
                </li>
            </ul>

            {/* Activities section */}
            {!small && (
                <div className="sidebar-activities">
                    <div 
                        className="activities-header"
                        onClick={() => setShowActivities(!showActivities)}
                    >
                        <FontAwesomeIcon icon={faBolt} />
                        <span>Latest Activities</span>
                    </div>
                    
                    {showActivities && (
                        <ul className="activities-list">
                            {/* Map first 10 activities to Activity component */}
                            {activities.slice(0, 10).map((activity, index) => (
                                <Activity key={index} activity={activity} />
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </nav>
    )
}

export default SideBar
