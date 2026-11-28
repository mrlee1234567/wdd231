const defaultProfiles = {
    first: {
        name: 'me',
        rel: 'myself',
        pro: 'I',
        proIs: 'I am',
        mr: 'the'
    },
    second: {
        name: 'John',
        sur: 'Doe',
        rel: 'friend',
        mr: null
    },
    third: {
        name: 'John',
        sur: 'Doe',
        rel: 'source',
        mr: null
    },
    standard: {
        name: 'Spaalone Babagoosegoodies',
        rel: 'unknown',
        pro: 'they',
        proIs: 'they are'
    },
    relation: {
        name: 'thing'
    },
    animal: {
        name: 'thing'
    },
    you: {
        name: 'you',
        pro: 'you',
        proIs: 'you are',
        rel: 'reader'
    }
};

function buildMadlib(sample,sub,wordSample,subject,popMadLib=false) {
    let rp = sample;
    const subs = sub || {};
    
    if (Object.keys(subs).includes('words')) {
        let wrds = subs.words;
        wrds.forEach((i) => {
            let rwd = grabMadlibWord(wordSample,i,popMadLib);
            rp = rp.replace(`:${i}`,rwd);
        });
    };
    rp = replaceSubject(rp,subject);
    return rp;
};

function replaceSubject(text,subject,isSrc=false) {
    let subpre = 'sub';
    if (isSrc) {
        subpre = 'src';
    };
    let rtext = text;
    const nme = subject.name;
    const surnm = subject.sur || subject.name;
    let mr = '';
    const mrmr = subject.mr;
    switch (mrmr) {
        case undefined, null:
            mr = surnm;
            break;
    
        default:
            mr = `${subject.mr} ${surnm}`;
            break;
    }
    // const mr = `${subject.mr} ${surnm}` || surnm;
    const pro = subject.pro || defaultProfiles.standard.pro;
    const prois = subject.proIs || defaultProfiles.standard.proIs;
    const rlat = subject.rel || defaultProfiles.relation.name;
    rtext = rtext.replaceAll(`:${subpre}Name`, nme)
        .replaceAll(`:${subpre}Sur`, surnm)
        .replaceAll(`:${subpre}Mr`, mr)
        .replaceAll(`:${subpre}Pro`, pro)
        .replaceAll(`:${subpre}Is`, prois)
        .replaceAll(`:${subpre}Rel`, rlat);
    return rtext;
};

export function buildStart(startSamples,wordSample,nameSample,relationSample,animalSample,popMadLib=false,popName=false,popRelation=false) {
    const selsen = startSamples[Math.floor( Math.random() * startSamples.length )];
    const account = selsen.account;
    const subs = selsen.subs || {subject:account};
    let sttex = selsen.content;
    // if (subs.keys().includes('words')) {
    //     let wrds = subs.words;
    //     // for (const [k,v] of Object.entries(wrds)) {

    //     // };
    //     wrds.forEach((i) => {
    //         let rwd = grabMadlibWord(wordSample,i,popMadLib);
    //         sttex = sttex.replace(`:${i}`,rwd);
    //     });
    // };
    let namesrc = null;
    let relsrc = null;
    let sbj = subs.subject;
    let incluye = false;
    // console.table(selsen);
    let srcprf = buildProfile(account,subs,nameSample,relationSample,animalSample,wordSample,popName,popRelation,popName);
    // const nme = srcprf.name;
    // const surnm = srcprf.sur || srcprf.name;
    // const mr = `${srcprf.mr} ${surnm}` || surnm;
    // const pro = srcprf.pro || defaultProfiles.standard.pro;
    // const prois = srcprf.proIs || defaultProfiles.standard.proIs;
    // const rlat = srcprf.rel;
    // sttex = sttex.replaceAll(':subName', nme)
    // .replaceAll(':subSur', surnm)
    // .replaceAll(':subMr',mr)
    // .replaceAll(':subPro',pro)
    // .replaceAll(':subIs',prois)
    // .replaceAll(':subRel',rlat);
    

    sttex = buildMadlib(sttex,subs,wordSample,srcprf,popMadLib);
    const res = {
        start: sttex,
        infoSrc: srcprf,
        account: account
    };
    return res;
};

export function buildMiddle(thruput,midSamples,wordSample,nameSample,relationSample,animalSample,popMadLib=false,popName=false,popRelation=false) {
    const account = thruput.account;
    const filt = midSamples.filter((i) => i.specify.includes(account) );
    const selsen =filt[ Math.floor( Math.random() * filt.length ) ];
    // console.table(filt);
    const subs = selsen.subs || { subject: account };
    let sttex = selsen.content;

    let namesrc = null;
    let relsrc = null;
    let sbj = subs.subject;
    let incluye = false;

    // if (subs.subject == 'person') {
    //     namesrc = grabRandomThing(nameSample, popName);
    //     relsrc = grabRandomThing(relationSample, popRelation);
    // } else if (subs.subject == 'animal') {
    //     namesrc = grabRandomThing(animalSample, popName);
    // } else if (subs.subject == 'noun') {
    //     sbj = grabMadlibWord(wordSample, 'noun', popMadLib);
    // } else if (subs.subject == 'include') {
    //     incluye = true;
    // };
    // let srcprf = {};
    // if (incluye) {
    //     srcprf = subs.subInfo;
    // } else {
    //     srcprf = buildProfile(sbj, namesrc, relsrc);
    // };
    let srcprf = buildProfile(account,subs,nameSample,relationSample,animalSample,wordSample,popName,popRelation,popName);

    sttex = buildMadlib(sttex,subs,wordSample,srcprf,popMadLib);
    let res = {
        middle: sttex,
        subjectSrc: srcprf,
        account:account
    };
    return res;

};

