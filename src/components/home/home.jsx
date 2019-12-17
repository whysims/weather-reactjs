import React, { Fragment } from "react";
import FiveDaysWeather from "../fiveDaysWeather/fiveDaysWeather";
import TodayWeather from "../todayWeather/todayWeather";
import CitySelector from "../citySelector/citySelector";
import Grid from "@material-ui/core/Grid";
import ErrorMessage from "../errorMessage/errorMessage";
import { getWeather, getForecast, getPlacePhoto } from "../../services/weather";
import { ERROR_404 } from "../../common/const";
import "./home.scss";

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "London",
      weather: {},
      forecast: {},
      error: {},
      scroll: false
    };
  }

  componentDidMount() {
    this.getWeatherData();

    window.addEventListener("scroll", () => {
      let scroll = true;
      if (window.scrollY === 0) {
        scroll = false;
      }
      this.setState({ scroll });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.city !== prevState.city) {
      this.getWeatherData();
    }
  }

  async getWeatherData() {
    const weather = await getWeather(this.state.city);
    const forecast = await getForecast(this.state.city);
    const placePhoto = await getPlacePhoto(this.state.city);
    weather.placeImage = placePhoto ? placePhoto.urls.regular : "";

    if ((weather.cod || forecast.cod) === ERROR_404) {
      this.setState({ error: weather || forecast, weather: {}, forecast: {} });
      return;
    }

    this.setState({
      weather,
      forecast,
      error: {}
    });
  }

  setCity(city) {
    if (city) {
      this.setState({ city });
    }
  }

  render() {
    const { scroll, weather, forecast, error } = this.state;
    return (
      <Fragment>
        <Grid container alignItems="stretch">
          <Grid
            item
            xs={12}
            className="main-weather"
            style={{
              backgroundImage: `url(${this.state.weather.placeImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <CitySelector setCity={this.setCity.bind(this)} scroll={scroll} />
            <TodayWeather weather={weather} scroll={scroll} />
            <section
              className={`scroll-down ${scroll || !!error.cod ? "active" : ""}`}
            >
              <i>
                <span></span>
              </i>
            </section>
          </Grid>
          <Grid item xs={12}>
            <FiveDaysWeather forecast={forecast} scroll={scroll} />
          </Grid>
        </Grid>
        {error.message && <ErrorMessage message={error.message} />}
      </Fragment>
    );
  }
}

export default HomeComponent;
