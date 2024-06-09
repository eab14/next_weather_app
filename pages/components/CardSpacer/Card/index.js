import styles from './Card.module.css';

const Card = (props) => {

    return (
    
        <div className={styles.card}>

            { props.city && <h3>{props.city}</h3> }
            { props.icon && <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} /> }
            { props.temp && <h2>{parseInt(props.temp) + "°C"}</h2> }

        </div>
    
    );

}

export default Card;