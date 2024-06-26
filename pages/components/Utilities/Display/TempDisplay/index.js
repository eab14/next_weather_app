import styles from './TempDisplay.module.css';

import { useState, useRef, useEffect } from "react";
import { SVG_temp } from "../../../Background/svg";
import { useWeather } from '@/context/WeatherContext';
import { gsap } from 'gsap';

const TempDisplay = (props) => {

    const svgRef = useRef();
    const tempRef = useRef();

    const [ selected, setSelected ] = useState("current");
    const { weatherData } = useWeather();

    const handleClick = (e, type) => {

        e.preventDefault();

        switch (type) {

            case "current":
                tempRef.current.textContent = parseInt(weatherData.main.temp);
                animateTemp(parseInt(weatherData.main.temp));
                break;

            case "feels_like":
                tempRef.current.textContent = parseInt(weatherData.main.feels_like);
                animateTemp(parseInt(weatherData.main.feels_like));
                break;

            case "min":
                tempRef.current.textContent = parseInt(weatherData.daily[0].temp.min);
                animateTemp(parseInt(weatherData.daily[0].temp.min));
                break;

            case "max":
                tempRef.current.textContent = parseInt(weatherData.daily[0].temp.max);
                animateTemp(parseInt(weatherData.daily[0].temp.max));
                break;

        }

        tempRef.current.innerHTML += `<span>°C</span>`;
        setSelected(type);

    }

    const animateTemp = (value) => {

        const tempBar = svgRef.current.getElementById("temp");

        if (value < 5) colorSwap(1);
        else if (value >= 5 && value <= 20) colorSwap(2);
        else if (value > 20 && value < 30) colorSwap(3);
        else if (value >= 30 && value < 35) colorSwap(4);
        else if (value >= 35) colorSwap(5);

        const percent = (value + 50) / 100;

        const height = parseInt(240 * percent);
        const offset = 195 - (height - 50);

        gsap.to(tempBar, { height: 50, y: 195, duration: 0 });
        gsap.to(tempBar, { delay: 0.05, height, y: offset, duration: 0.4 });



    }

    const colorSwap = (value) => {

        const temp = svgRef.current.getElementById("temp_main")

        const bar = temp.querySelector("#temp");
        const circle = temp.querySelector("circle");
        const paths = temp.querySelectorAll("path");

        var color;

        switch (value) {

            case 1: color = "#436596"; break;
            case 2: color = "#3fc66c"; break;
            case 3: color = "#3a9257"; break;
            case 4: color = "#e1a83f"; break;
            case 5: color = "#ce614e"; break;

        }

        bar.style.fill = color;
        circle.style.fill = color;
        paths[0].style.fill = color;
        paths[1].style.fill = color;

    }

    useEffect(() => {

        setSelected("current");
        if (weatherData) { 
            tempRef.current.textContent = `${parseInt(weatherData.main.temp)}`;
            tempRef.current.innerHTML += `<span>°C</span>`;
        }
        (weatherData) && animateTemp(parseInt(weatherData.main.temp))

    }, [ weatherData ]);

    return (
        <>

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
                        <h2 ref={tempRef}>{parseInt(weatherData.main.temp)}<span>°C</span></h2>
                    </div>
                )
            }

            <div className={styles.select_spacer}></div>

        </>
    );

}

export default TempDisplay;