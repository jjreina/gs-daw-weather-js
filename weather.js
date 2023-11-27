export class Weather {
  #location; // Ciudad
  #localtime; // Hora y fecha actual
  temp_c; // Temperatura acual en centígrado
  wind_kph; // Viento acutual en K por H
  humidity; // Humedad actual
  constructor(location, localtime) {
    this.#location = location;
    this.#localtime = localtime;
  }

  get location() {
    return this.#location;
  }

  set location(location) {
    this.#location = location;
  }

  get localtime() {
    return this.#localtime;
  }

  set localtime(localtime) {
    this.#localtime = localtime;
  }

  get temp_c() {
    return this.temp_c;
  }

  set temp_c(temp_c) {
    this.temp_c = temp_c;
  }

  get wind_kph() {
    return this.wind_kph;
  }

  set wind_kph(wind_kph) {
    this.wind_kph = wind_kph;
  }

  get humidity() {
    return this.humidity;
  }

  set humidity(humidity) {
    this.humidity = humidity;
  }
}
