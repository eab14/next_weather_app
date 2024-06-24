import { forwardRef, useEffect, useRef } from 'react';
import styles from './Card.module.css';
import { gsap } from 'gsap';

const Card = forwardRef((props, ref) => {

    useEffect(() => {

        if (ref.current) {

            if (props.selected) gsap.to(ref.current, { duration: 0.4, background: "linear-gradient(#343434 60%, #232323)", width: "110%", height: 90 })
            else gsap.to(ref.current, { duration: 0.4, background: "linear-gradient(#b4b4b4 60%, #888)", width: "100%", height: 80 })

        }

    }, [ props.selected ])

    return (
    
        <div ref={ref} className={props.selected ? `${styles.card + " " + styles.selected}` : styles.card} onClick={props.onClick}>

            <div className={styles.icon_spacer}>
            { props.conditions && <h4>{props.conditions}</h4> }
            { props.icon && <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} /> }
            </div>
            { props.city && <h3>{props.city}</h3> }
            { props.temp && <h2>{parseInt(props.temp) + "° C"}</h2> }

        </div>
    
    );

});

export default Card;