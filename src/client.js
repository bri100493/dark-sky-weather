import "./styles.scss"

function getWeather() {
    let zipInput = document.getElementById('zipcode');
    let zipVal = zipInput.value;
    location.assign(`/weather/${zipVal}`);
}

let button = document.getElementById('btn');
button.addEventListener("click", getWeather);