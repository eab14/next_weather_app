import { useState } from 'react';
import { useWeather } from '@/context/WeatherContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import styles from './Search.module.css';

const Search = () => {

    const [search, setSearch ] = useState('');
    const { getBySearch } = useWeather();

    const handleSubmit = (e) => { e.preventDefault(); getBySearch(search); };
    const handleChange = (e) => setSearch(e.target.value);

    return (

        <div className={styles.search_spacer}>

            <form onSubmit={handleSubmit}>
                <input type="search" placeholder="Enter city..." value={search} onChange={handleChange} />
                <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
            </form>

        </div>
        
    );
};

export default Search;