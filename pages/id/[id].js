import { useWeather } from '@/context/WeatherContext';

import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';

const SingleDisplay = () => {

    const router = useRouter();
    
    const { id } = router.query;

    const { weatherList, setWeatherData } = useWeather();

    useEffect(() => {

        if (weatherList && id) {

            const index = weatherList.findIndex(item => item.id === parseInt(id));
            setWeatherData(weatherList[index]);

        }
        
    }, [ weatherList, id ])

    return <></>;

}

export default SingleDisplay;