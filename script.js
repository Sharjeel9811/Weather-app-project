const apiKey = "69285cb9401cad6eec60a4f7f749af97"; // Your OpenWeatherMap API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (!response.ok) {
      alert("City not found!");
      return;
    }

    const data = await response.json();

    document.querySelector(".city").innerText = data.name;
    document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerText = data.main.humidity + "%";
    document.querySelector(".wind").innerText = data.wind.speed + " km/h";
4
  
    // Update weather icon
    const weather = data.weather[0].main.toLowerCase();
    if (weather.includes("cloud")) {
      weatherIcon.src = "cloud.png";
    } else if (weather.includes("rain")) {
      weatherIcon.src = "rain.png";
    } else if (weather.includes("clear")) {
      weatherIcon.src = "clear.png";
    } else if (weather.includes("snow")) {
      weatherIcon.src = "snow.png";
    } else {
      weatherIcon.src = "default.png";
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

// Search when clicking the button
searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city !== "") {
    checkWeather(city);
  }
});

// Optional: Also allow "Enter" key to trigger search
searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const city = searchBox.value.trim();
    if (city !== "") {
      checkWeather(city);
    }
  }
});

