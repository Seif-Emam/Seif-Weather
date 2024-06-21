

console.log("seif")

async function getWeather(location) {
    var response = await fetch(`Https://api.weatherapi.com/v1/forecast.json?key=bcf381d5108d4cac8b8161901242006&q=${location}&days=3`);
    if (response.ok && 400 != response.status) {
        var mydata = await response.json();
        displayWeather(mydata);
    }
}

function displayWeather(data) {
    var currentWeather = data.current;
    const location = data.location;
    const forecastDays = data.forecast.forecastday;

    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);

    const tomorrowDate = new Date(date);
    tomorrowDate.setDate(date.getDate() + 1);
    const dayAfterTomorrowDate = new Date(date);
    dayAfterTomorrowDate.setDate(date.getDate() + 2);

    const tomorrowFormattedDate = tomorrowDate.toLocaleDateString(undefined, { weekday: 'long' });
    const dayAfterTomorrowFormattedDate = dayAfterTomorrowDate.toLocaleDateString(undefined, { weekday: 'long' });

    const tomorrow = forecastDays[1].day;
    const dayAfterTomorrow = forecastDays[2].day;

    var cartona = `
        <div class="col-md-4 p-0">
            <div class="Weather-Today">
                <div class="d-flex justify-content-between header">
                    <div class="day">${date.toLocaleDateString(undefined, { weekday: 'long' })}</div>
                    <div class="date">${formattedDate}</div>
                </div>
                <div class="content">
                    <div id="location" class="location">${location.name}</div>
                    <div id="degree" class="degree d-flex justify-content-between">
                        <div class="num">${currentWeather.temp_c}<sup>o</sup>C</div>
                        <div class="weather-icon">
                            <img src="${currentWeather.condition.icon}" width="90" alt="${currentWeather.condition.text}">
                        </div>
                    </div>
                    <div class="custom">${currentWeather.condition.text}</div>
                    <span><img src="images/icon-umberella.png" alt="">${currentWeather.humidity}%</span>
                    <span><img src="images/icon-wind.png" alt="">${currentWeather.wind_kph} km/h</span>
                    <span><img src="images/icon-compass.png" alt="">${currentWeather.wind_dir}</span>
                </div>
            </div>
        </div>
        <div class="col-md-4 p-0 Tomorrow">
            <div class="header">
                <div class="day">${tomorrowFormattedDate}</div>
            </div>
            <div class="content boxes">
                <div class="weather-icon w-icon">
                    <img src="${tomorrow.condition.icon}" width="50" alt="${tomorrow.condition.text}">
                </div>
                <div class="degree box-2">${tomorrow.avgtemp_c}<sup>o</sup>C</div>
                <small>${tomorrow.maxtemp_c}<sup>o</sup></small>
                <div class="custom">${tomorrow.condition.text}</div>
            </div>
        </div>
        <div class="col-md-4 p-0 AfterTomorrow">
            <div class="header">
                <div class="day">${dayAfterTomorrowFormattedDate}</div>
            </div>
            <div class="content boxes">
                <div class="weather-icon w-icon">
                    <img src="${dayAfterTomorrow.condition.icon}" width="50" alt="${dayAfterTomorrow.condition.text}">
                </div>
                <div class="degree box-2">${dayAfterTomorrow.avgtemp_c}<sup>o</sup>C</div>
                <small>${dayAfterTomorrow.maxtemp_c}<sup>o</sup></small>
                <div class="custom">${dayAfterTomorrow.condition.text}</div>
            </div>
        </div>`;

    document.getElementById("forecast").innerHTML = cartona;
}





document.getElementById("search").addEventListener("keyup", event => {
    getWeather(event.target.value);
});

getWeather("cairo");
