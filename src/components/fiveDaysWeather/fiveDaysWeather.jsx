import React from "react";
import CardContent from "@material-ui/core/CardContent";
import CloudIcon from "@material-ui/icons/Cloud";
import moment from "moment";

const FiveDaysWeather = props => {
  return (
    <CardContent className="weather-card">
      <CloudIcon />
      <h2>Five Days Forecast</h2>
      {props.forecast && (
        <ul className="forecast-list">
          {Object.keys(props.forecast)
            .sort((a, b) => moment(a).valueOf() - moment(b).valueOf())
            .map(x => (
              <li key={x}>
                {moment(x).format("ddd, DD MMM YY")}
                <span>
                  <b>Min</b> {props.forecast[x].night} <b>Max</b> {props.forecast[x].day}{" "}
                  <b>Humidity:</b> {props.forecast[x].humidity}
                </span>
              </li>
            ))}
        </ul>
      )}
    </CardContent>
  );
};

export default FiveDaysWeather;
