import styles from './WindDisplay.module.css';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import { useWeather } from '@/context/WeatherContext';
import { SVG_compass } from "@/pages/components/Background/svg";

const WindDisplay = () => {

    const svgRef = useRef();
    const { weatherData } = useWeather();

    useEffect(() => {

        if (svgRef.current && weatherData) {

            const arrow = svgRef.current.getElementById("arrow");
            gsap.to(arrow, { rotate: weatherData.wind.deg, transformOrigin: "50%, 96%", duration: 1 });

        }

    }, [ weatherData ])

    return (
        <>

            <div className={styles.graphic_spacer}>
                <SVG_compass ref={svgRef} />
            </div>

            <div className={styles.info_spacer}>

                <div className={styles.info_line}>
                    <h2>Speed</h2>
                    <p>{Math.round(weatherData.wind.speed * 3.2)} <span>km/h</span></p>
                </div>

                { 
                    weatherData.wind.gust &&

                        <div className={styles.info_line}>
                            <h2>Gust</h2>
                            <p>{parseInt(weatherData.wind.gust * 3.2)} <span>km/h</span></p>
                        </div>
                        
                }

            </div>

            <div className={styles.select_spacer}></div>

        </>
    )

}

export default WindDisplay;