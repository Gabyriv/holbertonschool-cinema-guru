import { useState, useEffect } from "react"
import axios from "axios"
import MovieCard from "../../components/movies/MovieCard"
import Filter from "../../components/movies/Filter"
import Button from "../../components/general/Button"
import "./dashboard.css"

/**
 * HomePage component - Main home page displaying movies with filtering
 * Allows users to search, filter, and browse movies
 */
function HomePage() {
    // State for storing movies list
    const [movies, setMovies] = useState([])
    // State for minimum year filter
    const [minYear, setMinYear] = useState(1970)
    // State for maximum year filter
    const [maxYear, setMaxYear] = useState(2022)
    // State for selected genres filter
    const [genres, setGenres] = useState([])
    // State for sort option
    const [sort, setSort] = useState("")
    // State for title search
    const [title, setTitle] = useState("")
    // State for pagination
    const [page, setPage] = useState(1)

    /**
     * loadMovies - Fetches movies from API with current filters
     * @param {number} pageNum - The page number to query
     * @param {boolean} append - Whether to append or replace movies
     */
    const loadMovies = async (pageNum = 1, append = false) => {
        try {
            const token = localStorage.getItem("accessToken")
            
            // Build query parameters
            const params = new URLSearchParams({
                minYear: minYear.toString(),
                maxYear: maxYear.toString(),
                page: pageNum.toString(),
            })

            // Add title if not empty
            if (title) {
                params.append("title", title)
            }

            // Add sort if selected
            if (sort) {
                params.append("sort", sort)
            }

            // Add genres if any selected
            if (genres.length > 0) {
                params.append("genres", genres.join(","))
            }

            // Send GET request to advanced search endpoint
            const response = await axios.get(
                `http://localhost:8000/api/titles/advancedsearch?${params.toString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            // API returns { totalCount, titles } - extract titles array
            const titles = response.data.titles || []
            
            // If appending, add to existing movies, otherwise replace
            if (append) {
                setMovies((prevMovies) => [...prevMovies, ...titles])
            } else {
                setMovies(titles)
            }
        } catch (error) {
            console.error("Error loading movies:", error)
        }
    }

    // Load movies on mount and when filter/sort states change
    useEffect(() => {
        const fetchMovies = async () => {
            const token = localStorage.getItem("accessToken")
            
            const params = new URLSearchParams({
                minYear: minYear.toString(),
                maxYear: maxYear.toString(),
                page: "1",
            })

            if (title) params.append("title", title)
            if (sort) params.append("sort", sort)
            if (genres.length > 0) params.append("genres", genres.join(","))

            try {
                const response = await axios.get(
                    `http://localhost:8000/api/titles/advancedsearch?${params.toString()}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                // API returns { totalCount, titles } - extract titles array
                setMovies(response.data.titles || [])
            } catch (error) {
                console.error("Error loading movies:", error)
            }
        }

        fetchMovies()
    }, [minYear, maxYear, genres, sort, title])

    /**
     * handleLoadMore - Handles loading more movies
     */
    const handleLoadMore = () => {
        const nextPage = page + 1
        setPage(nextPage)
        loadMovies(nextPage, true)
    }

    return (
        <div className="home-page">
            {/* Filter section */}
            <Filter
                minYear={minYear}
                setMinYear={setMinYear}
                maxYear={maxYear}
                setMaxYear={setMaxYear}
                sort={sort}
                setSort={setSort}
                genres={genres}
                setGenres={setGenres}
                title={title}
                setTitle={setTitle}
            />

            {/* Movies grid */}
            <ul className="movies-list">
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbId} movie={movie} />
                ))}
            </ul>

            {/* Load more button */}
            <div className="load-more">
                <Button 
                    label="Load More.."
                    onClick={handleLoadMore}
                />
            </div>
        </div>
    )
}

export default HomePage
