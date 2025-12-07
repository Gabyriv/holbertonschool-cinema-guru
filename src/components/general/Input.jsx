import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./general.css"

function Input({ label, type, className, value, setValue, icon, inputAttributes}) {

    const handleInput = (event) => {
        setValue(event.target.value)
        if (inputAttributes?.onChange) {
            inputAttributes.onChange(event)
        }
    }

    return (
        <div className={`input-container ${className || ''}`}>
            <label htmlFor={label}>
                {icon && <FontAwesomeIcon icon={icon} className="icon" />}
                {label}
            </label>
            <input 
                id={label}
                type={type} 
                value={value} 
                onChange={handleInput} 
                {...inputAttributes} 
            />
        </div>
    )
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    value: PropTypes.any.isRequired,
    setValue: PropTypes.func.isRequired,
    icon: PropTypes.object,
    inputAttributes: PropTypes.object,
}

export default Input