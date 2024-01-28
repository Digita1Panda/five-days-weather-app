const searchBtn = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");

searchBtn.addEventListener("click", getCityCoordinates);

function getCityCoordinates() {
  const cityName = cityInput.value.trim();
  if (!cityName) return;

  console.log(cityName);
}
