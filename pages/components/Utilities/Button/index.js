import { faEllipsis, faInfo, faTemperature3, faWind } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = (props) => {

    return (
        <button>
            { props.for === "temp" && <FontAwesomeIcon icon={faTemperature3} /> }
            { props.for === "wind" && <FontAwesomeIcon icon={faWind} /> }
            { props.for === "misc" && <FontAwesomeIcon icon={faEllipsis} /> }
        </button>
    );

}

export default Button;