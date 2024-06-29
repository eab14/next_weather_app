import styles from './CardSpacer.module.css';

import Card from "./Card";

import { Container } from 'react-bootstrap';
import { gsap } from 'gsap';

import { useWeather } from '@/context/WeatherContext';
import { useAtom } from 'jotai';
import { weatherArray, selectedItem, selectedPage } from '@/context/atomState';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { createRef, useEffect, useRef, useState } from 'react';

const ITEMS = 3; 

const CardSpacer = () => {

    const cardRefs = useRef([]);

    const { weatherData, setWeatherData } = useWeather();

    const [ weatherList ] = useAtom(weatherArray);
    const [ selected, setSelected ] = useAtom(selectedItem);
    const [ page, setPage ] = useAtom(selectedPage);

    const totalPages = Math.ceil(weatherList.length / ITEMS);

    const handlePageClick = (pageNumber) => setPage(pageNumber);

    useEffect(() => setWeatherData(weatherList[selected]), [ selected ]);
    useEffect(() => { cardRefs.current = Array.from({ length: ITEMS }, () => createRef()); }, []);

    useEffect(() => {

        let offset = 0.1;

        cardRefs.current.forEach((ref, index) => {

            if (ref.current) {

                gsap.to(ref.current, { opacity: 0, left: -40, duration: 0 });
                gsap.to(ref.current, { opacity: 1, left: 0, delay: offset, duration: 0.3 });
                offset += 0.14;

            }

        });

    }, [ page, weatherList ])

    return (
        <>
            {
                weatherList &&

                    <Container className={styles.card_spacer}>

                        {
                            weatherList.slice((page - 1) * ITEMS, page * ITEMS).map((data, index) => 
                                <Card
                                    key={index}
                                    ref={cardRefs.current[index]} 
                                    city={`${data.name}, ${data.sys.country}`} 
                                    icon={data.weather[0].icon} 
                                    temp={data.main.temp}
                                    conditions={data.weather[0].description}
                                    onClick={() => setSelected((page - 1) * ITEMS + index)}
                                    selected={selected === (page - 1) * ITEMS + index}
                                />
                            )
                        }

                        <div className={styles.card_pagination}>

                            <span className={styles.pagination_arrow} onClick={() => handlePageClick(page > 1 ? page - 1 : page)}>
                                <FontAwesomeIcon icon={faCaretLeft} />
                            </span>

                            {
                                Array.from({ length: totalPages }, (_, index) => (

                                    <span
                                        key={index}
                                        className={index + 1 === page ? styles.selected : ''}
                                        onClick={() => handlePageClick(index + 1)}
                                    >
                                        {index + 1}
                                    </span>

                                ))
                            }

                            <span className={styles.pagination_arrow} onClick={() => handlePageClick(page < totalPages ? page + 1 : page)}>
                                <FontAwesomeIcon icon={faCaretRight} />
                            </span>

                        </div>

                    </Container>

            }
            
        </>
    );

}

export default CardSpacer;