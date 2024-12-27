import React from "react";
import weatherImage from "./weather-app.png";
import { CiCloudDrizzle } from "react-icons/ci";
import { RiMistFill } from "react-icons/ri";
import { WiCloudy } from "react-icons/wi";
import { BsCloudHaze2 } from "react-icons/bs";
import { IoIosSnow } from "react-icons/io";
import { FiSun } from "react-icons/fi";
import { IoThunderstormOutline } from "react-icons/io5";
import { PiCloudFog } from "react-icons/pi";
import { GiDustCloud } from "react-icons/gi";

const Currenticons = ({ weatherData }) => {
  if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
    return (
      <div className="text-3xl text-gray-800 shadow-sm hover:shadow-lg p-4">
        <img src={weatherImage} alt="icon" className="h-24 w-24 "></img>
        Weather Wise
      </div>
    );
  }
  let icons = weatherData.weather[0].main;
  console.log(icons);

  switch (icons) {
    case "Rain":
      icons = <CiCloudDrizzle className="h-28 w-28 text-gray-800" />;
      break;
    case "Clouds":
      icons = <WiCloudy className="h-32 w-32 text-gray-800" />;
      break;
    case "Haze":
      icons = <BsCloudHaze2 className="h-32 w-32 text-gray-800" />;
      break;
    case "Snow":
      icons = <IoIosSnow className="h-32 w-32 text-gray-800" />;
      break;
    case "Clear":
      icons = <FiSun className="h-32 w-32 text-gray-800" />;
      break;
    case "Thunderstorm":
      icons = <IoThunderstormOutline className="h-32 w-32 text-gray-800" />;
      break;
    case "Fog":
      icons = <PiCloudFog className="h-32 w-32 text-gray-800" />;
      break;
    case "Mist":
      icons = <RiMistFill className="h-32 w-32 text-gray-800" />;
      break;
    case "Dust":
      icons = <GiDustCloud className="h-32 w-32 text-gray-800" />;
      break;
    default:
      <div></div>;
  }
  console.log(icons);

  return <div className="text-4xl text-gray-800">{icons}</div>;
};

export default Currenticons;
