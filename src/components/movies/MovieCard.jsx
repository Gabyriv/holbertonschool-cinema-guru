import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faClock } from "@fortawesome/free-solid-svg-icons"
import "./movies.css"

/**
 * MovieCard component - Displays a movie card with favorite/watch later actions
 * Shows movie title, synopsis, genres, and action icons
 */
function MovieCard({ movie }) {
    // State to track if movie is in user's favorites
    const [isFavorite, setIsFavorite] = useState(false)
    // State to track if movie is in user's watch later list
    const [isWatchLater, setIsWatchLater] = useState(false)

    // Fetch user's favorites and watch later lists on mount
    useEffect(() => {
        const fetchUserLists = async () => {
            try {
                const token = localStorage.getItem("accessToken")
                const headers = { Authorization: `Bearer ${token}` }

                // Fetch favorites list
                const favoritesRes = await axios.get(
                    "http://localhost:8000/api/titles/favorite/",
                    { headers }
                )
                
                // Fetch watch later list
                const watchLaterRes = await axios.get(
                    "http://localhost:8000/api/titles/watchlater/",
                    { headers }
                )

                // Check if current movie is in favorites
                const favoriteIds = favoritesRes.data.map((m) => m.imdbId)
                setIsFavorite(favoriteIds.includes(movie.imdbId))

                // Check if current movie is in watch later
                const watchLaterIds = watchLaterRes.data.map((m) => m.imdbId)
                setIsWatchLater(watchLaterIds.includes(movie.imdbId))
            } catch (error) {
                console.error("Error fetching user lists:", error)
            }
        }

        fetchUserLists()
    }, [movie.imdbId])

    /**
     * handleClick - Handles adding/removing movie from favorites or watch later
     * @param {string} type - Either "favorite" or "watchlater"
     */
    const handleClick = async (type) => {
        try {
            const token = localStorage.getItem("accessToken")
            const headers = { Authorization: `Bearer ${token}` }
            const url = `http://localhost:8000/api/titles/${type}/${movie.imdbId}`

            if (type === "favorite") {
                if (isFavorite) {
                    // Remove from favorites
                    await axios.delete(url, { headers })
                    setIsFavorite(false)
                } else {
                    // Add to favorites
                    await axios.post(url, {}, { headers })
                    setIsFavorite(true)
                }
            } else if (type === "watchlater") {
                if (isWatchLater) {
                    // Remove from watch later
                    await axios.delete(url, { headers })
                    setIsWatchLater(false)
                } else {
                    // Add to watch later
                    await axios.post(url, {}, { headers })
                    setIsWatchLater(true)
                }
            }
        } catch (error) {
            console.error(`Error updating ${type}:`, error)
        }
    }

    return (
        <li className="movie-card">
            {/* Movie poster/image */}
            <div 
                className="movie-card-image"
                style={{ backgroundImage: `url(${movie.imageurls?.[0] || ''})` }}
            >
                {/* Action icons */}
                <div className="movie-card-actions">
                    <FontAwesomeIcon 
                        icon={faHeart}
                        className={`movie-icon ${isFavorite ? "active" : ""}`}
                        onClick={() => handleClick("favorite")}
                    />
                    <FontAwesomeIcon 
                        icon={faClock}
                        className={`movie-icon ${isWatchLater ? "active" : ""}`}
                        onClick={() => handleClick("watchlater")}
                    />
                </div>
            </div>

            {/* Movie info */}
            <div className="movie-card-info">
                <h3 className="movie-card-title">{movie.title}</h3>
                <p className="movie-card-synopsis">{movie.synopsis}</p>
                
                {/* Genre tags */}
                <ul className="movie-card-genres">
                    {movie.genres?.map((genre) => (
                        <li key={genre} className="movie-card-genre">
                            {genre}
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    )
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        imdbId: PropTypes.string,
        title: PropTypes.string,
        synopsis: PropTypes.string,
        genres: PropTypes.arrayOf(PropTypes.string),
        imageurls: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
}

export default MovieCard
