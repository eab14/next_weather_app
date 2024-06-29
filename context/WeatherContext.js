import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useBG } from "./BackgroundContext";

import { useAtom } from "jotai";
import { searchArray, selectedItem, selectedPage, weatherArray } from "./atomState";

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {

    const { setSky, setWind, addRain, addThunderstorm, setDaylight } = useBG();

    const [ weatherData, setWeatherData ] = useState(null);
    const [ offset, setOffset ] = useState(14400);

    const [ weatherList, setWeatherList ] = useAtom(weatherArray);
    const [ selected, setSelected ] = useAtom(selectedItem);
    const [ page, setPage ] = useAtom(selectedPage);

    const getOneCall = async (lat, lon) => await new Promise( async (resolve, reject) => {

        let data = null;

        const response = await fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=c86496cf5e7633a638dc952a412796f3&units=metric`)

        if (response.ok) {
            
            data = await response.json();
            resolve(data);

        }

        else reject(console.log("Error - One Call API call failed..."));

    });

    const getGeo = useCallback( async () => {

        let data = null;
        let data2 = null;

        const position = await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=c86496cf5e7633a638dc952a412796f3&units=metric`);

        if (response.ok) {

            data = await response.json();
            data2 = await getOneCall(position.coords.latitude, position.coords.longitude);

            data.hourly = data2.hourly;
            data.daily = data2.daily;
            
            setWeatherList((prev) => [ ...new Set([ ...prev, data ]) ]);
            setWeatherData(data);
        }

    }, [])

    const getBySearch = useCallback( async (input) => {

        let data = null;
        let data2 = null;

        const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${input}&appid=c86496cf5e7633a638dc952a412796f3&units=metric&cnt=6`);

        if (response.ok) {

            data = await response.json();

            await Promise.all(data.list.map(async (item, index) => {

                data2 = await getOneCall(item.coord.lat, item.coord.lon);

                item.hourly = data2.hourly;
                item.daily = data2.daily;
                item.timezone = data2.timezone_offset;

            }));

            setWeatherList((prev) => [ ...new Set([ ...prev, ...data.list ]) ]);
            setWeatherData(data.list[data.list.length - 1]);

        }

    }, [])

    const setWeather = () => {

        console.log(weatherData)

        const conditions = [ "Rain", "Thunderstorm", "Drizzle", "Snow" ];

        if (conditions.includes(weatherData.weather[0].main)) {

            setSky(weatherData.weather[0].main);
            
            switch (weatherData.weather[0].main) {

                case "Rain": addRain(weatherData.weather[0].description); break;
                case "Drizzle": addRain(weatherData.weather[0].description); break;
                case "Snow": addSnow(weatherData.weather[0].description); break;
                case "Thunderstorm": addThunderstorm(weatherData.weather[0].description); break;

            }

        }

        else setSky(weatherData.weather[0].description);

        setWind(weatherData.wind.speed);
        setDaylight(weatherData.dt, weatherData.daily[0].sunrise, weatherData.daily[0].sunset, weatherData.timezone)

    }

    useEffect(() => {

        if (weatherList.length > 0 && weatherData) {

            const index = (weatherList) ? weatherList.findIndex(item => item.id === weatherData.id) : null;
            setSelected(index);
            setPage(Math.ceil((index + 1) / 3));

        }

        (weatherData) && setWeather();

    }, [ weatherList, weatherData ]);

    useEffect(() => {

        async function fetchData() { await getGeo(); }
        fetchData();

    }, []);

    const context = {
        weatherData,
        weatherList,
        setWeatherData,
        getBySearch,
        offset
    }

    return (
        <WeatherContext.Provider value={context}>
            { children }
        </WeatherContext.Provider>
    )

}