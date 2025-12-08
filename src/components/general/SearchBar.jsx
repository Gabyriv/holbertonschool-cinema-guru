import PropTypes from 'prop-types'
import "./general.css"

function SearchBar({title, setTitle}) {

    const handleInput = (event) => {
        setTitle(event.target.value)
    }

    return (
        <div className="search-bar">
            <input 
                type="text" 
                value={title} 
                onChange={handleInput}
                placeholder="Search Movies"
            />
        </div>
    )
}

SearchBar.propTypes = {
    title: PropTypes.string,
    setTitle: PropTypes.func,
}

export default SearchBar