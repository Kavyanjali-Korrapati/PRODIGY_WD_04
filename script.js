const apiKey = "16f250ce1ed13e5b44768cc62a45c9f3"; 

document.getElementById("locationBtn").addEventListener("click", getLocationWeather);

function getWeatherByCity() {
    const city = document.getElementById("cityInput").value.trim();
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        }, () => {
            alert("Location access denied.");
        });
    } else {
        alert("Geolocation is not supported in your browser.");
    }
}

function fetchWeather(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => {
            console.error("Error:", error);
            alert("Failed to fetch weather data.");
        });
}

function displayWeather(data) {
    if (data.cod === "404") {
        alert("City not found!");
        return;
    }

    const weatherBox = document.querySelector(".weather-box");
    weatherBox.classList.remove("hidden");

    document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent = `${data.main.temp}°C`;
    document.getElementById("conditions").textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").textContent = `Wind: ${data.wind.speed} m/s`;

    const icon = data.weather[0].icon;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
}