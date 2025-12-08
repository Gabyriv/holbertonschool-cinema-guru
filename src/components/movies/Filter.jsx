import PropTypes from "prop-types"
import SearchBar from "../general/SearchBar"
import Input from "../general/Input"
import SelectInput from "../general/SelectInput"
import Tag from "./Tag"
import "./movies.css"

// List of all available genre tags
const genresList = [
    "action",
    "drama", 
    "comedy",
    "biography",
    "romance",
    "thriller",
    "war",
    "history",
    "sport",
    "sci-fi",
    "documentary",
    "crime",
    "fantasy"
]

// Sorting options for the SelectInput
const sortOptions = [
    { value: "latest", label: "Latest" },
    { value: "oldest", label: "Oldest" },
    { value: "highestrated", label: "Highest Rated" },
    { value: "lowestrated", label: "Lowest Rated" }
]

/**
 * Filter component - Provides filtering options for movies
 * Includes search, year range, sorting, and genre filters
 */
function Filter({ 
    minYear, 
    setMinYear, 
    maxYear, 
    setMaxYear, 
    sort, 
    setSort, 
    genres, 
    setGenres, 
    title, 
    setTitle 
}) {
    return (
        <div className="filter">
            {/* Search bar for title search */}
            <SearchBar title={title} setTitle={setTitle} />

            {/* Year range inputs */}
            <div className="filter-year">
                <Input 
                    label="Min Year"
                    type="number"
                    value={minYear}
                    setValue={setMinYear}
                />
                <Input 
                    label="Max Year"
                    type="number"
                    value={maxYear}
                    setValue={setMaxYear}
                />
            </div>

            {/* Sort select input */}
            <SelectInput 
                label="Sort By"
                options={sortOptions}
                value={sort}
                setValue={setSort}
            />

            {/* Genre tags list */}
            <ul className="filter-tags">
                {genresList.map((genre) => (
                    <Tag 
                        key={genre}
                        genre={genre}
                        filter={true}
                        genres={genres}
                        setGenres={setGenres}
                    />
                ))}
            </ul>
        </div>
    )
}

Filter.propTypes = {
    minYear: PropTypes.number.isRequired,
    setMinYear: PropTypes.func.isRequired,
    maxYear: PropTypes.number.isRequired,
    setMaxYear: PropTypes.func.isRequired,
    sort: PropTypes.string.isRequired,
    setSort: PropTypes.func.isRequired,
    genres: PropTypes.array.isRequired,
    setGenres: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    setTitle: PropTypes.func.isRequired,
}

export default Filter
