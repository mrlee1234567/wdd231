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

export function getDateDiff(date,comparisonDate) {
    const change = comparisonDate - date;
    const seconds = Math.round(change / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    const weeks = Math.round(days / 7);

    res = {
        millisexconds: change,
        seconds: seconds,
        minutes: minutes,
        hours: hours,
        days: days,
        weeks: weeks,
        date1: date,
        date2: comparisonDate
    };

    return res;
}