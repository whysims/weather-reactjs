import React, { Fragment } from "react";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { animations } from "react-animation";
import "./todayWeather.scss";
import "react-animation/dist/keyframes.css";

const TodayWeather = props => {
  const { weather, scroll } = props;
  return (
    <Fragment>
      {weather && weather.main && (
        <div className={scroll ? "weather-city active" : "weather-city"}>
          <LocationOnIcon
            className={"weather-city--icon"}
            style={{ animation: animations.bounceIn }}
          />
          <h2 className={"weather-city--name"}>
            {weather.name}, {weather.sys.country}
          </h2>
          <i className={`wi wi-owm-${weather.weather[0].id} weather-icon`}></i>
          <h3 className={"weather-city--temp"}>
            {weather.main.temp}
            <span>°C</span>
          </h3>
          <h5 className={"weather-city--temp-breakdown"}>
            <span className="min">Min: {weather.main.temp_min} °C</span>
            <span className="max">Max: {weather.main.temp_max} °C</span>
            <span className="hum">Humidity: {weather.main.humidity}%</span>
          </h5>
        </div>
      )}
    </Fragment>
  );
};

export default TodayWeather;
