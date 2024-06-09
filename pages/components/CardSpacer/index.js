import { useWeather } from '@/context/WeatherContext';
import styles from './CardSpacer.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import Card from "./Card";

const CardSpacer = () => {

    const { weatherData } = useWeather();

    return (
        <>
            {
                weatherData &&

                    <Container className={styles.card_spacer}>
                        
                        <Col xs={12}>

                            <Row>
                                <Card 
                                    city={`${weatherData.name}, ${weatherData.sys.country}`} 
                                    icon={weatherData.weather[0].icon} 
                                    temp={weatherData.main.temp}
                                />
                            </Row>

                        </Col>

                    </Container>

            }
            
        </>
    );

}

export default CardSpacer;