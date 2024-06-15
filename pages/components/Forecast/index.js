import styles from "./Forecast.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ForecastItem from "./ForecastItem";
import ForecastButton from "./ForecastButton";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Forecast = () => {

    return (
        <div className={styles.forecast_spacer}>

            <div className={styles.item_spacer}>
                <span className={styles.nav_chevron}><FontAwesomeIcon icon={faChevronLeft} /></span>
                <ForecastItem />
                <ForecastItem />
                <ForecastItem />
                <ForecastItem />
                <ForecastItem />
                <span className={styles.nav_chevron}><FontAwesomeIcon icon={faChevronRight} /></span>
            </div>

            <div className={styles.button_spacer}>
                <ForecastButton text="Daily" />
                <ForecastButton text="Hourly" />
            </div>

        </div>
    );

}

export default Forecast;