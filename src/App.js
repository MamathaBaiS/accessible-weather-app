import React, { useState } from "react";
import axios from "axios";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a4a42be206fcd9806374982691099d6b`;

  const getWeatherTheme = (condition) => {
    if (!condition) return "theme-night";

    switch (condition.toLowerCase()) {
      case "clear":
        return "theme-sunny";
      case "clouds":
        return "theme-cloudy";
      case "rain":
      case "drizzle":
        return "theme-rainy";
      case "snow":
        return "theme-snowy";
      case "thunderstorm":
        return "theme-storm";
      default:
        return "theme-night";
    }
  };

  const fetchWeather = async (e) => {
    if (e.key === "Enter" && city.trim()) {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(url);
        setWeatherData(response.data);
      } catch {
        setError("City not found 🌍");
        setWeatherData(null);
      } finally {
        setLoading(false);
        setCity("");
      }
    }
  };

  return (
    <div
      className={`weather-app ${getWeatherTheme(
        weatherData?.weather?.[0]?.main,
      )}`}
    >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* ReactBits-style animated background */}
      <div className="galaxy-bg">
        <span className="orb orb-one"></span>
        <span className="orb orb-two"></span>
        <span className="orb orb-three"></span>
      </div>

      <nav className="search-box">
        <label htmlFor="city-input" className="sr-only">
          Search city
        </label>
        <input
          id="city-input"
          type="text"
          placeholder="Search city..."
          value={city}
          disabled={loading}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={fetchWeather}
          autoComplete="off"
        />
      </nav>

      <main id="main-content" className="weather-card fade-in" tabIndex="-1">
        {loading && (
          <p role="status" aria-live="polite">
            Loading weather…
          </p>
        )}

        {error && <p role="alert">{error}</p>}

        {weatherData && (
          <>
            <div className="weather-header">
              <p className="city-name">{weatherData.name}</p>
              <h1 className="temperature">
                {weatherData.main.temp.toFixed()}°C
              </h1>
              <p className="weather-type">{weatherData.weather[0].main}</p>
            </div>

            <div className="weather-stats">
              <div>
                <p className="stat-value">
                  {weatherData.main.feels_like.toFixed()}°C
                </p>
                <p>Feels Like</p>
              </div>

              <div>
                <p className="stat-value">{weatherData.main.humidity}%</p>
                <p>Humidity</p>
              </div>

              <div>
                <p className="stat-value">
                  {weatherData.wind.speed.toFixed()} m/s
                </p>
                <p>Wind</p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
