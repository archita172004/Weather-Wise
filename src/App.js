import { useState, useEffect } from "react";
import axios from "axios";
import ErrorMessage from "./components/Error";
import Loader from "./components/Loader";
import WeatherDetails from "./components/WeatherDetails";
import "./index.css";
import { CiSearch } from "react-icons/ci";
import Currentdate from "./components/date";
import Currenticons from "./components/Currenticons";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const API_KEY = "53b703770b27293f0a582056cd5b4883";

  async function getPosition() {
    if (location.trim().length < 2) {
      setWeatherData(null);
      return;
    }
    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      );
      const data = await res.json();

      if (!data.results || data.results.length === 0) {
        throw new Error("Location not found");
      }

      const { latitude: lat, longitude: lon } = data.results[0];
      getWeather(lat, lon);
    } catch (err) {
      console.error(err.message);
      setError("Failed to fetch location");
    } finally {
      setLoading(false);
    }
  }

  async function getWeather(lat, lon) {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      console.log(res);
      if (!res.data) {
        throw new Error("Weather data not found");
      }

      setWeatherData(res.data);
    } catch (err) {
      console.error(err.message);
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (location.trim().length > 1) {
      getPosition();
    }
  }, [location]);

  function handleSearchChange(e) {
    setQuery(e.target.value);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    setLocation(query);
    setQuery("");
  }

  const temperature =
    weatherData && weatherData.main
      ? Math.round(weatherData.main.temp - 273)
      : null;

  return (
    <div className="App flex items-center justify-center h-screen w-screen ">
      <div className=" m-4  flex flex-row gap-10 h-4/5 shadow-lg shadow-blue-200/50 ">
        <div className="relative mt-4">
          <form onSubmit={handleSearchSubmit}>
            <section className="p-2 mt-2 bg-white rounded-lg  ">
              <input
                className="px-6 border-none focus:outline-none "
                type="text"
                placeholder="Enter location"
                value={query}
                onChange={handleSearchChange}
              />
              <button>
                <CiSearch />
              </button>
            </section>
          </form>
          <div className="m-8 py-10 flex items-center justify-center  ">
            <Currenticons
              weatherData={weatherData}
              className="text-gray-800 text-4xl"
            />
          </div>

          <div className=" font-semibold text-gray-800 float-right absolute bottom-2 right-2 ">
            {temperature !== null && (
              <p className="text-9xl">
                {temperature}°<span className="text-6xl">C</span>
              </p>
            )}
            {temperature !== null && (
              <div className="font-semibold text-gray-800 flex items-center justify-center">
                <Currentdate />
              </div>
            )}
          </div>
        </div>
        <div className="bg-slate-600/30 ">
          {loading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {weatherData && <WeatherDetails weatherData={weatherData} />}
        </div>
      </div>
    </div>
  );
}
