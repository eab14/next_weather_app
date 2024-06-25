import styles from "../Utilities.module.css";

import { useEffect, useRef, useState } from "react";

import { useWeather } from "@/context/WeatherContext";
import { SVG_temp } from "../../Background/svg";
import { gsap } from 'gsap';

const Display = (props) => {

    const svgRef = useRef();
    const tempRef = useRef();

    const { weatherData } = useWeather();
    const [ selected, setSelected ] = useState("current");

    const handleClick = (e, type) => {

        e.preventDefault();

        switch (type) {

            case "current":
                tempRef.current.textContent = parseInt(weatherData.main.temp);
                break;

            case "feels_like":
                tempRef.current.textContent = parseInt(weatherData.main.feels_like);
                break;

            case "min":
                tempRef.current.textContent = parseInt(weatherData.daily[0].temp.min);
                break;

            case "max":
                tempRef.current.textContent = parseInt(weatherData.daily[0].temp.max);
                break;

        }

        tempRef.current.textContent += "° C";
        setSelected(type);

    }

    useEffect(() => {

        setSelected("current");
        if (weatherData) tempRef.current.textContent = `${parseInt(weatherData.main.temp)}° C`;

    }, [ weatherData ])

    return (

        <div className={styles.display_spacer}>

            { 
                selected &&
            
                <div className={styles.button_spacer}>
                    <button className={selected === "current" ? styles.selected : ""} onClick={(e) => handleClick(e, "current")}>Current</button>
                    <button className={selected === "feels_like" ? styles.selected : ""} onClick={(e) => handleClick(e, "feels_like")}>Feels Like</button>
                    <button className={selected === "min" ? styles.selected : ""} onClick={(e) => handleClick(e, "min")}>Min. Temp</button>
                    <button className={selected === "max" ? styles.selected : ""} onClick={(e) => handleClick(e, "max")}>Max. Temp</button>
                </div>

            }

            {
                weatherData && (
                    <div className={styles.graphic_spacer}>
                        <SVG_temp ref={svgRef} />
                        <h2 ref={tempRef}>{parseInt(weatherData.main.temp)}° C</h2>
                    </div>
                )
            }

        </div>
    );

}

export default Display;