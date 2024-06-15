import { useWeather } from '@/context/WeatherContext';
import styles from './CardSpacer.module.css';
import { Container } from 'react-bootstrap';
import Card from "./Card";

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
                            selected={true}
                        />

                        <Card 
                            city={`${weatherData.name}, ${weatherData.sys.country}`} 
                            icon={weatherData.weather[0].icon} 
                            temp={weatherData.main.temp}
                        />

                        <Card 
                            city={`${weatherData.name}, ${weatherData.sys.country}`} 
                            icon={weatherData.weather[0].icon} 
                            temp={weatherData.main.temp}
                        />

                    </Container>

            }
            
        </>
    );

}

export default CardSpacer;