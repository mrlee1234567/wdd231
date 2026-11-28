import discover from "../data/discover.mjs";
import { seeDate } from "./visits.mjs";

const discdisp = document.querySelector('#dscv');

async function masterCard() {
    discover.forEach((i) => {
        const sec = document.createElement('section');
        const img = i.img;
        let header = `<h2>${i.name}</h2>`;
        let dsc = `<p>${i.description}</p>`;
        let fig = `<figure><img src="${img.link}" alt="${img.alt}" width="300" height="200" fetchpriority="high"><figcaption>${img.caption}</figcaption></figure>`;
        // loading="lazy"
        let ady = `<address>${i.address}</address>`;
        const butt = document.createElement('button');
        butt.textContent = 'Visit';
        butt.addEventListener('click', () => {
            window.location.href = i.link;
        });
        sec.innerHTML = `${header}${fig}${dsc}${ady}`;
        sec.appendChild(butt);
        discdisp.appendChild(sec);
    });

    // const fcp = discdisp.firstChild();
    // const f1c = fcp.querySelector('img');
    // f1c.setAttribute('loading','eager');
    // f1c.setAttribute('fetchpriority','high')
};

seeDate('lastvist');
masterCard();