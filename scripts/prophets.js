const url = "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";
const cards = document.querySelector('#cards');

const displayProphets = (prophets) => {
    console.table(prophets);
    prophets.forEach((prophet) => {
        const fullname = document.createElement('h2');
        const portrait = document.createElement('img');
        const card = document.createElement('section');
        const pname = `${prophet.name} ${prophet.lastname}`;
        const ialt = `Portrait of ${pname}`;
        fullname.textContent = pname;
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('loading','lazy');
        portrait.setAttribute('alt',ialt);
        portrait.setAttribute('width','340');
        portrait.setAttribute('height','440');
        card.appendChild(fullname);
        card.appendChild(portrait);
        card.classList.add('prophet')
        cards.appendChild(card);
    });
};

async function getProphetsData(wtUrl) {
    try {
        const resp = await fetch(wtUrl);
        if (!resp.ok) {
            throw new Error(`req failed w ${resp.status}`);
            
        }
        const datas = await resp.json();
        displayProphets(datas.prophets);
        // return res;
    } catch (error) {
        console.error(error);
    }
};

// function displayProphets(datas) {
//     console.table(datas);
//     return '';
// }

getProphetsData(url);