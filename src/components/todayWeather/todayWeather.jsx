import React from "react";
import CardContent from "@material-ui/core/CardContent";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const TodayWeather = props => {
  return (
    <CardContent className="weather-card">
      {props.weather && props.weather.main && (
        <div>
          <LocationOnIcon />
          <h2>{props.weather.name}</h2>

          <h3>{props.weather.main.temp}</h3>
          <h5>
            Min: {props.weather.main.temp_min} - Max: {props.weather.main.temp_max} - Humidity:
            {props.weather.main.humidity}
          </h5>
        </div>
      )}
    </CardContent>
  );
};

export default TodayWeather;
