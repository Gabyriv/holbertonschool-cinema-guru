import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./general.css"

function Button({label, className, onClick, icon}) {
    return (
        <button className={`button ${className || ''}`} onClick={onClick}>
            {label}
            {icon && <FontAwesomeIcon icon={icon} />}
        </button>
    )
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.object,
}

export default Button