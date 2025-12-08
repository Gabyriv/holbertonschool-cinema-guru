import { useState, useEffect } from "react"
import axios from "axios"
import MovieCard from "../../components/movies/MovieCard"
import "./dashboard.css"

/**
 * Favorites component - Shows user's favorite movies
 * Fetches and displays all movies the user has favorited
 */
function Favorites() {
    // State for storing favorite movies
    const [movies, setMovies] = useState([])

    // Fetch favorite movies on component mount
    useEffect(() => {
        // Flag to prevent state updates after unmount
        let isMounted = true

        const fetchFavorites = async () => {
            try {
                const token = localStorage.getItem("accessToken")
                
                // Send GET request to fetch favorites
                const response = await axios.get(
                    "http://localhost:8000/api/titles/favorite/",
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
                console.error("Error fetching favorites:", error)
            }
        }

        fetchFavorites()

        // Cleanup function
        return () => {
            isMounted = false
        }
    }, [])

    return (
        <div className="favorites-page">
            {/* Page title with underline */}
            <div className="page-title-container">
                <h1 className="page-title">Movies you like</h1>
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

export default Favorites
