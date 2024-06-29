import { useEffect, useRef, useState } from 'react';
import { useWeather } from '@/context/WeatherContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { gsap } from 'gsap';

import styles from './Search.module.css';

const Search = () => {

    const listRef = useRef(null);

    const [ search, setSearch ] = useState('');
    const [ searchList, setSearchList ] = useState([]);
    const [ focused, setFocused ] = useState(false);

    const { getBySearch, getById, weatherList, setWeatherData, clearHistory } = useWeather();

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (/^[0-9]+$/.test(search)) await getById(search);
        else await getBySearch(search); 
        
        document.activeElement.blur(); 
        setSearch('');

    };
    const handleChange = (e) => setSearch(e.target.value);

    useEffect(() => {

        const lines = (listRef.current) ? listRef.current.querySelectorAll("div") : null;

        if (listRef.current && focused) {

            gsap.to(listRef.current, { opacity: 1, duration: 0.4 });

            let offset = 0.15

            for (let i = 0; i < lines.length; i++) {

                gsap.to(lines[i], { delay: offset, left: 0, opacity: 1, duration: 0.3 })
                offset += 0.08;

            }
            
        }

        else { 

            gsap.to(listRef.current, { opacity: 0, duration: 0 });
            gsap.to([ lines ], { opacity: 0, left: "30px", duration: 0 })

        }

    }, [ focused ])

    useEffect(() => setSearchList(weatherList.slice(-4)), [ weatherList ]);

    return (

        <div className={styles.search_spacer}>

            <div className={styles.search_error_icon}></div>
            <div className={styles.search_error_message}></div>

            <form onSubmit={handleSubmit}>
                <input type="search" placeholder="Enter city..." value={search} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChange={handleChange} />
                <span className={styles.search_accent}></span>
                <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
            </form>

            <div ref={listRef} className={styles.search_list}>

                {
                    searchList &&

                        searchList.map((data, index) => <div key={index} className={styles.search_list_line} onClick={() => setWeatherData(data)}>{data.name}, {data.sys.country}<span>{data.id}</span></div>)
                }

                <div key={"history"} className={styles.search_list_line + " " + styles.close} onClick={clearHistory}>Clear History</div>

            </div>

        </div>
        
    );
};

export default Search;