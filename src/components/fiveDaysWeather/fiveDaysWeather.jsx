import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import "./fivedaysweather.scss";
import { ERROR_404 } from "../../common/const";

const WEATHER_ICON_URL = "http://openweathermap.org/img/wn/";
const FiveDaysWeather = props => {
  return (
    <Fragment>
      {props.forecast && props.forecast.cod !== ERROR_404 ? (
        <Grid container className="forecast__container" alignItems="stretch">
          {Object.keys(props.forecast)
            .sort((a, b) => moment(a).valueOf() - moment(b).valueOf())
            .map(x => (
              <Grid item className="forecast__day" xs key={x}>
                {moment(x).format("ddd, DD")}
                <br />
                <img
                  src={`${WEATHER_ICON_URL}${props.forecast[x].day.weather[0].icon}.png`}
                />
                <br />
                {props.forecast[x].day.main.temp_max} °C
                <br />
                {props.forecast[x].night.main.temp_min} °C
                <br />
                {props.forecast[x].humidity}%
              </Grid>
            ))}
        </Grid>
      ) : (
        <h2>No data available: {props.forecast.message}</h2>
      )}
    </Fragment>
  );
};

export default FiveDaysWeather;
