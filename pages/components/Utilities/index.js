import styles from "./Utilities.module.css";

import Button from "./Button";
import Display from "./Display";
import { Row } from "react-bootstrap";
import { useState } from "react";

const Utilities = () => {

    const [ selected, setSelected ] = useState("temp");

    const clickHandler = (str) => {
        console.log(str)
        setSelected(str);
    }

    return (
        <Row>
            <div className={styles.utility_spacer}>

                <div className={styles.button_spacer} onClick={() => clickHandler("temp")}>
                    <Button for="temp" />
                    { selected === "temp" && <span className={styles.button_accent}></span> }
                </div>

                <div className={styles.button_spacer} onClick={() => clickHandler("wind")}>
                    <Button for="wind" />
                    { selected === "wind" && <span className={styles.button_accent}></span> }
                </div>

                <div className={styles.button_spacer} onClick={() => clickHandler("misc")}>
                    <Button for="misc" />
                    { selected === "misc" && <span className={styles.button_accent}></span> }
                </div>

                { selected && <Display for={selected} /> }

            </div>
        </Row>
    )

}

export default Utilities;