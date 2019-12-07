import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "../node_modules/react-vis/dist/style.css";
import HomeComponent from "./components/home/home";
import "react-animation/dist/keyframes.css";
import "./style/weather-icons.min.css";

ReactDOM.render(<HomeComponent />, document.getElementById("root"));
