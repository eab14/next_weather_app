import { useWeather } from '@/context/WeatherContext';
import styles from './MiscDisplay.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown, faDroplet, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const MiscDisplay = () => {

    const { weatherData, offset } = useWeather();

    return (

        <div className={styles.misc_display_spacer}>
        
            {
                weatherData &&

                <>

                    <div className={styles.misc_line}>
                        <div className={styles.misc_line_left}>
                            <h2>Sunrise</h2>
                            <i><FontAwesomeIcon icon={faSun} /></i>
                            <p>
                                {new Date((weatherData.daily[0].sunrise + (offset + weatherData.timezone)) * 1000).toLocaleString("en-us", { hour: "numeric", hour12: true, minute: "numeric" }).split(" ")[0]}
                                <span>{new Date((weatherData.daily[0].sunrise + (offset + weatherData.timezone)) * 1000).toLocaleString("en-us", { hour: "numeric", hour12: true, minute: "numeric" }).split(" ")[1]}</span>
                            </p>
                        </div>
                        <div className={styles.misc_line_right}>
                            <h2>Sunset</h2>
                            <p>
                                {new Date((weatherData.daily[0].sunset + (offset + weatherData.timezone)) * 1000).toLocaleString("en-us", { hour: "numeric", hour12: true, minute: "numeric" }).split(" ")[0]}
                                <span>{new Date((weatherData.daily[0].sunset + (offset + weatherData.timezone)) * 1000).toLocaleString("en-us", { hour: "numeric", hour12: true, minute: "numeric" }).split(" ")[1]}</span>
                            </p>
                            <i><FontAwesomeIcon icon={faMoon} /></i>
                        </div>
                    </div>

                    <div className={styles.misc_line}>
                        <div className={styles.misc_line_left}>
                            <i><FontAwesomeIcon icon={faDroplet} /></i>
                            <h2>Humidity</h2>
                            <p>{weatherData.main.humidity}<span>%</span></p>
                        </div>
                        <div className={styles.misc_line_right}>
                            <h2>Pressure</h2>
                            <p>{weatherData.main.pressure}<span>hPa</span></p>
                            <i><FontAwesomeIcon icon={faAngleDoubleDown} /></i>
                        </div>
                    </div>

                </>

            }
        
        </div>
    )

}

export default MiscDisplay;