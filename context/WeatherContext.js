import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useBG } from "./BackgroundContext";

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {

    const { setSky, setWind, addRain, addThunderstorm, setDaylight } = useBG();

    const [ weatherData, setWeatherData ] = useState(null);

    const getGeo = useCallback( async (url, type) => {

        let data = null;

        const position = await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=c86496cf5e7633a638dc952a412796f3&units=metric`);

        if (response.ok) {

            data = await response.json();
            setWeatherData(data);

        }

    }, [])

    const getBySearch = useCallback( async (input) => {

        let data = null;

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=c86496cf5e7633a638dc952a412796f3&units=metric`);

        if (response.ok) {

            data = await response.json();
            setWeatherData(data);

        }

    }, [])

    const setWeather = () => {

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
        setDaylight(weatherData.dt, weatherData.sys.sunrise, weatherData.sys.sunset, weatherData.timezone)

    }

    useEffect(() => {

        async function fetchData() { await getGeo(); }
        fetchData();

    }, [])

    useEffect(() => { (weatherData) && setWeather() }, [ weatherData ]);

    const context = {
        weatherData,
        getBySearch
    }

    return (
        <WeatherContext.Provider value={context}>
            { children }
        </WeatherContext.Provider>
    )

}