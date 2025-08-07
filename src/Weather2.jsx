import { useEffect, useState } from 'react'
import styles from './Weather2.module.css';

function Weather2() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [date, setDate] = useState(new Date());
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setDate(new Date());
    }, [weather]);

    const changeHandler = (event) => {
        setCity(event.target.value);
        setError();
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (!city.trim()) {
            setError("Please enter a city name");
            return;
        }
        setLoading(true);
        setError();

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e8246c734fecb9ed0f5162e44fa7618f&units=metric`)
    .then((res) => {
        if (!res.ok) {
            throw new Error("City not found");
        }
        return res.json();
    })
    .then((data) => {
        setWeather(data);
        setCity(""); // پاک کردن ورودی بعد از جستجو موفق
        setLoading(false);
    })
    .catch((error) => {
        setError("City not found or network error");
        setLoading(false);
    })
    }

    return (
        <div className={styles.container}>
            <form className={styles.search} onSubmit={submitHandler}>
                <h3>Weather</h3>
                <div>
                    <input type="text" value={city} onChange={changeHandler} />
                    <button type="submit" disabled={loading}>Search</button>
                    {error && <div style={{ color: "red", fontSize: "14px", paddingTop: "10px" }}>{error}</div>}
                </div>
            </form>

            {loading && <div style={{ color: "white", padding: "10px" }}>Loading...</div>}

            {
                weather && !loading && (
                    <>
                        <div className={styles.content}>
                            <div className={styles.up}>
                                <h1>{weather.name}</h1>
                                <h3>{Math.round(weather.main.temp)}°C</h3>
                                <h4 style={{ fontSize: "14px", color: "white" }}>{date.toDateString()}</h4>
                            </div>
                            <div style={{ marginBottom: "70px", display: "flex", flexDirection: "column-reverse", alignItems: "center", lineHeight: "2px" }}>
                                <h4 style={{ color: "white", fontSize: "14px" }}>{weather.weather[0].description}</h4>
                                <img
                                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                    alt="weather icon"
                                />
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