const searchButton = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");
const weatherCardsDiv = document.querySelector(".weather-cards");
const todaysWeather = document.querySelector(".current-weather");

const apiKey = "e1ab8ca6e0505dab1bbf3ada39e01168";

function weatherCards(cityName, forecastItem, index) {
  if (index === 0) {
    return `<div class="details">
            <h2>${cityName} (${forecastItem.dt_txt.split(" ")[0]})</h2>
            <h4>Temperature: ${(forecastItem.main.temp - 273.15).toFixed(
              1
            )}°C</h4>
            <h4>Wind: ${forecastItem.wind.speed} KPH</h4>
            <h4>Humidity: ${forecastItem.main.humidity}%</h4>
        </div>
        <div class="icon">
            <img
              src="https://openweathermap.org/img/wn/${
                forecastItem.weather[0].icon
              }@4x.png"
              alt="weather-icon"
            />
            <h4>${forecastItem.weather[0].description}</h4>
          </div>`;
  } else {
    return `<li class="card">
                      <h3>(${forecastItem.dt_txt.split(" ")[0]})</h3>
                      <img
                      src="https://openweathermap.org/img/wn/${
                        forecastItem.weather[0].icon
                      }@2x.png"
                      alt="weather-icon"
                      />
                      <h4>Temp: ${(forecastItem.main.temp - 273.15).toFixed(
                        1
                      )}°C</h4>
                      <h4>Wind: ${forecastItem.wind.speed} KPH</h4>
                      <h4>Humidity: ${forecastItem.main.humidity}%</h4>
                  </li>`;
  }
}

function weatherDetails(cityName, lat, lon) {
  const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  console.log(weatherURL);

  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const uniqueDays = [];
      console.log(data);

      const nextFiveDays = data.list.filter((forecast) => {
        const eachDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueDays.includes(eachDate)) {
          return uniqueDays.push(eachDate);
        }
      });

      cityInput.value = "";
      weatherCardsDiv.innerHTML = "";
      todaysWeather.innerHTML = "";

      console.log(nextFiveDays);
      nextFiveDays.forEach((forecastItem, index) => {
        if (index === 0) {
          todaysWeather.insertAdjacentHTML(
            "beforeend",
            weatherCards(cityName, forecastItem, index)
          );
        } else {
          weatherCardsDiv.insertAdjacentHTML(
            "beforeend",
            weatherCards(cityName, forecastItem, index)
          );
        }
      });
    });
}

function cityCoordinates() {
  const cityName = cityInput.value.trim();
  console.log(cityName);

  const queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

  console.log(queryURL);

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const { name, lat, lon } = data[0];
      weatherDetails(name, lat, lon);
    });
}

searchButton.addEventListener("click", cityCoordinates);
