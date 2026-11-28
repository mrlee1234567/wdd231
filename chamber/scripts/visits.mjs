const now = new Date();
const visInf = JSON.parse(localStorage.getItem('discover')) || {first:true,timestamp:null};
const dayMs = 86400000;

export async function seeDate(displayTag) {
    const chesker = document.querySelector(`#${displayTag}`);
    let tc = '';
    // console.table(visInf);

    if (visInf.first) {
        visInf.first = false;
        tc = 'Welcome! Let us know if you have any questions.';
    } else {
        let stamp = new Date(visInf.timestamp);
        let tbtd = (now.getTime() - stamp.getTime()) / dayMs;
        if (tbtd < 1) {
            tc = 'Back so soon! Awesome!';
        } else if (tbtd < 2) {
            tc = 'You last visited <strong>1</strong> day ago.';
        } else {
            tc = `You last visited <strong>${tbtd.toFixed(0)}</strong> days ago.`;
        };
        // tc = `${tc}<br><br>${now.getTime()} ${stamp.getTime()}<br>${stamp}<br>${tbtd}`;
    };

    visInf.timestamp = now;
    localStorage.setItem('discover', JSON.stringify(visInf));
    chesker.innerHTML = tc;
};