import styles from "./Forecast.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import ForecastItem from "./ForecastItem";
import ForecastButton from "./ForecastButton";

import { useWeather } from "@/context/WeatherContext";

const Forecast = () => {

    const { weatherData } = useWeather();

    return (
        <div className={styles.forecast_spacer}>

            <div className={styles.item_spacer}>
                <span className={styles.nav_chevron}><FontAwesomeIcon icon={faChevronLeft} /></span>

                { weatherData && <>{ weatherData.daily.slice(1, 6).map((data, index) => <ForecastItem key={index} data={data} type="daily" />)}</> }

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