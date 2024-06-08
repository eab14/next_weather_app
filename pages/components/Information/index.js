import { useWeather } from '@/context/WeatherContext';
import styles from './Information.module.css';

const Information = () => {

    const { weatherData } = useWeather();

    return (

        <div className={styles.info_spacer}>

            {

                weatherData &&

                    <>
                        <p>{weatherData.name}, {weatherData.sys.country}</p>
                        <h2>{parseInt(weatherData.main.temp)} °C</h2>
                    </>

            }

        </div>
        
    );

}

export default Information;