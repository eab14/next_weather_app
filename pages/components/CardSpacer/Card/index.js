import styles from './Card.module.css';

const Card = (props) => {

    return (
    
        <div className={props.selected ? `${styles.card + " " + styles.selected}` : styles.card}>

            <div className={styles.icon_spacer}>
            { props.conditions && <h4>{props.conditions}</h4> }
            { props.icon && <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} /> }
            </div>
            { props.city && <h3>{props.city}</h3> }
            { props.temp && <h2>{parseInt(props.temp) + "°C"}</h2> }

        </div>
    
    );

}

export default Card;