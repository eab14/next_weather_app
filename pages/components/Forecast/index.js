import styles from "./Forecast.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import ForecastItem from "./ForecastItem";
import ForecastButton from "./ForecastButton";

import { useWeather } from "@/context/WeatherContext";
import { useState } from "react";

const Forecast = () => {

    const { weatherData } = useWeather();
    const [ selected, setSelected ] = useState("daily");

    return (
        <div className={styles.forecast_spacer}>

            <div className={styles.item_spacer}>
                <span className={styles.nav_chevron}><FontAwesomeIcon icon={faChevronLeft} /></span>

                { (weatherData && selected === "daily") && <>{ weatherData.daily.slice(1, 6).map((data, index) => <ForecastItem key={index} data={data} type={selected} />)}</> }
                { (weatherData && selected === "hourly") && <>{ weatherData.hourly.slice(1, 6).map((data, index) => <ForecastItem key={index} data={data} type={selected} />)}</> }

                <span className={styles.nav_chevron}><FontAwesomeIcon icon={faChevronRight} /></span>
            </div>

            <div className={styles.button_spacer}>
                <ForecastButton selected={selected === "daily"} text="Daily" onClick={() => setSelected("daily")} />
                <ForecastButton selected={selected === "hourly"} text="Hourly" onClick={() => setSelected("hourly")} />
            </div>

        </div>
    );

}

export default Forecast;