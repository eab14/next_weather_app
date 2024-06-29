import styles from "./Forecast.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import ForecastItem from "./ForecastItem";
import ForecastButton from "./ForecastButton";

import { useWeather } from "@/context/WeatherContext";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

const Forecast = () => {

    const sliderRef = useRef(null);

    const { weatherData } = useWeather();
    const [ selected, setSelected ] = useState("daily");
    const [ dailySelected, setDailySelected ] = useState(0);
    const [ hourlySelected, setHourlySelected ] = useState(0);

    const DAILY_LIMIT = 7;
    const HOURLY_LIMIT = 12;
    const ITEM_LIMIT = 5;

    const shiftNext = () => { 
        
        ((dailySelected < DAILY_LIMIT - ITEM_LIMIT) && selected === "daily") && setDailySelected((prev) => prev + 1);
        ((hourlySelected < HOURLY_LIMIT - ITEM_LIMIT) && selected === "hourly") && setHourlySelected((prev) => prev + 1);
    
    }

    const shiftPrev = () => {

        (dailySelected > 0 && selected === "daily") && setDailySelected((prev) => prev - 1);
        (hourlySelected > 0 && selected === "hourly") && setHourlySelected((prev) => prev - 1);
    
    }

    useEffect(() => {

        if (sliderRef.current && selected === "daily") gsap.to(sliderRef.current, { x: (dailySelected * -110), duration: 0.4 });

    }, [ dailySelected ])

    useEffect(() => {

        if (sliderRef.current && selected === "hourly") gsap.to(sliderRef.current, { x: (hourlySelected * -110), duration: 0.4 });

    }, [ hourlySelected ])

    useEffect(() => {

        setDailySelected(0); 
        setHourlySelected(0);
        gsap.to(sliderRef.current, { x: 0, duration: 0.4 })

    }, [ selected, weatherData ])

    return (

        <div className={styles.forecast_spacer}>

            <div className={styles.item_spacer}>
                <span className={styles.nav_chevron} onClick={shiftPrev}><FontAwesomeIcon icon={faChevronLeft} /></span>

                <article>

                    <div ref={sliderRef} className={styles.slider_spacer}>

                    { (weatherData && selected === "daily") && <>{ weatherData.daily.slice(1, DAILY_LIMIT + 1).map((data, index) => <ForecastItem key={index} data={data} type={selected} />)}</> }
                    { (weatherData && selected === "hourly") && <>{ weatherData.hourly.slice(1, HOURLY_LIMIT + 1).map((data, index) => <ForecastItem key={index} data={data} type={selected} />)}</> }

                    </div>

                </article>

                <span className={styles.nav_chevron} onClick={shiftNext}><FontAwesomeIcon icon={faChevronRight} /></span>
            </div>

            <div className={styles.button_spacer}>
                <ForecastButton selected={selected === "daily"} text="Daily" onClick={() => setSelected("daily")} />
                <ForecastButton selected={selected === "hourly"} text="Hourly" onClick={() => setSelected("hourly")} />
            </div>

        </div>

    );

}

export default Forecast;