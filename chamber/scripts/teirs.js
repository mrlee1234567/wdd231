// it seemed easier to have the tiers be built as a js/json than through html
const dialog = document.querySelector('#mship-info');
const tiers = document.querySelector('#memtiers');
const form = document.querySelector('#formget');
const nuh = new Date();

function displatDeets(data) {
    let ihml = `<p><strong>${data.tier}</strong></p>`;
    let iq = '';
    data.perks.forEach((i) => {
        iq = `${iq}<li>${i}</li>`;
    });
    ihml = `${ihml}<ul>${iq}</ul>`;

    return ihml;
};

function buildMode(data) {
    dialog.innerHTML = `
    <button id="closeModal" aria-label="Close"><img src="images/close.svg" alt="Close" width="20" height="20" loading="lazy"></button>
    ${displatDeets(data)}
    `;
    dialog.showModal();
    dialog.querySelector('#closeModal').addEventListener('click', () => {
        dialog.close();
    });
};

function createTiers(data) {
    data.forEach((i) => {
        const tr = document.createElement('div');
        tr.classList.add('tier');
        tr.innerHTML = `
        <h3>${i.tier} Tier</h3>
        <p><strong>Pricing:</strong> ${i.cost}</p>
        `;
        let iq = document.createElement('button');
        iq.textContent = 'Show Tier Perks';
        iq.addEventListener('click', () => {
            buildMode(i);
        });
        tr.appendChild(iq);
        tiers.appendChild(tr);
    });
};

async function openTiersFile() {
    try {
        const resp = await fetch('data/tiers.json');
        if (!resp.ok) {
            throw new Error(`something went wrogn; ${resp.status} && ${resp.text()}`);
            
        };
        const jtrs = await resp.json();
        // console.table(jtrs);
        createTiers(jtrs);
    } catch (error) {
        console.error(error);
    };
};

function datesender() {
    const hidd = document.createElement('input');
    hidd.setAttribute('type','hidden');
    hidd.setAttribute('name','date');
    const loc = Intl.DateTimeFormat().resolvedOptions().locale;
    // const opts1 = {
    //     weekday: 'long',
    //     // year: "numeric",
    //     // month: "long",
    //     // day: "numeric"
    // };
    const opts2 = {
        day: 'numeric',
        month: 'long',
        // date: 'numeric',
        year: 'numeric'
    }
    // const sdt = `${nuh.toLocaleDateString(loc,opts1)} ${nuh.toLocaleTimeString(loc,opts2)}`;
    const sdt = nuh.toLocaleTimeString(loc, opts2);

    hidd.setAttribute('value',sdt);
    form.appendChild(hidd);
};

dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
        dialog.close();
    };
});

openTiersFile();
datesender();