import styles from "../Utilities.module.css";

import { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useWeather } from "@/context/WeatherContext";
import DisplayLine from "./DisplayLine";

const Display = (props) => {

    const { weatherData } = useWeather();
    const [ selectedData, setSelectedData ] = useState(null);

    useEffect(() => {

        if (weatherData) {

            let obj = {};

            switch (props.for) {

                case "temp":

                    obj = weatherData.main;

                    delete obj.pressure
                    delete obj.grnd_level
                    delete obj.sea_level
                    delete obj.humidity

                    setSelectedData(obj);

                break;
    
            }

        }

    }, [ weatherData ])

    return (
        <div className={styles.display_spacer}>

            { 
                selectedData && (

                    <>

                    {Object.keys(selectedData).map((key) => (
                        <DisplayLine key={key} for={key} data={selectedData[key]} />
                    ))}

                    </>

                )

                
                

            }

        </div>
    );

}

export default Display;