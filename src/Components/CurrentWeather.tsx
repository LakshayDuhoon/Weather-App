import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchWeatherApi } from "openmeteo";
import sunnyIcon from "../Images/icon-sunny.webp";

const params = {
  latitude: [28.98, 28.6519, 28.58, 19.0728, 30.7363],
  longitude: [77.7064, 77.2315, 77.33, 72.8826, 76.7884],
  daily: ["temperature_2m_max", "temperature_2m_min"],
  hourly: "temperature_2m",
  current: [
    "temperature_2m",
    "relative_humidity_2m",
    "wind_speed_10m",
    "precipitation",
    "apparent_temperature",
  ],
  timezone: "Asia/Singapore",
  start_date: "2026-05-19",
  end_date: "2026-05-25",
};

const CurrentWeather = ({ city }) => {
  const [temp, setTemp] = useState(null);

  const [locationName, setLocationName] = useState("");

  const date = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const searchWeather = async () => {
    try {
      const geoResponse = await axios.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        {
          params: {
            name: city,
            count: 1,
          },
        },
      );
      const place = geoResponse.data.results[0];
      const longitude = place.longitude;
      const latitude = place.latitude;

      setLocationName(`${place.name}, ${place.country}`);

      const setWeather = await axios.get(
        "https://api.open-meteo.com/v1/forecast",
        {
          params: {
            latitude: latitude,
            longitude: longitude,
            current: ["temperature_2m"],
          },
        },
      );

      setTemp(setWeather.data.current.temperature_2m);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchWeather();
  }, [city]);

  return (
    <>
      <div className=" p-3 today-weather-container ">
        <div>
          <h2 className="location">{locationName}</h2>
          <p className="date">{date}</p>
        </div>
        <div className="temp">
          <img src={sunnyIcon} className="sunny" alt="" />
          <h1>{temp}°</h1>
        </div>
      </div>
    </>
  );
};

export default CurrentWeather;
