import styles from "../Utilities.module.css";

import { useEffect, useRef } from "react";
import { gsap } from 'gsap';

import TempDisplay from "./TempDisplay";
import WindDisplay from "./WindDisplay";
import { useWeather } from "@/context/WeatherContext";
import MiscDisplay from "./MiscDisplay";

const Display = (props) => {

    return (

        <div className={styles.display_spacer}>

            { props.for === "temp" && <TempDisplay /> }
            { props.for === "wind" && <WindDisplay /> }
            { props.for === "misc" && <MiscDisplay /> }

        </div>
    );

}

export default Display;