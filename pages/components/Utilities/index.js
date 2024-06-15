import styles from "./Utilities.module.css";

import Button from "./Button";
import Display from "./Display";
import { Row } from "react-bootstrap";

const Utilities = () => {

    const clickHandler = (e) => console.log(e)

    return (
        <Row>
            <div className={styles.utility_spacer}>

                <div className={styles.button_spacer}>
                    <Button for="temp" onClick={clickHandler} />
                    <span className={styles.button_accent}></span>
                    <Display for="temp" />
                </div>

                <div className={styles.button_spacer}>
                    <Button for="wind" onClick={clickHandler} />
                </div>

                <div className={styles.button_spacer}>
                    <Button for="misc" onClick={clickHandler} />
                </div>

            </div>
        </Row>
    )

}

export default Utilities;