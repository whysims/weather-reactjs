import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Home from "./home";
import FiveDaysWeather from "../fiveDaysWeather/fiveDaysWeather";
import TodayWeather from "../todayWeather/todayWeather";
import CitySelector from "../citySelector/citySelector";

Enzyme.configure({ adapter: new Adapter() });

/* Function to setup the render using Enzyme .shallow() function.
 * @returns {ShallowWrapper}
 */
const setup = props => {
  return shallow(<Home {...props} />);
};

/* This function uses the .find() from Enzyme and returns the class.
 * @param {ReactWrapper} wrapper - the Enzyme Wrapper created from .mount() function.
 * @param {string} class - the className for the element
 * @returns {ShallowWrapper} node
 */
const findAttrByClass = (wrapper, className) => {
  return wrapper.find(`.${className}`);
};

/* This function uses the .find() from Enzyme and returns the component.
 * @param {ReactWrapper} wrapper - the Enzyme Wrapper created from .mount() function.
 * @param {ReactComponent} component - the component itself
 * @returns {ShallowWrapper} node
 */
const findNodeByComponent = (wrapper, component) => {
  return wrapper.find(component);
};

describe("Should execute unit testing for the Home Layout", () => {
  it("Should render with all the components", () => {
    const wrapper = setup();
    const citySelector = findNodeByComponent(wrapper, CitySelector);
    const fiveDaysWeather = findNodeByComponent(wrapper, FiveDaysWeather);
    const todayWeather = findNodeByComponent(wrapper, TodayWeather);
    expect(citySelector).toHaveLength(1);
    expect(fiveDaysWeather).toHaveLength(1);
    expect(todayWeather).toHaveLength(1);
  });

  it("getWeatherData() - Should call the function to get the weather", async () => {
    const wrapper = setup();
    await wrapper.instance().getWeatherData();

    expect(wrapper.instance().state.city).toEqual("London");
    expect(wrapper.instance().state.forecast).toBeDefined();
    expect(wrapper.instance().state.weather).toBeDefined();
  });

  it("setCity() - Should call the function to set a city and change the state", () => {
    const wrapper = setup();
    const spyWeatherData = jest.spyOn(wrapper.instance(), "getWeatherData");
    const spySetCity = jest.spyOn(wrapper.instance(), "setCity");

    expect(wrapper.instance().state.city).toEqual("London");

    wrapper.instance().setCity("Dublin");
    expect(spyWeatherData).toBeCalled();
    expect(wrapper.instance().state.city).toEqual("Dublin");
  });
});
