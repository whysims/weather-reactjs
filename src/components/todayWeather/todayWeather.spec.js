import React from "react";
import { mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import TodayWeather from "./todayWeather";

Enzyme.configure({ adapter: new Adapter() });

const mockTodayWeather = {
  coord: { lon: -0.13, lat: 51.51 },
  weather: [
    { id: 803, main: "Clouds", description: "broken clouds", icon: "04d" }
  ],
  base: "stations",
  main: {
    temp: 12.06,
    pressure: 1003,
    humidity: 93,
    temp_min: 11,
    temp_max: 13.33
  },
  visibility: 10000,
  wind: { speed: 8.2, deg: 240, gust: 13.4 },
  clouds: { all: 75 },
  dt: 1575639992,
  sys: {
    type: 1,
    id: 1412,
    country: "GB",
    sunrise: 1575618608,
    sunset: 1575647580
  },
  timezone: 0,
  id: 2643743,
  name: "London",
  cod: 200
};

describe("Start testing the TodayWeather Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<TodayWeather weather={mockTodayWeather} />);
  });

  it("Should render the TodayWeather Component", () => {
    expect(wrapper.find(".weather-city--name").text()).toBe("London, GB");
  });
});
