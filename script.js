let weather = {
    apiKey: "5e9a20801f8240a90150dc4d2482b913",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid=" 
        + this.apiKey
      )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found for this city.");
          throw new Error("No weather found for this city.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  
    displayWeather: function (data) {
      const { name } = data;
      const { temp, temp_max,temp_min } = data.main;
      const { description } = data.weather[0];
      const { speed } = data.wind;
      const { country } = data.sys;
      console.log(name,country,temp,temp_max,temp_min,description,speed);
      document.querySelector(".city").innerText = name + ", " + country;
      document.querySelector(".degree").innerText = temp + " °C";
      document.querySelector(".weather").innerText = description;
      document.querySelector(".hi-low").innerText = "Hi/Low: " + temp_max + " °C"  + "/" +  temp_min + " °C";
      document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
      document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
      document.querySelector(".location").classList.remove("information");
    },
    search: function() {
      this.fetchWeather(document.querySelector(".search").value);
    },
  };

document.querySelector(".searchBar .fa-magnifying-glass").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("");

function clearInput() {
  let clearSearch = document.getElementById('search').value = ""
  }