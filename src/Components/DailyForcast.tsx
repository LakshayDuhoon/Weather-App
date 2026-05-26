import React, { useEffect, useState } from "react";
import axios from "axios";
import { fetchWeatherApi } from "openmeteo";
import sunnyIcon from "../Images/icon-sunny.webp";
import { img } from "framer-motion/client";

import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiThunderstorm,
  WiSnow,
} from "react-icons/wi";

const params = {
  latitude: [28.98, 28.6519, 28.58, 19.0728, 30.7363],
  longitude: [77.7064, 77.2315, 77.33, 72.8826, 76.7884],
  daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
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

const DailyForcast = () => {
  const [dailyData, setDailyData] = useState<any>(null);

  const weatherIcon = (code: number) => {
    if (code === 0) {
      return <WiDaySunny size={40} color="gold" />;
    }
    if ([1, 2, 3].includes(code)) {
      return <WiCloudy size={40} color="white" />;
    }
    if ([51, 53, 55, 61, 63, 65].includes(code)) {
      return <WiRain size={40} color="skyblue" />;
    }
    if ([95, 96, 99].includes(code)) {
      return <WiThunderstorm size={40} color="yellow" />;
    }
    if ([71, 73, 75].includes(code)) {
      return <WiSnow size={40} color="white" />;
    }
    return <WiCloudy size={40} />;
  };

  useEffect(() => {
    axios
      .get("https://api.open-meteo.com/v1/forecast", {
        params: {
          latitude: 28.98,
          longitude: 77.7064,
          daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
        },
      })
      .then((res) => {
        setDailyData(res.data.daily);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <p className="daily-heading">Daily Forecast</p>
      <div className="daily-container">
        {dailyData?.time.map((day: string, index: number) => (
          <div className="daily-card" key={index}>
            <h3 className="card-heading">
              {new Date(day).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </h3>

            <div>{weatherIcon(dailyData.weather_code[index])}</div>

            <div className="temp">
              <span>{dailyData.temperature_2m_max[index]}°</span>
              <span>{dailyData.temperature_2m_min[index]}°</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DailyForcast;
