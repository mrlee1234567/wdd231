const datloc = "data/members.json";
const spotlight = document.querySelector("#spotlight");
const fallbackImg = "images/placeholder.svg";

async function getMemDat(dt) {
    try {
        const resp = await fetch(dt);
        if (!resp.ok) {
            throw new Error(`something is wrong; ${resp.status}`);

        };
        const mems = await resp.json();
        displaySpotlights(mems);
    } catch (error) {
        console.error(error);
        cards.textContent = error;
    };
};

function displaySpotlights(dat) {
    const sorted = dat.filter((f) => f.membership >= 2);
    console.table(sorted);
    const randm1 = Math.floor(sorted.length * Math.random());
    let randm2 = Math.floor(sorted.length * Math.random());
    if (randm1 == randm2) {
        randm2 = (randm2 + 1) % sorted.length;
    };
    const selectedde = [
        sorted[randm1],
        sorted[randm2]
    ];

    selectedde.forEach((i) => {
        const sec = document.createElement('section');
        
        const ttl = document.createElement('h2');
        const icon = document.createElement('img');
        const address = document.createElement('p');
        const phone = document.createElement('p');
        const web = document.createElement('p');
        const level = document.createElement('p');

        const name = i.name;
        // const logo = i.image;
        const logo = fallbackImg;
        const loc = i.address;
        const number = i.phone;
        const site = i.website;
        const memLvl = i.membership;

        if (memLvl == 2) {
            level.innerHTML = '<em>Silver Member</em>';
        } else {
            level.innerHTML = '<em>Gold Member</em>'
        };

        ttl.textContent = name;
        icon.setAttribute('src',logo);
        icon.setAttribute('alt',name);
        icon.setAttribute('width','100');
        icon.setAttribute('height','100');
        icon.setAttribute('loading','lazy');
        address.textContent = loc;
        phone.textContent = number;
        web.textContent = site;

        sec.appendChild(ttl);
        sec.appendChild(icon);
        sec.appendChild(level);
        sec.appendChild(address);
        sec.appendChild(phone);
        sec.appendChild(web);

        spotlight.appendChild(sec);
    });
};

getMemDat(datloc);