import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FiveDaysWeather from "./fiveDaysWeather";

Enzyme.configure({ adapter: new Adapter() });

const mockForecast = {
  "2019-12-07": {
    day: {
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01d" }
      ],
      main: {
        temp: 9.39,
        temp_min: 9.39,
        temp_max: 9.39,
        pressure: 1013,
        sea_level: 1013,
        grnd_level: 1009,
        humidity: 76,
        temp_kf: 0
      }
    },
    night: {
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01d" }
      ],
      main: {
        temp: 6.76,
        temp_min: 6.76,
        temp_max: 6.76,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 1010,
        humidity: 87,
        temp_kf: 0
      }
    },
    humidity: 81
  },
  "2019-12-08": {
    day: {
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10n" }
      ],
      main: {
        temp: 12.71,
        temp_min: 12.71,
        temp_max: 12.71,
        pressure: 1000,
        sea_level: 1000,
        grnd_level: 995,
        humidity: 90,
        temp_kf: 0
      }
    },
    night: {
      weather: [
        { id: 803, main: "Clouds", description: "broken clouds", icon: "04n" }
      ],
      main: {
        temp: 7.3,
        temp_min: 7.3,
        temp_max: 7.3,
        pressure: 996,
        sea_level: 996,
        grnd_level: 992,
        humidity: 66,
        temp_kf: 0
      }
    },
    humidity: 88
  },
  "2019-12-09": {
    day: {
      weather: [
        {
          id: 802,
          main: "Clouds",
          description: "scattered clouds",
          icon: "03d"
        }
      ],
      main: {
        temp: 8.87,
        temp_min: 8.87,
        temp_max: 8.87,
        pressure: 1004,
        sea_level: 1004,
        grnd_level: 1000,
        humidity: 58,
        temp_kf: 0
      }
    },
    night: {
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01n" }
      ],
      main: {
        temp: 5.5,
        temp_min: 5.5,
        temp_max: 5.5,
        pressure: 1020,
        sea_level: 1020,
        grnd_level: 1016,
        humidity: 59,
        temp_kf: 0
      }
    },
    humidity: 70
  },
  "2019-12-10": {
    day: {
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10n" }
      ],
      main: {
        temp: 10.84,
        temp_min: 10.84,
        temp_max: 10.84,
        pressure: 1001,
        sea_level: 1001,
        grnd_level: 998,
        humidity: 84,
        temp_kf: 0
      }
    },
    night: {
      weather: [
        { id: 803, main: "Clouds", description: "broken clouds", icon: "04n" }
      ],
      main: {
        temp: 3.52,
        temp_min: 3.52,
        temp_max: 3.52,
        pressure: 1021,
        sea_level: 1021,
        grnd_level: 1016,
        humidity: 64,
        temp_kf: 0
      }
    },
    humidity: 65
  },
  "2019-12-11": {
    day: {
      weather: [
        { id: 500, main: "Rain", description: "light rain", icon: "10n" }
      ],
      main: {
        temp: 7.39,
        temp_min: 7.39,
        temp_max: 7.39,
        pressure: 1004,
        sea_level: 1004,
        grnd_level: 1000,
        humidity: 65,
        temp_kf: 0
      }
    },
    night: {
      weather: [
        { id: 801, main: "Clouds", description: "few clouds", icon: "02d" }
      ],
      main: {
        temp: 5.43,
        temp_min: 5.43,
        temp_max: 5.43,
        pressure: 1005,
        sea_level: 1005,
        grnd_level: 1001,
        humidity: 71,
        temp_kf: 0
      }
    },
    humidity: 65
  }
};

describe("Should start testing the FiveDaysWeather Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<FiveDaysWeather forecast={mockForecast} />);
  });
  it("Should render the FiveDaysWeather Component", () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find("h5").length).toBe(5);
  });
});
