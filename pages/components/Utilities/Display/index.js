import styles from "../Utilities.module.css";
import TempDisplay from "./TempDisplay";

const Display = (props) => {

    return (

        <div className={styles.display_spacer}>

            { props.for === "temp" && <TempDisplay /> }

        </div>
    );

}

export default Display;