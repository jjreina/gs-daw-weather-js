import { Weather } from "./weather";

const ERROR_MESSAGE = "is not ok";

export const parseToWeatherClass = (literalWeatherObject, weather) => {
  return new Promise((resolve, reject) => {
    if (literalWeatherObject === null || literalWeatherObject === undefined) {
      reject(`${literalWeatherObject} ${ERROR_MESSAGE}`);
    } else {
      weather.location = literalWeatherObject.location.name;
      weather.localtime = literalWeatherObject.location.localtime;
      weather.temp_c = literalWeatherObject.current.temp_c;
      weather.wind_kph = literalWeatherObject.current.wind_kph;
      weather.humidity = literalWeatherObject.current.humidity;
      resolve(weather);
    }
  });
};

export const parseToForecastWeatherClass = (literalWeatherObject) => {
  return new Promise((resolve, reject) => {
    if (literalWeatherObject === null || literalWeatherObject === undefined) {
      reject(`${literalWeatherObject} ${ERROR_MESSAGE}`);
    } else {
      let forecast = literalWeatherObject.forecast.forecastday;
      let forecastWeaterArray = forecast.map((element) => {
        let forecastWeater = new Weather();
        forecastWeater.localtime = element.date;
        forecastWeater.temp_c = element.day.avgtemp_c; // Temperatura media
        forecastWeater.wind_kph = element.day.maxwind_kph; // Viento maximo
        forecastWeater.humidity = element.day.avghumidity; // Huemedad media
        return forecastWeater;
      });
      resolve(forecastWeaterArray);
    }
  });
};

export const createCardForecast = (
  containet_forecast_card,
  forecastWeatherDay
) => {
  const div = document.createElement("div");
  div.className = "card-forecast";

  const pDate = document.createElement("p");
  const pAvgTemp = document.createElement("p");
  const pMaxWind = document.createElement("p");
  const pAvgHum = document.createElement("p");

  pAvgHum.textContent = "Avg Hum: __%";

  pDate.textContent = forecastWeatherDay.localtime
    ? forecastWeatherDay.localtime
    : `Date(___-__-__)`;

  pAvgTemp.textContent = forecastWeatherDay.temp_c
    ? `Avg Temp: ${forecastWeatherDay.temp_c}ºC`
    : `Avg Temp: __ºC`;

  pMaxWind.textContent = forecastWeatherDay.wind_kph
    ? `Max Wind: ${forecastWeatherDay.wind_kph}KpH`
    : `Max Wind: __KpH`;

  pAvgHum.textContent = forecastWeatherDay.humidity
    ? `Avg Hum: ${forecastWeatherDay.humidity}%`
    : `Avg Hum: __%`;

  div.appendChild(pDate);
  div.appendChild(pAvgTemp);
  div.appendChild(pMaxWind);
  div.appendChild(pAvgHum);
  containet_forecast_card.appendChild(div);
};
