import styles from "../Forecast.module.css";

import { useRef, useEffect } from "react";
import { gsap } from 'gsap';

const ForecastButton = (props) => {

    const buttonRef = useRef(null);

    useEffect(() => {

        if (buttonRef.current) {

            if (props.selected) gsap.to(buttonRef.current, { duration: 0.4, background: "linear-gradient(#232323 60%, #141414)", height: 28 });
            else gsap.to(buttonRef.current, { duration: 0.4, background: "linear-gradient(#555 60%, #333)", height: 24 });

        }

    }, [ props.selected ])

    return (<button ref={buttonRef} className={props.selected ? styles.selected : ""} onClick={props.onClick}>{props.text}</button>);

}

export default ForecastButton;