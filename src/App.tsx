import Unites from "./Components/Unites";
import NavBar from "./Components/NavBar";
import Heading from "./Components/Heading";
import SearchBar from "./Components/SearchBar";
import CurrentWeather from "./Components/CurrentWeather";
import FeelsLike from "./Components/FeelsLike";
import Humidity from "./Components/Humidity";
import Wind from "./Components/Wind";
import Precipitation from "./Components/Precipitation";
import DailyForcast from "./Components/DailyForcast";
import HourlyContainer from "./Components/HourlyContainer";
import { useState } from "react";

function App() {
  const [city, setCity] = useState("Meerut");
  return (
    <>
      <div className=" d-flex justify-content-between">
        <NavBar />
        <Unites />
      </div>

      <Heading />

      <SearchBar city={city} setCity={setCity} />
      <div className="container">
        <div className="main-side">
          <CurrentWeather city={city} />
          <div className="flex">
            <FeelsLike />
            <Humidity />
            <Wind />
            <Precipitation />
          </div>

          <DailyForcast />
        </div>
        <div className="aside">
          <HourlyContainer />
        </div>
      </div>
    </>
  );
}

export default App;
