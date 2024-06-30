import styles from "../Forecast.module.css";

import { useWeather } from "@/context/WeatherContext";

const ForecastItem = (props) => {

    const { offset, weatherData } = useWeather();

    return (

        <>
        { weatherData && 

            <div className={styles.forecast_item}>

                { props.type === "daily" && (
                    <>
                    <h2>{new Date((props.data.dt + (offset + weatherData.timezone)) * 1000).toLocaleString("en-us", { month: "short", day: "numeric" }) }</h2>
                    <img src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`} />
                    <p>{Math.round(props.data.temp.day) + "° C"}</p>
                    </>
                )}

                { props.type === "hourly" && (

                    <>
                    <h2>{new Date((props.data.dt + (offset + weatherData.timezone)) * 1000).toLocaleString("en-us", { hour: "numeric", hour12: true, minute: "numeric" }) }</h2>
                    <img src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`} />
                    <p>{Math.round(props.data.temp) + "° C"}</p>
                    </>

                )}

            </div>

        }
        </>

    );

}

export default ForecastItem;