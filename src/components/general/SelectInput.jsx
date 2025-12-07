import PropTypes from 'prop-types'
import "./general.css"

function SelectInput({ label, options, className, value, setValue }) {

    const handleSelect = (event) => {
        setValue(event.target.value)
    }

    return (
        <div className={`select-container ${className || ''}`}>
            <label htmlFor={label}>{label}</label>
            <select id={label} value={value} onChange={handleSelect}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    )
}

SelectInput.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    className: PropTypes.string,
    value: PropTypes.any.isRequired,
    setValue: PropTypes.func.isRequired,
}

export default SelectInput