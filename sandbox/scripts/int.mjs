export function isStored(objName,preGrabe=false) {
    let res = null;
    if (preGrabe) {
        res = objName;
    } else {
        res = localStorage.getItem(objName);
    };
    return res !== null;
};

export function localGrab(objName) {
    let ls = localStorage.getItem(objName);
    if (isStored(ls,true)) {
        return JSON.parse(ls);
    } else {
        return {};
    };
};

export function localPlace(objName,toad) {
    localStorage.setItem(objName,JSON.stringify(toad));
};

export function localRemove(objName) {
    localStorage.removeItem(objName);
};

export function localStorePop(objName) {
    let sttg = localStorage.getItem(objName);
    if (isStored(sttg,true)) {
        localRemove(objName);
        return JSON.parse(sttg);
    } else {
        return {};
    };
};

export function localDataReset() {
    return localStorage.clear();
};