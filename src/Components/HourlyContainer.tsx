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
import axios from "axios";
import { useEffect, useState } from "react";

const params = {
  latitude: [28.98, 28.6519, 28.58, 19.0728, 30.7363],
  longitude: [77.7064, 77.2315, 77.33, 72.8826, 76.7884],
  daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
  hourly: ["temperature_2m", "weather_code"],
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

const HourlyContainer = () => {
  const [hourlyData, setHourlyData] = useState<any>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [showDays, setShowDays] = useState(false);

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
          hourly: ["temperature_2m", "weather_code"],
        },
      })
      .then((res) => {
        setHourlyData(res.data.hourly);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="hourly-container">
        <div className="hourly-nav">
          <p>Hourly Forecast</p>

          <button
            className="collapsible"
            onClick={() => setShowDays(!showDays)}
          >
            Select Day
          </button>

          {showDays && (
            <div className="day-btn-container">
              {[
                "Today",
                "Tomorrow",
                "Saturday",
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
              ].map((day, index) => (
                <button
                  onClick={() => setSelectedDay(index)}
                  key={index}
                  className={selectedDay === index ? "Active-day" : "day-btn"}
                >
                  {day}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="temp-card">
          {hourlyData?.time
            .slice(selectedDay * 24, selectedDay * 24 + 24)
            .map((time: string, index: number) => (
              <div className="hourly-card">
                <div className="icon-time">
                  <p>
                    {new Date(time).toLocaleTimeString("en-US", {
                      hour: "numeric",
                    })}
                  </p>
                  <div className="icon">
                    {weatherIcon(
                      hourlyData.weather_code[selectedDay * 24 + index],
                    )}
                  </div>
                </div>
                <p className="temperature">
                  {hourlyData.temperature_2m[selectedDay * 24 + index]}°
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default HourlyContainer;
