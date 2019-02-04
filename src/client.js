import "./styles.scss"

function getWeather() {
    let zipInput = document.getElementById('zipcode');
    let zipVal = zipInput.value;
    location.assign(`/weather/${zipVal}`);
}

let button = document.getElementById('btn');
if(window.location.href.indexOf("weather/") === -1) {
    button.addEventListener("click", getWeather);
}

if (window.location.pathname.indexOf("weather/") > -1) {
    let zip = window.location.pathname.slice(9);
    let forecastHeader = document.getElementById('forecast-header');
    forecastHeader.innerHTML = zip + " Weekly Forecast";
}
