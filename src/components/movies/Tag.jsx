import { useState } from "react"
import PropTypes from "prop-types"
import "./movies.css"

/**
 * Tag component - Displays a genre tag that can be selected/deselected
 * Used for filtering movies by genre
 */
function Tag({ genre, filter, genres, setGenres }) {
    // State to track if this tag is selected
    const [selected, setSelected] = useState(false)

    /**
     * handleTag - Toggles the tag selection state
     * Adds or removes the genre from the genres array
     */
    const handleTag = () => {
        if (selected) {
            // Remove genre from genres array
            setGenres(genres.filter((g) => g !== genre))
            setSelected(false)
        } else {
            // Add genre to genres array
            setGenres([...genres, genre])
            setSelected(true)
        }
    }

    return (
        <li 
            className={`tag ${selected ? "selected" : ""} ${filter ? "filter" : ""}`}
            onClick={handleTag}
        >
            {genre}
        </li>
    )
}

Tag.propTypes = {
    genre: PropTypes.string.isRequired,
    filter: PropTypes.bool,
    genres: PropTypes.array.isRequired,
    setGenres: PropTypes.func.isRequired,
}

Tag.defaultProps = {
    filter: false,
}

export default Tag
