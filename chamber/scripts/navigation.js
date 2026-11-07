const hambutton = document.querySelector('#ham-btn');
const nav = document.querySelector('#nav-bar');
// humbutton is navbutton
hambutton.addEventListener('click', () => {
    const isOpen = hambutton.classList.toggle('show');
    hambutton.setAttribute('aria-expanded', isOpen);
    
    nav.classList.toggle('show');
});
