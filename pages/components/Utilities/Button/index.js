import { faEllipsis, faInfo, faTemperature3, faWind } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = (props) => {

    return (
        <button>
            { props.for === "temp" && <FontAwesomeIcon icon={faTemperature3} onClick={props.onClick} /> }
            { props.for === "wind" && <FontAwesomeIcon icon={faWind} onClick={props.onClick} /> }
            { props.for === "misc" && <FontAwesomeIcon icon={faEllipsis} onClick={props.onClick} /> }
        </button>
    );

}

export default Button;