// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
// import ReactAnimatedWeather from "react-animated-weather";
import axios from "axios";

export default function App() {
  const [weatherData, setWeatherData] = useState("delhi");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const key = "53b703770b27293f0a582056cd5b4883";

  // const getPosition = (options) => {
  // return new Promise(function (resolve, reject) {
  // navigator.geolocation.getCurrentPosition(resolve, reject, options);
  // });
  // };

  // function handleChange(e) {
  //   const { value } = e.target.value;
  //   setLocation(value);
  //   setQuery(e.target.value);
  // }

  async function getPosition() {
    if (location.length < 2) {
      setWeatherData("");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      );
      const data = await res.json();
      console.log(data);
      if (!data.results) throw new Error("location not found");
      const { lat, lon } = data.results[0].geometry;
      getWeather(lat, lon);
    } catch (err) {
      console.error(err);
      setError(err);
      setLoading(false);
    }
  }

  // getPosition();

  // useEffect(function () {
  async function getWeather(lat, lon) {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`,
        { timeout: 10000 }
      );

      // if (!res.ok) throw new Error("something went wrong ");
      console.log(res.data);
      // const data = res.json();
      // console.log(data);
      // if (res.data.Response === "False") throw new Error("Not Found");

      setWeatherData(res.data);
      console.log(res.data.name);
      console.log(res.data.main.temp);
      // console.log(data.base);
      // console.log(data.Search);
    } catch (error) {
      console.log(error);
      console.error("something went wrong");
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  // if (navigator.geolocation) {
  //   console.log(navigator.geolocation);
  //   // getPosition().then(
  //   navigator.geolocation.getCurrentPosition(
  //     (position) =>
  //       getWeather(position.coords.latitude, position.coords.longitude),
  //     // )
  //     (error) => {
  //       console.error("Error getting geolocation:", error);
  //       setLoading(false);
  //       alert(
  //         "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather.",
  //       );
  //     },
  //   );
  // } else {
  //   alert("Geolocation not available");
  //   setLoading(false);
  // }
  // const timerID = setInterval(() => {
  //   getWeather();
  // }, 600000);
  // return () => {
  //   clearInterval(timerID);
  // };

  useEffect(
    function () {
      if (location.length > 1) {
        getPosition(location);
      }
    },
    [location]
  );
  function handleSearchChange(e) {
    setQuery(e.target.value);
  }
  function handleSearchSubmit(e) {
    e.preventDefault();
    setLocation(query);
    setQuery("");
  }

  return (
    <div className="App">
      {loading ? (
        <Loader />
      ) : (
        weatherData && (
          <Current
            loading={loading}
            query={query}
            weatherData={weatherData}
            setQuery={setQuery}
            onChangeLocation={handleSearchChange}
          />
        )
      )}
    </div>
  );
}

function Temp({ weatherData }) {
  return (
    <p className="temp">
      {Math.round(weatherData.main.temp - 273)}
      &deg;c
    </p>
  );
}

function Current({ loading, weatherData, query, setQuery, onChangeLocation }) {
  return (
    <div className="title">
      {loading ? (
        <Loader />
      ) : (
        weatherData && (
          <SidePanel
            query={query}
            setQuery={setQuery}
            weatherData={weatherData}
            onChangeLocation={onChangeLocation}
          />
        )
      )}
      <RightPanel weatherData={weatherData} />
    </div>
  );
}

function RightPanel({ weatherData }) {
  return (
    <div className="right">
      <h2 className="city">
        {weatherData.name}
        {console.log(weatherData.name)}
      </h2>
      {/* <h5>IN</h5> */}

      {/* <DateTime /> */}

      <Temp weatherData={weatherData} />
    </div>
  );
}

// function DateTime() {
//   return <div>DATE</div>;
// }

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔ </span>
      {message}
    </p>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function SidePanel({ weatherData, query, onChangeLocation, setQuery }) {
  return (
    <div
      className="container"
      // style={{ backgroundColor: " rgba(0, 0, 0, 0.5)" }}
    >
      <p className="icon"></p>
      <p className="weather">{weatherData.weather[0].main}</p>
      <hr className="hr1"></hr>
      {/* <form></form> */}

      {/* <input type="text" placeholder="Search any city"></input> */}
      {/* <FontAwesomeIcon icon={faSearch} /> */}
      {/* <div className="img-box">
            
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              //onClick={search}
              alt="search-icon"
            />
          </div> */}

      {/* <hr className="hr2"></hr> */}

      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Search any city"
          value={query}
          // onChange={(e) => setQuery(e.target.value)}
          onChange={onChangeLocation}
        />
        <div className="img-box">
          <img
            src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
            alt="search-icon"
          />
        </div>
      </div>

      <ul className="results">
        <li>
          <span className="temperature">
            <p>Temperature</p>
            <p>{Math.round(weatherData.main.temp - 273)}&deg;c</p>
          </span>
        </li>
        <hr className="hr-t" />
        <li>
          <span className="humidity">
            <p>Humidity</p>
            <p>{weatherData.main.humidity}% </p>
          </span>
        </li>
        <hr className="hr-h" />
        <li>
          <span className="visibility">
            <p>Visibility</p>
            <p>{weatherData.visibility}m</p>
          </span>
        </li>
        <hr className="hr-v" />
        <li>
          <span className="speed">
            <p>WindSpeed</p>
            <p>{weatherData.wind.speed}m/s</p>
          </span>
        </li>
        <hr className="hr-w" />
      </ul>
    </div>
  );
}
