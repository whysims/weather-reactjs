import React from "react";
import FiveDaysWeather from "../fiveDaysWeather/fiveDaysWeather";
import TodayWeather from "../todayWeather/todayWeather";
import CitySelector from "../citySelector/citySelector";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import moment from "moment";
import StatisticsWeather from "../statisticsWeather/statisticsWeather";

const APP_ID = process.env.REACT_APP_APPID
  ? process.env.REACT_APP_APPID
  : "6cd3cf4d438d90102cedea6cb1ad1b22";
const API_URL = "http://api.openweathermap.org/data/2.5/";

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { city: "London", weather: {}, forecast: {}, realForecast: [] };
  }

  componentDidMount() {
    this.fetchWeather(this.state.city);
    this.fetchForecast(this.state.city);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.city !== prevState.city) {
      this.fetchWeather(this.state.city);
      this.fetchForecast(this.state.city);
    }
  }

  setCity(city) {
    this.setState({ city });
  }

  getMin() {
    const min = Object.keys(this.state.forecast).map(x => {
      return { y: this.state.forecast[x].night, x: x };
    });
    return min;
  }

  getMax() {
    const max = Object.keys(this.state.forecast).map(x => {
      return { y: this.state.forecast[x].day, x: x };
    });
    return max;
  }

  getMean() {
    const dates = this.state.realForecast.reduce((acc, curr) => {
      if (moment(curr.dt_txt).format("YYYY-MM-DD") !== moment(acc.dt_txt).format("YYYY-MM-DD")) {
        acc[moment(curr.dt_txt).format("YYYY-MM-DD")] = [];
      }

      return acc;
    }, {});

    this.state.realForecast.forEach(x => {
      const date = moment(x.dt_txt).format("YYYY-MM-DD");
      if (dates[date]) {
        dates[date].push(x);
      }
    });

    return Object.keys(dates).map(x => {
      const temperatures = dates[x].map(d => d.main.temp);
      const total = temperatures.reduce((acc, curr) => acc + curr);
      return { y: Math.floor(total / temperatures.length), x };
    });
  }

  getMode(id) {
    // most frequent
    // console.log("mode", this.state.main.temp_min);
  }

  getWeather() {
    return this.state.weather;
  }
  getForecast() {
    return this.state.forecast;
  }

  async fetchWeather(city) {
    await fetch(`${API_URL}weather?q=${city}&APPID=${APP_ID}&units=metric`)
      .then(res => res.json())
      .then(data => this.setState({ weather: data }))
      .catch(e => console.error(e));
  }

  async fetchForecast(city) {
    // cnt=5 here blocks by day and the api don't give options to get weather by day
    const result = await fetch(`${API_URL}forecast?q=${city}&APPID=${APP_ID}&units=metric`)
      .then(res => res.json())
      .then(data => {
        this.setState({ realForecast: data.list });
        const dates = data.list.reduce((acc, curr) => {
          if (
            moment(curr.dt_txt).format("YYYY-MM-DD") !== moment(acc.dt_txt).format("YYYY-MM-DD")
          ) {
            acc[moment(curr.dt_txt).format("YYYY-MM-DD")] = { day: 0, night: 0, humidity: 0 };
          }
          return acc;
        }, {});

        Object.keys(dates).forEach(x => {
          const values = data.list.filter(d => moment(d.dt_txt).format("YYYY-MM-DD") === x);
          dates[x].day = Math.max(...values.map(j => Math.floor(j.main.temp_max)));
          dates[x].night = Math.min(...values.map(j => Math.floor(j.main.temp_min)));
          dates[x].humidity = values[0].main.humidity;
        });

        this.setState({ forecast: dates });
        this.getMean();
      })

      .catch(e => console.error(e));
    return result;
  }

  render() {
    return (
      <Container>
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12}>
            <CitySelector setCity={this.setCity.bind(this)} />
          </Grid>
          <Grid item xs={6}>
            <TodayWeather weather={this.state.weather} />
          </Grid>
          <Grid item xs={6}>
            <FiveDaysWeather forecast={this.state.forecast} />
          </Grid>
          <Grid item xs={12}>
            <StatisticsWeather
              getMin={this.getMin.bind(this)}
              getMax={this.getMax.bind(this)}
              getMean={this.getMean.bind(this)}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default HomeComponent;
