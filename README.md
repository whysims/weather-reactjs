# WeatherReactJS App

This small application display the weather for a searched city by the user.
The application starts with London as the start city, its possible to search for others cities and the weather for the day along with forecast for 5 days will be displayed.

In case the city searched is not found by the OpenWeatherMap API, the user will receive a message on the frontend.

The data is retrieve from the OpenWeatherMap API and the data is manipulate to display the maximum and minimum temperature and the humidity.

To verify the application, you can access the website: https://whysm-weather-reactjs.herokuapp.com/

#### To run the application

To run the application, simply clone the code and install all the packages with `npm install`.
After everything is installed, you can start the application by using the command `npm start`.
To execute the unit testing, simply call the command `npm test`.

#### API Key

The app is setup with my free OpenWeatherMap API, but if you want to use your own APPID, you can set the ENV key **REACT_APP_APPID** with your own key.

#### What has been used

The application was developed using ReactJS, OpenWeatherMap API, WeatherIcons and Material-UI.
