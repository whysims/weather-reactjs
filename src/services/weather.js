import moment from "moment";

const APP_ID = process.env.REACT_APP_APPID
  ? process.env.REACT_APP_APPID
  : "6cd3cf4d438d90102cedea6cb1ad1b22";
const API_URL = "https://api.openweathermap.org/data/2.5/";
const STATUS_OK = "200";

const formatDate = date => moment(date).format("YYYY-MM-DD");

const getDatesFromList = list =>
  list.reduce((acc, curr) => {
    if (formatDate(curr.dt_txt) !== formatDate(acc.dt_txt)) {
      acc[formatDate(curr.dt_txt)] = {
        day: 0,
        night: 0,
        humidity: 0
      };
    }
    return acc;
  }, {});

const getMaxTemperature = values =>
  values.reduce((prev, curr) =>
    prev.main.temp_max > curr.main.temp_max
      ? { weather: prev.weather, main: prev.main }
      : { weather: curr.weather, main: curr.main }
  );

const getMinTemperature = values =>
  values.reduce((prev, curr) =>
    prev.main.temp_min < curr.main.temp_min
      ? { weather: prev.weather, main: prev.main }
      : { weather: curr.weather, main: curr.main }
  );

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

      const dates = getDatesFromList(data.list);

      Object.keys(dates).forEach(x => {
        const values = data.list.filter(d => formatDate(d.dt_txt) === x);
        dates[x].day = getMaxTemperature(values);
        dates[x].night = getMinTemperature(values);
        dates[x].humidity = values[0].main.humidity;
      });

      return dates;
    })
    .catch(e => e);
