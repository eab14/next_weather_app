import { faTemperature3 } from "@fortawesome/free-solid-svg-icons";
import styles from "../../Utilities.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DisplayLine = (props) => {

    return (
        <div className={styles.display_line}>

            { props.for === "temp" && <span>Current:</span> }
            { props.for === "feels_like" && <span>Feels Like:</span> }
            { props.for === "temp_min" && <span>Minimum:</span> }
            { props.for === "temp_max" && <span>Maximum:</span> }

            { Math.round(props.data) + "° C" }

        </div>
    );

}

export default DisplayLine;