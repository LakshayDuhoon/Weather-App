import React, { useEffect, useState } from "react";
import axios from "axios";

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

const FeelsLike = () => {
  const [feels, setFeels] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.open-meteo.com/v1/forecast", {
        params: {
          latitude: 28.98,
          longitude: 77.7064,
          current: ["apparent_temperature"],
        },
      })
      .then((res) => setFeels(res.data.current.apparent_temperature));
  }, []);

  return (
    <>
      <div className="feel-cont">
        <p className="feels">Feels Like</p>
        <h5>{feels}°</h5>
      </div>
    </>
  );
};

export default FeelsLike;
