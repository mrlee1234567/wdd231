import { locale } from "./dates.mjs";

export async function grab(link,writeTableObj=false) {
    let ob = {
        isok: false,
        data: {}
    };
    try {
        const resp = await fetch(link);
        if (!resp.ok) {
            throw new Error(`a problem was recorded grabbing from ${link}; ${resp.status} && ${resp.text()}`);
        };
        const thejs = await resp.json();
        if (writeTableObj) {
            console.table(thejs);
        };
        ob.isok = true;
        ob.data = thejs;
    } catch (error) {
        console.error(error);
        ob.data = {
            src: link,
            er: error
        };
    };
    return ob;
};

export async function fakeUser(grabamt=1,islocal=true,seedval=null,writeTableObj=false) {
    let sd = '';
    let il = '';
    if (islocal) {
        il = `&locale=${locale}`;
    };
    switch (seedval) {
        case null:
            sd='';
            break;
    
        default:
            sd = `&_seed=${seedval}`;
            break;
    };
    const url = `https://fakerapi.it/api/v2/custom?_quantity=${grabamt}&fname=firstName&lname=lastName&city=city&state=state&unamePart=word&birthdate=date${sd}${il}`;
    return grab(url,writeTableObj);
};

export async function randomData(getType,grabamt=1,islocal=true,seedval=null,writeTableObj=false) {
    // randomapi supported locales: en, da, de, fr, es, it, pt, ja
    let sd = '';
    let urlex = '';

    switch (getType) {
        case 'person':
            let il = '';

            if (islocal) {
                let sepl = locale.split('_')[0];
                il = '&locale='
                switch (sepl) {
                    case 'en':

                        il += 'en';
                        break;

                    case 'da':
                        il += 'da';
                        break;
                    case 'de':
                        il += 'de';
                        break;
                    case 'fr':
                        il += 'fr';
                        break;
                    case 'es':
                        il += 'es';
                        break;
                    case 'it':
                        il += 'it';
                        break;
                    case 'pt':
                        il += 'pt';
                        break;
                    case 'ja':
                        il += 'ja';
                        break;

                    default:
                        il = '';
                        break;
                };
            };
            switch (seedval) {
                case null:
                    sd = '';
                    break;

                default:
                    sd = `&seed=${seedval}`
                    break;
            };
            urlex = `users?count=${grabamt}${sd}${il}&fields=firstName%2ClastName%2CbirthDate%2CavatarUrl`;
            break;
        case 'username':
            urlex = `usernames?count=${grabamt}${sd}`;
            break;
        case 'noun','verb','adverb','adjective':
            urlex = `words?type=${getType}${sd}&count=${grabamt}&exclude=partOfSpeech`
        default:
            // urlex = `avatars/image?seed=${grabamt}`;
            urlex = `words?count=${grabamt}&exclude=partOfSpeech${sd}`


            break;
    };

    const url = `https://randomapi.dev/api/${urlex}`;
    return grab(url,writeTableObj);
};

export function randomAvatarLink(username,style=null) {
    let st = '';
    switch (style) {
        case 'identity','identicon','id':
            st = '&style=identicon';
            break;
        case 'initials','initial','init','in':
            st = '&style=initials';
            break;
        case 'shape','shapes','sp':
            st = '&style=shapes';
            break;
        default:
            break;
    };
    const url = `https://randomapi.dev/api/avatars/image?seed=${username}${st}`;
    return url;
};