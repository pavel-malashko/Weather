export function parseData(data) {
  return {
    city: data.name,
    country: data.sys.country,
    description: data.weather[0].description,
    main: data.weather[0].main,
    temp: Math.round((data.main.temp - 273.15) * 10) / 10,
    highestTemp: Math.round((data.main.temp_max - 273.15) * 10) / 10,
    lowestTemp: Math.round((data.main.temp_min - 273.15) * 10) / 10,
    sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString().slice(0, 5),
    sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString().slice(0, 5),
    clouds: data.clouds.all,
    humidity: data.main.humidity,
    wind: data.wind.speed,
  };
}

export function setCity(cities, city) {
  const uniqValue = cities.find(data => data.value === city);
  if (!uniqValue) {
    cities.push({ key: cities.length + 1, value: city });
    localStorage.setItem('cities', JSON.stringify(cities));
  }
}
