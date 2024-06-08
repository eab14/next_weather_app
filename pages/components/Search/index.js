import { useState } from 'react';
import { useWeather } from '@/context/WeatherContext';
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
                <button type="submit">Search</button>
            </form>

        </div>
        
    );
};

export default Search;