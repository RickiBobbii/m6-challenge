$(document).ready(function(){
    
const apiKey = "20289076a9624ee927b2ed1686967655";
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector(".button");

//function to Render Weather
function renderWeather(weather) {
    console.log(weather);
    var heroCard = document.querySelector('#hero-card');
    var city = document.querySelector('#hero-city');
    city.innerHTML = weather.city.name;

    var date = document.querySelector('#hero-date');
    var timestamp = weather.list[0].dt;
    date.innerHTML = dayjs.unix(timestamp).format('MMMM D, YYYY');

    var icon = document.querySelector('#hero-icon')
    var iconcode = weather.list[0].weather[0].icon;
    var iconurl = " https://openweathermap.org/img/wn/" + iconcode + "@4x.png";
    $('#hero-icon').attr('src', iconurl);

    var temp = document.querySelector('#hero-temp');
    temp.innerHTML = "Temp: " + weather.list[0].main.temp + " F";

    var wind = document.querySelector('#hero-wind');
    wind.innerHTML = "Wind: " + weather.list[0].wind.speed + " MPH";

    var humidity = document.querySelector('#hero-humidity');
    humidity.innerHTML = "Humidity: " + weather.list[0].main.humidity + " %";

    //5-day card loop
    for (i = 1; i < 6; i++) {
      var date = document.querySelector('#date' + i);
      var timestamp = weather.list[i * 7].dt;  //grabbing index at middle timestamps
      //console.log(timestamp);
      date.innerHTML = dayjs.unix(timestamp).format('MMMM D, YYYY');
      //console.log("Timestamp after dayjs " + timestamp);

      var icon = document.querySelector('#icon' + i)
      var iconcode1 = weather.list[i * 7].weather[0].icon;
      var iconurl1 = " https://openweathermap.org/img/wn/" + iconcode1 + ".png";
      $('#icon' + i).attr('src', iconurl1);

      var temp = document.querySelector('#temp' + i);
      var tempIndex = weather.list[i * 7].main.temp;
      //console.log("tempIndex " + tempIndex);
      temp.innerHTML = "Temp: " + tempIndex + " F";

      var wind1 = document.querySelector('#wind' + i);
      wind1.innerHTML = "Wind: " + weather.list[i * 7].wind.speed + " MPH";

      var humidity1 = document.querySelector('#humidity' + i);
      humidity1.innerHTML = "Humidity: " + weather.list[i * 7].main.humidity + " %";
    }

}

//function to get Weather , fetch api
function fetchWeather(query) {
    const cityName = cityInput.value.trim();
    const url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + ",us&units=imperial&limit=1&appid=" + apiKey;

    fetch(url)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          renderWeather(data);
        });
        } else {
        alert('Error: ' + response.statusText);
        }
        })
        .catch(function (error) {
        alert('Unable to connect to server');
    });
    //set local storage
    localStorage.setItem("CityName", JSON.stringify(cityName));
    //get local storage and append to options
    var getCityName = JSON.parse(localStorage.getItem("CityName"));
    if (getCityName !== null) {
      //append
      function renderCityNames() {
        // Render a new option for each cityName
          var selectBar = document.querySelector('#select-box');
          var option = document.createElement("option");
          option.textContent = cityName.toUpperCase();
          option.setAttribute("value", cityName);
      
          selectBar.appendChild(option);  
      }
      //clear search input
      cityInput.value = "";
      renderCityNames();
      
    }
    console.log("cityName is " + cityName);
}
//function for select-box fetch weather
function fetchWeatherSelect(query) {
  //looping search history options tags 
  var option = document.querySelectorAll("option");
  var citySelect = "";
  for (i = 0; i < option.length; i++){
    if(option[i].selected) {
      citySelect += option[i].value + ",";
    }
  }
  citySelect = citySelect.slice(0, -1);  //for loop and slice helped with bing Ai
  console.log(citySelect);
  const cityName = citySelect
  const url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + ",us&units=imperial&limit=1&appid=" + apiKey;

  fetch(url)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        renderWeather(data);
      });
      } else {
      alert('Error: ' + response.statusText);
      }
      })
      .catch(function (error) {
      alert('Unable to connect to server');
  }); 
}
//event listener for search submit
searchBtn.addEventListener('click', fetchWeather);
document.querySelector('#select-box').addEventListener('change', fetchWeatherSelect);

});