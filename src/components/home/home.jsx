import React from "react";
import FiveDaysWeather from "../fiveDaysWeather/fiveDaysWeather";
import TodayWeather from "../todayWeather/todayWeather";
import CitySelector from "../citySelector/citySelector";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { getWeather, getForecast } from "../../services/weather";
import "./home.scss";

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { city: "London", weather: {}, forecast: {} };
  }

  componentDidMount() {
    this.getWeatherData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.city !== prevState.city) {
      this.getWeatherData();
    }
  }

  async getWeatherData() {
    const weather = await getWeather(this.state.city);
    const forecast = await getForecast(this.state.city);

    this.setState({
      weather,
      forecast
    });
  }

  setCity(city) {
    if (city) {
      this.setState({ city });
    }
  }

  render() {
    return (
      <Container>
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} className="city-selector">
            <CitySelector setCity={this.setCity.bind(this)} />
          </Grid>
          <Grid item xs={12} className="main-weather">
            <TodayWeather weather={this.state.weather} />
          </Grid>
          <Grid item xs={12}>
            <FiveDaysWeather forecast={this.state.forecast} />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default HomeComponent;
