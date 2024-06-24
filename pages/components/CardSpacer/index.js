import styles from './CardSpacer.module.css';

import Card from "./Card";

import { Container } from 'react-bootstrap';

import { useWeather } from '@/context/WeatherContext';
import { useAtom } from 'jotai';
import { weatherArray, selectedItem } from '@/context/atomStates';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const CardSpacer = () => {

    const { weatherData, setWeatherData } = useWeather();
    const [ weatherList ] = useAtom(weatherArray);
    const [ selected, setSelected ] = useAtom(selectedItem);

    useEffect(() => setWeatherData(weatherList[selected]), [ selected ])

    return (
        <>
            {
                weatherList &&

                    <Container className={styles.card_spacer}>

                        {
                            weatherList.map((data, index) => 
                                <Card
                                    key={index}
                                    city={`${data.name}, ${data.sys.country}`} 
                                    icon={data.weather[0].icon} 
                                    temp={data.main.temp}
                                    conditions={data.weather[0].description}
                                    onClick={() => setSelected(index)}
                                    selected={index === selected}
                                />
                            )
                        }

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