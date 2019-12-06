import moment from "moment";

const APP_ID = process.env.REACT_APP_APPID
  ? process.env.REACT_APP_APPID
  : "6cd3cf4d438d90102cedea6cb1ad1b22";
const API_URL = "http://api.openweathermap.org/data/2.5/";
const STATUS_OK = "200";

export const getWeather = async location =>
  await fetch(`${API_URL}weather?q=${location}&APPID=${APP_ID}&units=metric`)
    .then(res => res.json())
    .then(data => data)
    .catch(e => e);

export const getForecast = async location =>
  await fetch(`${API_URL}forecast?q=${location}&APPID=${APP_ID}&units=metric`)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== STATUS_OK) return data;

      const dates = data.list.reduce((acc, curr) => {
        if (
          moment(curr.dt_txt).format("YYYY-MM-DD") !==
          moment(acc.dt_txt).format("YYYY-MM-DD")
        ) {
          acc[moment(curr.dt_txt).format("YYYY-MM-DD")] = {
            day: 0,
            night: 0,
            humidity: 0
          };
        }
        return acc;
      }, {});

      Object.keys(dates).forEach(x => {
        const values = data.list.filter(
          d => moment(d.dt_txt).format("YYYY-MM-DD") === x
        );
        dates[x].day = values.reduce((prev, curr) =>
          prev.main.temp_max > curr.main.temp_max
            ? { weather: prev.weather, main: prev.main }
            : { weather: curr.weather, main: curr.main }
        );
        dates[x].night = values.reduce((prev, curr) =>
          prev.main.temp_min < curr.main.temp_min
            ? { weather: prev.weather, main: prev.main }
            : { weather: curr.weather, main: curr.main }
        );
        dates[x].humidity = values[0].main.humidity;
      });

      return dates;
    })
    .catch(e => e);
