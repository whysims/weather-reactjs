import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CitySelector from "./citySelector";

Enzyme.configure({ adapter: new Adapter() });

describe("Should execute unit testing on City Selector component", () => {
  it("Should execute the handle function for search", () => {
    const wrapper = mount(<CitySelector setCity={() => jest.fn()} />);

    wrapper.find("form").simulate("submit", { preventDefault() {} });
  });
});
