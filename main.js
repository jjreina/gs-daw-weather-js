import "./style.css";
import { Weather } from "./weather";
import { url_cities_api, weather_options, url_weather_api } from "./apis";
import { parseToWeatherClass, parseToForecastWeatherClass } from "./utils";

const h1_local_time = document.getElementById("local_time");
const citySelector = document.getElementById("city");
const h6 = document.querySelectorAll("h6");
const h6_current_temp = h6[0];
const h6_current_wind = h6[1];
const h6_current_hum = h6[2];

const weather = new Weather();

// Se trae las provincias con premesas
const setCities = async () => {
  const dataCities = await fetch(url_cities_api);
  const { results } = await dataCities.json();
  results.forEach((city) => {
    const option = document.createElement("option");
    option.textContent = city.provincia;
    citySelector.appendChild(option);
  });
};

// Se trae los valores del tiempo por ciudad
const setCurrentWeather = async (city) => {
  const responseWeather = await fetch(
    `${url_weather_api}${city}&days=3`,
    weather_options
  );
  const dataWeather = await responseWeather.json();
  const classWeather = await parseToWeatherClass(dataWeather, weather);
  const classForecastWeather = await parseToForecastWeatherClass(dataWeather);
  printInDOM(classWeather);
  console.log(classForecastWeather);
};

// Añade evento al selector y lanza la función asincorna para rellenar los datos
citySelector.addEventListener("change", (event) => {
  setCurrentWeather(event.target.value);
});

// Pinta los datos en el DOM
const printInDOM = (classWeather) => {
  h1_local_time.textContent = `${classWeather.location} (${classWeather.localtime})`;
  h6_current_temp.textContent = `Temperature: ${classWeather.temp_c} ºC`;
  h6_current_wind.textContent = `Wind: ${classWeather.wind_kph} KpH`;
  h6_current_hum.textContent = `Humidity: ${classWeather.humidity} %`;
};

setCities();
