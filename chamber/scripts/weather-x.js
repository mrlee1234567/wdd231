const weatherSec = document.querySelector("#weather");
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=33.415674316070145&lon=-111.83080346141904&units=imperial&appid=c248b47d5f0352a348a312b6b2895616';
const forecast = 'https://api.openweathermap.org/data/2.5/forecast?lat=33.415674316070145&lon=-111.83080346141904&units=imperial&appid=c248b47d5f0352a348a312b6b2895616';
// indexes to grab weather at: 3, 11, 19
// 33.415674316070145, -111.83080346141904

async function apiFetchMain() {
    try {
        const ftc = await fetch(url);
        if (!ftc.ok) {
            throw new Error(`api grab errir on normal api${ftc.status} && ${ftc.text()}`);

        }
        const datum = await ftc.json();
        console.table(datum);
        displayResults(datum);
    } catch (error) {
        console.error(error);
        const datum = {
            apiErr: true,
            erMg: error
        };
        console.table(datum)
        return datum;
    }
};

async function apiFetchForecast() {
    try {
        const ftc = await fetch(forecast);
        if (!ftc.ok) {
            throw new Error(`api grab errojr on forcase api${ftc.status} && ${ftc.text()}`)
        }
        const datum = await ftc.json();
        displayForecast(datum);
    } catch (error) {
        console.error(error);
    }
};

function displayForecast(dat) {
    const now = new Date();
    // relevant method and example: dt_txt: "2026-11-14 06:00:00"
    const daynum = now.getDate();
    const month = now.getMonth();
    const usedHr = now.getHours() - (now.getHours() % 3);
    let searchHr = '';
    if (usedHr < 10) {
        searchHr = `0${usedHr}:00:00`;
    } else {
        searchHr = `${usedHr}:00:00`;
    };
    // console.table(dat);

    const filtd = dat.list.filter((f) => f.dt_txt.includes(searchHr)).slice(0,4);
    console.table(filtd);

    filtd.forEach((i) => {
        const thatDay = new Date(i.dt_txt);
        const tempr = i.main.temp;
        const press = i.main.pressure;
        const wName = i.weather[0].main;
        const wDesc = i.weather[0].description;
        const wIcn = `https://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png`;
        const clouds = i.clouds.all;
        const hum = i.main.humidity;

        const sec = document.createElement('section');
        const head = document.createElement('h2');
        const icon = document.createElement('img');
        const top = document.createElement('p');
        const temperature = document.createElement('p')
        const cover = document.createElement('p');
        const pressure = document.createElement('p');
        const humidity = document.createElement('p');

        const icnAlt = `${wName} (${wDesc})`;
        const tStr = `${tempr}&deg;F`;
        const hStr = `${hum}%`;
        const pStr = `${press} hPa`;
        const cStr = `${clouds}%`;

        const weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const day = weekdays[thatDay.getDay()];

        head.textContent = `Weather for ${months[thatDay.getMonth()]} ${thatDay.getDate()}`;
        top.innerHTML = `The Weather On ${day} is <strong>${icnAlt}</strong>.`;
        temperature.innerHTML = `The Temperature Will Be <strong>${tStr}</strong>.`;
        cover.innerHTML = `The Cloud Cover Will Be <strong>${cStr}</strong>.`;
        pressure.innerHTML = `The Pressure Will Be <strong>${pStr}</strong>.`;
        humidity.innerHTML = `The Humidity Will Be <strong>${hStr}</strong>.`;

        icon.setAttribute('src',wIcn);
        icon.setAttribute('width','100');
        icon.setAttribute('height','100');
        icon.setAttribute('alt',icnAlt);
        icon.setAttribute('loading','lazy');

        sec.appendChild(head);
        sec.appendChild(icon);
        sec.appendChild(top);
        sec.appendChild(temperature);
        sec.appendChild(cover);
        sec.appendChild(pressure);
        sec.appendChild(humidity);

        weatherSec.appendChild(sec);

    });
    
    
};

