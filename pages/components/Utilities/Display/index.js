import styles from "../Utilities.module.css";

import TempDisplay from "./TempDisplay";
import WindDisplay from "./WindDisplay";

const Display = (props) => {

    return (

        <div className={styles.display_spacer}>

            { props.for === "temp" && <TempDisplay /> }
            { props.for === "wind" && <WindDisplay /> }

        </div>
    );

}

export default Display;