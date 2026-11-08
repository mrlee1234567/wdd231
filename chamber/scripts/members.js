const datloc = "data/members.json";
// const cards = document.querySelector('#dirmem');
const cards = document.querySelector('#dynamic-list');
const fallbackImg = "images/placeholder.svg";

const displayMembers = (memr) => {
    memr.forEach((i) => {
        const bunis = document.createElement('h2');
        const addr = document.createElement('p');
        const phon = document.createElement('p');
        const webs = document.createElement('p');
        const logo = document.createElement('img');
        const card = document.createElement('section');
        bunis.textContent = i.name;
        addr.textContent = i.address;
        phon.textContent = i.phone;
        webs.textContent = i.website;
        webs.classList.add('member-website');
        const img = i.image || fallbackImg;
        logo.setAttribute('src',img);
        logo.setAttribute('width','100');
        logo.setAttribute('height','100');
        logo.setAttribute('alt',i.name);
        logo.setAttribute('loading','lazy');
        const notes = i.note || '&nan';
        card.appendChild(bunis);
        card.appendChild(logo);
        card.appendChild(addr);
        card.appendChild(phon);
        card.appendChild(webs);
        if (notes != '&nan') {
            const ncard = document.createElement('p');
            ncard.textContent = notes;
            ncard.classList.add('member-note');
            card.appendChild(ncard);
        }
        // card.classList.add('member-card');
        cards.appendChild(card);
    });
};

async function getMemDat(dt) {
    try {
        const resp = await fetch(dt);
        if (!resp.ok) {
            throw new Error(`something is wrong; ${resp.status}`);
            
        };
        const mems = await resp.json();
        displayMembers(mems);
    } catch (error) {
        console.error(error);
        cards.textContent = error;
    };
};

getMemDat(datloc);