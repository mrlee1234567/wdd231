const dlist = document.querySelector('#dynamic-list');
const gbutton = document.querySelector('#grid');
const lbutton = document.querySelector('#list');

gbutton.addEventListener("click", () => {
    dlist.classList.add('grid');
    dlist.classList.remove('list');
});

lbutton.addEventListener("click", () => {
    dlist.classList.add('list');
    dlist.classList.remove('grid');
});