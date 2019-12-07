import React, { Fragment } from "react";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { animations } from "react-animation";
import { ERROR_404 } from "../../common/const";
import "./todayWeather.scss";
import "react-animation/dist/keyframes.css";

const TodayWeather = props => {
  return (
    <Fragment>
      {props.weather &&
      props.weather.cod !== ERROR_404 &&
      props.weather.main ? (
        <div className="weather-city">
          <LocationOnIcon
            className={"weather-city--icon"}
            style={{ animation: animations.bounceIn }}
          />

          <h2 className={"weather-city--name"}>
            {props.weather.name}, {props.weather.sys.country}
          </h2>
          <i
            className={`wi wi-owm-${props.weather.weather[0].id} weather-icon`}
          ></i>
          <h3 className={"weather-city--temp"}>
            {props.weather.main.temp}
            <span>°C</span>
          </h3>
          <h5 className={"weather-city--temp-breakdown"}>
            <span className="min">Min: {props.weather.main.temp_min} °C</span>
            <span className="max">Max: {props.weather.main.temp_max} °C</span>
            <span className="hum">
              Humidity: {props.weather.main.humidity}%
            </span>
          </h5>
        </div>
      ) : (
        <h2>No data available: {props.weather.message}</h2>
      )}
    </Fragment>
  );
};

export default TodayWeather;
