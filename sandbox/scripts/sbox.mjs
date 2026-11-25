import { setDate } from "./dates.mjs";
import { grab, fakeUser, randomData } from "./ext.mjs";
import { localGrab } from "./int.mjs";

const rad = document.querySelector('#tad');

function dothis() {
    // let rops = dtft.resolvedOptions();
    // let lcl = rops.locale;
    // const ihml = `
    // <br><p>intl dateformat; ${dtft}</p>
    // <p>dateformat resdopts; ${rops}</p>
    // <p>resdopts local; ${lcl}</p>
    // `;
    // rad.innerHTML = ihml;
    setDate('dayo');
};

const g1 = await grab('../chamber/data/members.json');
// const g2 = await randomData(null);
const g2 = localGrab('uggu');
const oldD = new Date('1989-05-28');

rad.innerHTML = `<p>${g1.data}</p><p>${g2}</p><p>${oldD}</p>`;

dothis();