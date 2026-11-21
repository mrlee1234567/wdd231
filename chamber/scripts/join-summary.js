const summary = document.querySelector('#joinsum');
const url = new URLSearchParams(window.location.search);
const jnue = new Date();

function summaryBuilder() {
    const blt = urlReader();
    const formsum = `
    <ul>
    <li><span><strong>Applicant Name</strong>: </span><span>${blt.name.fname} ${blt.name.lname}</span></li>
    <li><span><strong>Applicant Title</strong>: </span><span>${blt.name.org}</span></li>
    </ul><ul>
    <li><span><strong>Business/Organization</strong>: </span><span>${blt.business.organization}</span></li>
    <li><span><strong>Membership Tier</strong>: </span><span>${paramPlus(blt.business.mship)}</span></li>
    <li class="busdesc"><span><strong>Description</strong>: </span><span>${blt.business.busdesc}</span></li>
    </ul><ul>
    <li><span><strong>Contact Mobile Phone</strong>: </span><span>${blt.contact.bustel}</span></li>
    <li><span><strong>Business Email</strong>: </span><span>${blt.contact.email}</span></li>
    </ul><ul>
    <li class="shrdate"><span><strong>Submit Time</strong>: </span><span>${blt.date.date}</span></li>
    </ul>
    `;

    summary.innerHTML = formsum;
};

function urlReader() {
    // upndefs stands for "url parameters and defaults," has the url parameters and the fallback, as well as boject building
    const upndefs = [
        ['name', [
            ['fname', 'John'],
            ['lname', 'Doe'],
            ['organization-title', 'N/A']
        ]],
        [
            'business', [
                ['organization', 'The Company (we love)'],
                ['busdesc', 'None Provided'],
                ['mship', 'notgold']
            ]
        ],
        [
            'contact', [
                ['bustel', '8675309'],
                ['email', 'em@i.l']
            ]
        ],
        [
            'date', [
                ['date', jnue.toLocaleDateString()]
            ]
        ]
    ];

    let parms = {};

    upndefs.forEach((i) => {
        const pname = i[0];
        let throngler = {};
        i[1].forEach((j) => {
            const urparam = j[0];
            let tochk = '';
            if (urparam == 'organization-title') {
                tochk = 'org';
            } else {
                tochk = urparam;
            };
            
            const urfall = j[1];
            if (url.has(urparam) && url.get(urparam) != '') {
                throngler[tochk] = url.get(urparam);
            } else {
                throngler[tochk] = urfall;
            };
        });
        parms[pname] = throngler;
    });

    // console.table(parms);
    return parms;
};

function paramPlus(param) {
    let ret = '';
    switch (param) {
        case 'np':
            
            ret = 'NP';
            break;
        case 'bronze':
            ret = 'Bronze';
            break;
        case 'silver':
            ret = 'Silver';
            break;
        case 'gold':
            ret = 'Gold';
            break;
        default:
            ret = 'HNNNG!';
            break;
    };
    return ret;
};
const hrer = Intl.DateTimeFormat().resolvedOptions();
console.log(hrer);

summaryBuilder();
