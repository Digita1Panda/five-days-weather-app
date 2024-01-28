const searchBtn = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");

searchBtn.addEventListener("click", getCityCoordinates);

const apiKey = "e1ab8ca6e0505dab1bbf3ada39e01168";

function getCityCoordinates() {
  const cityName = cityInput.value.trim();
  if (!cityName) return;

  const queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (!data.length)
        return alert(
          `${cityName} not found. Please input a correct city name.`
        );
      const { name, lat, lon } = data[0];
      getWeatherDetails(name, lat, lon);
    });
}

function getWeatherDetails(cityName, lat, lon) {
  const weatherApiURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  fetch(weatherApiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
