import "./style.css";
import { Weather } from "./weather";
import { url_cities_api, weather_options, url_weather_api } from "./apis";
import {
  parseToWeatherClass,
  parseToForecastWeatherClass,
  createCardForecast,
} from "./utils";

const containet_forecast_card = document.querySelector(".container-forecast");
const h1_local_time = document.getElementById("local_time");
const citySelector = document.getElementById("city");
const h6 = document.querySelectorAll("h6");
const h6_current_temp = h6[0];
const h6_current_wind = h6[1];
const h6_current_hum = h6[2];

const weather = new Weather();

// Se trae las provincias con premesas
const setCities = async () => {
  try {
    const dataCities = await fetch(url_cities_api);
    const { results } = await dataCities.json();
    results.forEach((city) => {
      const option = document.createElement("option");
      option.textContent = city.provincia;
      citySelector.appendChild(option);
    });
  } catch (error) {
    console.log(new Error(error));
  }
};

// Se trae los valores del tiempo por ciudad
const setCurrentWeather = async (city) => {
  try {
    const responseWeather = await fetch(
      `${url_weather_api}${city}&days=3`,
      weather_options
    );
    const dataWeather = await responseWeather.json();
    const classWeather = await parseToWeatherClass(dataWeather, weather);
    const classForecastWeather = await parseToForecastWeatherClass(dataWeather);
    printCurrentWeatherInDOM(classWeather);
    classForecastWeather.forEach((forecastWeatherDay) => {
      createCardForecast(containet_forecast_card, forecastWeatherDay);
    });
  } catch (error) {
    console.log(new Error(error));
  }
};

// Añade evento al selector y lanza la función asincorna para rellenar los datos
citySelector.addEventListener("change", (event) => {
  setCurrentWeather(event.target.value);
});

// Pinta los datos de tiempo actual en el DOM
const printCurrentWeatherInDOM = (classWeather) => {
  h1_local_time.textContent = `${classWeather.location} (${classWeather.localtime})`;
  h6_current_temp.textContent = `Temperature: ${classWeather.temp_c} ºC`;
  h6_current_wind.textContent = `Wind: ${classWeather.wind_kph} KpH`;
  h6_current_hum.textContent = `Humidity: ${classWeather.humidity} %`;
  // Limpiamos el contenedor de las prediciones para que no se añadan uno debajo del otro cada vez que se cambie de provincia
  containet_forecast_card.textContent = "";
};

setCities();
