import { useState, useEffect } from "react"
import axios from "axios"
import MovieCard from "../../components/movies/MovieCard"
import "./dashboard.css"

/**
 * WatchLater component - Shows user's watch later list
 * Fetches and displays all movies the user has added to watch later
 */
function WatchLater() {
    // State for storing watch later movies
    const [movies, setMovies] = useState([])

    // Fetch watch later movies on component mount
    useEffect(() => {
        // Flag to prevent state updates after unmount
        let isMounted = true

        const fetchWatchLater = async () => {
            try {
                const token = localStorage.getItem("accessToken")
                
                // Send GET request to fetch watch later list
                const response = await axios.get(
                    "http://localhost:8000/api/titles/watchlater/",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                
                // Only update state if component is still mounted
                if (isMounted) {
                    setMovies(response.data)
                }
            } catch (error) {
                console.error("Error fetching watch later:", error)
            }
        }

        fetchWatchLater()

        // Cleanup function
        return () => {
            isMounted = false
        }
    }, [])

    return (
        <div className="watchlater-page">
            {/* Page title with underline */}
            <div className="page-title-container">
                <h1 className="page-title">Movies to watch later</h1>
                <div className="page-title-underline"></div>
            </div>
            
            {/* Movies grid */}
            <ul className="movies-list">
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbId} movie={movie} />
                ))}
            </ul>
        </div>
    )
}

export default WatchLater
