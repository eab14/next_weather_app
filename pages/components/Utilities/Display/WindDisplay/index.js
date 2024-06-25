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
            
            gsap.to(arrow, { rotate: weatherData.wind.deg, transformOrigin: "50%, 97%", duration: 1 });

        }

    }, [ weatherData ])

    return (
        <>
            <div className={styles.graphic_spacer}>
            <SVG_compass ref={svgRef} />
            </div>
        </>
    )

}

export default WindDisplay;