const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75116323608714&lon=6.643954692257917&units=imperial&appid=c248b47d5f0352a348a312b6b2895616';
const wico = document.querySelector('#weather-icon');
const ctem = document.querySelector('#current-temp');
const fallbackIcn = 'images/placeholder.svg';

async function apiFetch() {
    try {
        const ftc = await fetch(url);
        if (!ftc.ok) {
            throw new Error(`api grab errir ${ftc.status} && ${ftc.text()}`);
            
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

function displayResults(data) {
    const apir = data.apiErr || false;
    wico.setAttribute('width','200');
    wico.setAttribute('height','200');
    if (apir) {
        ctem.innerHTML = data.erMg;
        wico.setAttribute('src',fallbackIcn);
        wico.setAttribute('alt','error')
        return
    } else {
    const icnRpr = data.weather[0].icon;
    const weatherName = data.weather[0].main;
    const weatherDesc = data.weather[0].description;
    const town = data.name;
    const country = data.sys.country;
    const icnAlt = `${weatherName} in ${town}, ${country}`;
    const icn = `https://openweathermap.org/img/wn/${icnRpr}@2x.png`;
    const temperature = `${data.main.temp}&deg;F`;
    wico.setAttribute('src',icn);
    wico.setAttribute('alt',icnAlt);
    ctem.innerHTML = temperature;
    };
};

apiFetch();

/* 
weather js object methods:
these are the methods that will be used:
weather: (list)[
(object){
id (unknown use)
main (weather type, ie, clouds)
description (weather description, ie, overcast clouds)
icon (icon key for the openweather api)
}]
main (object){
temp (temperature, f)
feels_like (feels like temperature)
temp_min (daily minimum)
temp_max (daily maximum)
pressure (air pressure?)
humidity (humidity level, int)
sea_level (unknown)
grnd_level (unknown)
}
visibility (int, todays visibility, in percentage * 100 (ie, 100% = 10000))
wind (object){
speed (mph)
def (either windchill or wind angle)
gust (unknown)
}
clouds (object){
all (coverage, int)
}
sys (object){
id (unknown)
type (unknown)
country (country code, ie, DE)
sunrise (unknown)
sunset (unknown)
}
name (city name, it, Trier)


*/