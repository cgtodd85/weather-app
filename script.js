const apiKey = "74974760a33b1dee728fdbda7a227882";
let userInput = document.querySelector("#searchbar");
const searchBtn = document.querySelector("#search-btn");
let results = document.querySelector("#results");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getCityWeather();
});

function getCityWeather() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${userInput.value}&appid=${apiKey}`
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data.main);
      let feelsLike = ((data.main.feels_like - 273) * 9) / 5 + 32;
      console.log(
        "It feels like " + Math.round(feelsLike) + " degrees fahrenheit"
      );
    });
}
