import { useEffect, useState } from 'react'
import styles from './Weather2.module.css';

function Weather2() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [date, setDate] = useState(new Date());
    const [error, setError] = useState();

    useEffect(() => {
        setDate(new Date());
    }, [weather]);

    const changeHandler = (event) => {
        setCity(event.target.value);
        setError();
    }

    const submitHandler = (e) => {
        e.preventDefault();

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e8246c734fecb9ed0f5162e44fa7618f`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response not ok")
                }
                return res.json();
            })
            .then((data) => {
                setWeather(data);
            })
            .catch((error) => {
                setError("Please enter correct city name");

            })
    }

    return (
        <div className={styles.container}>
            <form className={styles.search} onSubmit={submitHandler}>
                <h3>Weather</h3>
                <div>
                    <input type="text" value={city} onChange={changeHandler} />
                    <button type="submit">Search</button>
                    {error && <div style={{ color: "red", fontSize: "14px", paddingTop: "10px" }}>{error}</div>}
                </div>
            </form>

            {
                weather && (
                    <>
                        <div className={styles.content}>
                            <div className={styles.up}>
                                <h1>{weather.name}</h1>
                                <h3>{Math.round(weather.main.temp - 273.15)}°C</h3>
                                <h4 style={{ fontSize: "14px", color: "white" }}>{date.toDateString()}</h4>
                            </div>
                            <div style={{ marginBottom: "70px", display: "flex", flexDirection: "column-reverse", alignItems: "center", lineHeight: "2px" }}>
                                <h4 style={{ color: "white", fontSize: "14px" }}>{weather.weather[0].description}</h4>
                                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h4 style={{ color: "white", fontSize: "12px", paddingRight: "30px", opacity: 0.7 }}> Wind: {weather.wind.speed} m/s</h4>
                            <h4 style={{ color: "white", fontSize: "14px", opacity: 0.7 }}>💧 Hum: {weather.main.humidity}%</h4>
                        </div>
                    </>
                )}
        </div>
    )
}

export default Weather2;