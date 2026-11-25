export const now = new Date();
export const datetime = new Intl.DateTimeFormat();
export const locale = datetime.resolvedOptions().locale;
const defopts = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
}

export function setDate(pageDateId,format=defopts) {
    const pdateo = document.querySelector(`#${pageDateId}`);
    const opts = format || defopts;

    pdateo.textContent = now.toLocaleTimeString(locale,opts);
};

