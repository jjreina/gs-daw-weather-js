export class ForecastWeather {
  #location; // Ciudad
  #localtime; // Hora y fecha actual
  temp_c; // Temperatura acual en centígrado
  wind_kph; // Viento acutual en K por H
  humidity; // Humedad actual
  constructor(location, localtime) {
    this.#location = location;
    this.#localtime = localtime;
  }