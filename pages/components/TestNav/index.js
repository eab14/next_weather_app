import styles from './TestNav.module.css';
const { useBG } = require("@/context/BackgroundContext")

const TestNav = () => {

    const { addRain, addSnow, addThunderstorm } = useBG();

    return (
        <>
            <nav className={styles.test_nav}>
                <button onClick={() => addRain("moderate rain")}>Add Rain</button>
                <button onClick={addSnow}>Add Snow</button>
                <button onClick={addThunderstorm}>Add Thunderstorm</button>
            </nav>
        </>
    )

}

export default TestNav;