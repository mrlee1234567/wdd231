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
        createResult(datum,true);
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
    const usedHr = now.getHours() - (now.getHours() % 3);
    let searchHr = '';
    if (usedHr < 10) {
        searchHr = `0${usedHr}:00:00`;
    } else {
        searchHr = `${usedHr}:00:00`;
    };
    // console.table(dat);

    const filtd = dat.list.filter((f) => f.dt_txt.includes(searchHr)).slice(0,3);
    console.table(filtd);

    filtd.forEach((i) => {
        createResult(i)

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

    const tP = document.createElement('p');

    const wthTop = document.createElement('p');
    const wthClouds = document.createElement('p');
    const wthTemp = document.createElement('p');
    const wthPres = document.createElement('p');
    const wthHum = document.createElement('p');

    if (wide) {
        sec.classList.add('weather-card');
        const tst = `The Weather in Mesa, AZ is <strong>${icnAlt}</strong>.<br><br>\
        The Cloud Cover is <strong>${cloudCover}</strong>.<br><br>\
        The Temperature is <strong>${temperature}</strong>.<br><br>\
        The Pressure is <strong>${pressure}</strong>.<br><br>\
        The Humidity is <strong>${humidity}</strong>.`
        tP.innerHTML = tst;
        head.textContent = 'Weather Right Now';
    } else {
        // const stdate =  || '2026-11-18 21:00:00';
        const thatDay = new Date(data.dt_txt) || new Date();
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const day = weekdays[thatDay.getDay()];
        const tst = `The Weather On ${day} is <strong>${icnAlt}</strong>.<br><br>\
        The Cloud Cover Will Be <strong>${cloudCover}</strong>.<br><br>\
        The Temperature Will Be <strong>${temperature}</strong>.<br><br>\
        The Pressure Will Be <strong>${pressure}</strong>.<br><br>\
        The Humidity Will Be <strong>${humidity}</strong>.`
        tP.innerHTML = tst;

        head.textContent = `Weather for ${months[thatDay.getMonth()]} ${thatDay.getDate()}`;
    };
    sec.appendChild(head);
    sec.appendChild(wicn);
    // sec.appendChild(wthTop);
    // sec.appendChild(wthTemp);
    // sec.appendChild(wthClouds);
    // sec.appendChild(wthPres);
    // sec.appendChild(wthHum);
    sec.appendChild(tP);

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