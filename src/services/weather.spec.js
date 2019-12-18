import moment from "moment";
import { getWeather, getForecast, getPlacePhoto } from "./weather";

const weather = {
  city: "London",
  weather: [],
  sys: []
};

const forecast = {
  "2019-10-10": [],
  "2019-10-11": []
};

describe("Should perform the unit testing for services", () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  });

  it("getWeather()", async () => {
    fetch.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve(weather)
      });
    });
    const response = await getWeather("London");

    expect(fetch).toBeCalledTimes(1);
    expect(response).toEqual(weather);
  });

  it("getForecast()", async () => {
    fetch.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        json: () => Promise.resolve(forecast)
      });
    });
    const response = await getForecast("London");

    expect(fetch).toBeCalledTimes(2);
    expect(response).toEqual(forecast);
  });

  it("getPlacePhoto()", async () => {
    fetch.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        json: () =>
          Promise.resolve({
            results: [{ urls: { regular: "urlForRegularImg" } }],
            total: 1
          })
      });
    });
    const response = await getPlacePhoto("London");

    expect(response).toBeDefined();
    expect(response.urls.regular).toBe("urlForRegularImg");
  });
});