export function buildEnd(beginning,endSamples,subject,wordSample,popMadLib=false) {
    const account = beginning.account;
    const filt = endSamples.filter((i) => i.specify.includes(account));
    const selsen = filt[Math.floor(Math.random() * filt.length)];
    const infoSource = beginning.infoSrc;
    let sttex = buildMadlib(selsen.content,selsen.subs,wordSample,subject,popMadLib);
    sttex = replaceSubject(sttex,infoSource,true);
    let res = {
        end: sttex,
        account: account
    };
    return res;


};

export function buildFullText(startSample,middleSample,endSample,wordSample,nameSample,relationSample,animalSample,popMadLib=false,popName=false,popRelation=false) {
    const start = buildStart(startSample,wordSample,nameSample,relationSample,animalSample,popMadLib,popName,popRelation);
    const account = start.account;
    const infoSource = start.infoSrc;
    const startText = start.start;

    const middle = buildMiddle(start, middleSample,wordSample, nameSample, relationSample, animalSample, popMadLib, popName, popRelation);
    const subjectSource = middle.subjectSrc;
    const middleText = middle.middle;

    const end = buildEnd(start, endSample, subjectSource, wordSample,popMadLib);
    const endText = end.end;

    let fullTxt = `${startText}${middleText}${endText}`;
    if (fullTxt.includes(':src')) {
        fullTxt = replaceSubject(fullTxt,infoSource,true);
    }
    const res = {
        text: fullTxt,
        parts: {
            beginning: startText,
            middle: middleText,
            end: endText
        },
        subject: subjectSource,
        infoSource: infoSource,
        account: account
    };

    return res;
};

function buildProfile(acc,subject,nameInput={},relationInput={},animalInput={},wordInput={},popName=false,popRelation=false,popWord=false) {
    let res = {};
    let relinf = {};
    let nameInfo = null;
    let relationInfo = null;

    switch (subject.subject) {
        case 'person':
            nameInfo = grabRandomThing(nameInput,popName);
            relationInfo = grabRandomThing(relationInput,popRelation);
            acc = 'person';
            break;
        case 'animal':
            nameInfo = grabRandomThing(animalInput,popName);
            acc = 'animal';
            break;
        case 'noun':
            acc = grabMadlibWord(wordInput,'noun',popWord);
            break;
        case 'include':
            acc = 'include';
            break;
        case 'you':
            acc = 'include';
            subject.subInfo = defaultProfiles.you;
            break;
        default:
            break;
    };

    // if (subs.subject == 'person') {
    //     namesrc = grabRandomThing(nameSample, popName);
    //     relsrc = grabRandomThing(relationSample, popRelation);
    // } else if (subs.subject == 'animal') {
    //     namesrc = grabRandomThing(animalSample, popName);
    // } else if (subs.subject == 'noun') {
    //     sbj = grabMadlibWord(wordSample, 'noun', popMadLib);
    // } else if (subs.subject == 'include') {
    //     incluye = true;
    // };
    // let srcprf = {};
    // if (incluye) {
    //     srcprf = subs.subInfo;

    switch (acc) {
        case 'first':
            return defaultProfiles.first;
            break;
        case 'second':
            return defaultProfiles.second;
            break;
        case 'third':
            return defaultProfiles.third;
            break;
        case 'person':
            res.name = nameInfo.firstName || defaultProfiles.standard.name;
            res.sur = nameInfo.lastName || null;
            switch (nameInfo.gender) {
                case 'male':
                    res.pro = 'he';
                    res.proIs = 'he is';
                    res.mr = 'Mr.';
                    relinf = relationInfo.male || relationInfo.neutral || defaultProfiles.relation;
                    break;
                case 'female':
                    res.pro = 'she';
                    res.proIs = 'she is';
                    res.mr = 'Mrs.';
                    relinf = relationInfo.female || relationInfo.neutral || defaultProfiles.relation;
                    break;
                default:
                    res.mr = null;
                    relinf = relationInfo.neutral || relationInfo.male || relationInfo.female || defaultProfiles.relation;
                    break;
            }
            res.rel = relinf || defaultProfiles.standard.rel;
            // console.table(res);
            return res;
            break;
        case 'animal':
            res.name = nameInfo || defaultProfiles.animal.name;
            res.pro = 'it';
            res.proIs = 'it is';
            res.mr = 'the';
            return res;
            break;
        case 'include':
            res = subject.subInfo || defaultProfiles.standard;
            return res;
            break;
        default:
            res = {
                name: acc,
                rel: 'thing',
                pro: 'it',
                mr: 'the'
            }
            return res;
            break;
    }
};

function grabMadlibWord(wordlists,spPart,pop=false) {
    const sellist = wordlists[spPart];
    // const ssnum = Math.floor( Math.random() * sellist.length );
    // let selsen = '';
    // if (pop) {
    //     selsen = sellist.pop(ssnum);
    // } else {
    //     selsen = sellist[ssnum];
    // };
    // return selsen;
    return grabRandomThing(sellist,pop);
};

function grabRandomThing(victim,pop=false) {
    const ssnum = Math.floor(Math.random() * victim.length);
    let selsen = null;
    if (pop) {
        selsen = victim.pop(ssnum);
    } else {
        selsen = victim[ssnum];
    };
    return selsen;
};