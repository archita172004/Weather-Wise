function WeatherDetails({ weatherData }) {
  const temperature = weatherData.main
    ? Math.round(weatherData.main.temp - 273)
    : "N/A";
  const weather =
    weatherData.weather && weatherData.weather[0]
      ? weatherData.weather[0].main
      : "N/A";
  const humidity = weatherData.main?.humidity || "N/A";
  const visibility = weatherData.visibility || "N/A";
  const windSpeed = weatherData.wind?.speed || "N/A";

  return (
    <div className="p-5 m-10">
      <div className=" p-5 m-10 text-5xl font-bold text-gray-800">
        <p>{weatherData.name || "Unknown Location"}</p>
      </div>
      <div className="flex flex-row justify-between border-b-2 border-gray-300 py-2">
        <p>Temperature </p> <p> {temperature}°C</p>
      </div>
      <div className="flex flex-row justify-between border-b-2 border-gray-300 py-2">
        <p>Weather</p> <p> {weather}</p>
      </div>
      <div className="flex flex-row justify-between border-b-2 border-gray-300 py-2">
        <p>Humidity</p> <p> {humidity}%</p>
      </div>
      <div className="flex flex-row justify-between border-b-2 border-gray-300 py-2">
        <p>Visibility</p> <p> {visibility}m</p>
      </div>
      <div className="flex flex-row justify-between border-b-2 border-gray-300 py-2">
        <p>Wind Speed</p> <p> {windSpeed} m/s</p>
      </div>
    </div>
  );
}

export default WeatherDetails;
