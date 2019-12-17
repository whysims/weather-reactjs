import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import "./fiveDaysWeather.scss";

const FiveDaysWeather = props => {
  const { forecast, scroll } = props;

  return (
    <Fragment>
      {forecast && Object.keys(forecast).length !== 0 && (
        <Grid
          container
          className={
            scroll ? "forecast__container active" : "forecast__container"
          }
          alignItems="stretch"
        >
          {Object.keys(forecast)
            .sort((a, b) => moment(a).valueOf() - moment(b).valueOf())
            .map(x => (
              <Grid item className="forecast__day" xs key={x}>
                <h5>{moment(x).format("ddd, DD")}</h5>
                <br />
                <i
                  className={`wi wi-owm-${forecast[x].day.weather[0].id} forecast-icon`}
                ></i>
                <br />
                {forecast[x].day.main.temp_max} °C
                <br />
                {forecast[x].night.main.temp_min} °C
                <br />
                {forecast[x].humidity}%
              </Grid>
            ))}
        </Grid>
      )}
    </Fragment>
  );
};

export default FiveDaysWeather;
