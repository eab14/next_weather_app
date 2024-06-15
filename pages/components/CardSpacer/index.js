import styles from './CardSpacer.module.css';

import Card from "./Card";

import { Container } from 'react-bootstrap';

import { useWeather } from '@/context/WeatherContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

const CardSpacer = () => {

    const { weatherData } = useWeather();

    return (
        <>
            {
                weatherData &&

                    <Container className={styles.card_spacer}>
                        
                        <Card 
                            city={`${weatherData.name}, ${weatherData.sys.country}`} 
                            icon={weatherData.weather[0].icon} 
                            temp={weatherData.main.temp}
                            conditions={weatherData.weather[0].description}
                            selected={true}
                        />

                        <Card 
                            city={`${weatherData.name}, ${weatherData.sys.country}`} 
                            icon={weatherData.weather[0].icon} 
                            conditions={weatherData.weather[0].description}
                            temp={weatherData.main.temp}
                        />

                        <Card 
                            city={`${weatherData.name}, ${weatherData.sys.country}`} 
                            icon={weatherData.weather[0].icon} 
                            conditions={weatherData.weather[0].description}
                            temp={weatherData.main.temp}
                        />

                        <div className={styles.card_pagination}>
                            <span><FontAwesomeIcon icon={faCaretLeft} /></span>
                            <span className={styles.selected}>1</span>
                            <span><FontAwesomeIcon icon={faCaretRight} /></span>
                        </div>

                    </Container>

            }
            
        </>
    );

}

export default CardSpacer;