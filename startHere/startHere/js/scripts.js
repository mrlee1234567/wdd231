const getstr = window.location.search;
console.log(getstr);

const myinf = new URLSearchParams(getstr);
console.log(myinf);

const rslts = document.querySelector('#results');

const fname = myinf.get('first');
const lname = myinf.get('last');
const ord = myinf.get('ordinance');
const dy = myinf.get('date');
const loc = myinf.get('location');
const pnum = myinf.get('phone');
const eml = myinf.get('email')

rslts.innerHTML = `
<p>Appointment for ${fname} ${lname}</p>
<p>Proxy ${ord} on ${dy} in the ${loc} Temple</p>
<p>Your Phone: ${pnum}</p>
<p>Your Email: ${eml}</p>
`;