function createResult(data,wide=false) {
    const icnRpr = data.weather[0].icon;
    const weatherName = data.weather[0].main;
    const weatherDesc = data.weather[0].description;
    const icnAlt = `${weatherName} (${weatherDesc})`;
    const icn = `https://openweathermap.org/img/wn/${icnRpr}@2x.png`;
    const temperature = `${data.main.temp}&deg;F`;
    const humidity = `${data.main.humidity}%`;
    const pressure = `${data.main.pressure} hPa`;
    const cloudCover = `${data.clouds.all}%`;
    const sec = document.createElement('section');
    // sec.classList.add('weather-card');
    const head = document.createElement('h2');
    const wicn = document.createElement('img');
    wicn.setAttribute('width', '100');
    wicn.setAttribute('height', '100');
    wicn.setAttribute('src', icn);
    wicn.setAttribute('alt', icnAlt);
    wicn.setAttribute('loading', 'lazy')

    const wthTop = document.createElement('p');
    const wthClouds = document.createElement('p');
    const wthTemp = document.createElement('p');
    const wthPres = document.createElement('p');
    const wthHum = document.createElement('p');

    if (wide) {
        sec.classList.add('weather-card');
        head.textContent = 'Weather Right Now';
        wthTop.innerHTML = `The Weather in Mesa, AZ is <strong>${icnAlt}</strong>.`;
        wthClouds.innerHTML = `The Cloud Cover is <strong>${cloudCover}</strong>.`;
        wthTemp.innerHTML = `The Temperature is <strong>${temperature}</strong>.`;
        wthPres.innerHTML = `The Pressure is <strong>${pressure}</strong>.`;
        wthHum.innerHTML = `The Humidity is <strong>${humidity}</strong>.`;
    } else {
        const thatDay = new Date(i.dt_txt) || new Date();
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const day = weekdays[thatDay.getDay()];

        head.textContent = `Weather for ${months[thatDay.getMonth()]} ${thatDay.getDate()}`;
        wthTop.innerHTML = `The Weather On ${day} is <strong>${icnAlt}</strong>.`;
        temperature.innerHTML = `The Temperature Will Be <strong>${tStr}</strong>.`;
        wthClouds.innerHTML = `The Cloud Cover Will Be <strong>${cloudCover}</strong>.`;
        wthPres.innerHTML = `The Pressure Will Be <strong>${pressure}</strong>.`;
        wthHum.innerHTML = `The Humidity Will Be <strong>${humidity}</strong>.`;
        
    };
    sec.appendChild(head);
    sec.appendChild(icon);
    sec.appendChild(top);
    sec.appendChild(temperature);
    sec.appendChild(cover);
    sec.appendChild(pressure);
    sec.appendChild(humidity);

    weatherSec.appendChild(sec);

}


function displayResults(data) {
    const icnRpr = data.weather[0].icon;
    const weatherName = data.weather[0].main;
    const weatherDesc = data.weather[0].description;
    const icnAlt = `${weatherName} (${weatherDesc})`;
    const icn = `https://openweathermap.org/img/wn/${icnRpr}@2x.png`;
    const temperature = `${data.main.temp}&deg;F`;
    const humidity = `${data.main.humidity}%`;
    const pressure = `${data.main.pressure} hPa`;
    const cloudCover = `${data.clouds.all}%`;
    const sec = document.createElement('section');
    sec.classList.add('weather-card');
    const head = document.createElement('h2');
    const wicn = document.createElement('img');
    wicn.setAttribute('width','100');
    wicn.setAttribute('height','100');
    wicn.setAttribute('src',icn);
    wicn.setAttribute('alt',icnAlt);
    wicn.setAttribute('loading','lazy')

    const wthTop = document.createElement('p');
    const wthClouds = document.createElement('p');
    const wthTemp = document.createElement('p');
    const wthPres = document.createElement('p');
    const wthHum = document.createElement('p');

    head.textContent = 'Weather Right Now';
    wthTop.innerHTML = `The Weather in Mesa, AZ is <strong>${icnAlt}</strong>.`;
    wthClouds.innerHTML = `The Cloud Cover is <strong>${cloudCover}</strong>.`;
    wthTemp.innerHTML = `The Temperature is <strong>${temperature}</strong>.`;
    wthPres.innerHTML = `The Pressure is <strong>${pressure}</strong>.`;
    wthHum.innerHTML = `The Humidity is <strong>${humidity}</strong>.`;

    sec.appendChild(head);
    sec.appendChild(wicn);
    sec.appendChild(wthTop);
    sec.appendChild(wthTemp);
    sec.appendChild(wthClouds);
    sec.appendChild(wthPres);
    sec.appendChild(wthHum);

    weatherSec.appendChild(sec);
};

apiFetchMain();
apiFetchForecast();