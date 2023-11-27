import { Weather } from "./weather";

export const parseToWeatherClass = (literalWeatherObject, weather) => {
  return new Promise((resolve, reject) => {
    if (literalWeatherObject === null || literalWeatherObject === undefined) {
      reject(`${literalWeatherObject} is not ok`);
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
      reject(`${literalWeatherObject} is not ok`);
    } else {
      let forecast = literalWeatherObject.forecast.forecastday;
      let forecastWeaterArray = forecast.map((element) => {
        let forecastWeater = new Weather();
        forecastWeater.localtime = element.date;
        forecastWeater.temp_c = element.day.avgtemp_c;
        forecastWeater.wind_kph = element.day.maxwind_kph;
        forecastWeater.humidity = element.day.avghumidity;
        return forecastWeater;
      });
      resolve(forecastWeaterArray);
    }
  });
};
