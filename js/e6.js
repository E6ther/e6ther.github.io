let h1Str = [
    '时 空 机',
    'S K J I'
];

let h2Str = [
    'Through time and space, only to find you.'
];

let initStep = 0;
let typeTime = 250;
let deletetime = 150;
let timer;
let timeout;

function deleteStr(element, strArray, argindex) {
    let str = strArray[argindex];
    let strindex = str.length - 1;
    timer = setInterval(function () {
        if (strindex < 0) {
            clearInterval(timer);

            return typeStr(element, strArray, ++argindex);
        } else {
            element.innerHTML = str.slice(0, strindex--) + '_';
        }
    }, deletetime)
}

function typeStr(element, strArray, argindex) {
    let str = strArray[argindex];
    let strindex = 0;
    timer = setInterval(function () {
        if (strindex >= str.length) {
            clearInterval(timer);
            element.innerHTML = str.slice(0, strindex);

            if (argindex < strArray.length - 1) {
                return timeout = setTimeout(function () {
                    deleteStr(element, strArray, argindex);
                }, typeTime);
            } else {
                Init();
            }
        } else {
            element.innerHTML = str.slice(0, strindex++) + '_';
        }
    }, typeTime)
}

function menuAppear() {
    changeImg();
    let menu = document.getElementById('menu');
    menu.classList.add('appear');
}

function changeImg() {
    let imgNum = Math.floor(Math.random() * 2) + 1;
    let img = document.getElementById('logo');
    img.src = 'img/image' + imgNum + '.jpg';
}

function immeFinsh() {
    clearInterval(timer);
    clearTimeout(timeout);

    let h1 = document.getElementById('h1');
    let h2 = document.getElementById('h2');

    h1.innerHTML = h1Str[h1Str.length - 1];
    h2.innerHTML = h2Str[h2Str.length - 1];

    changeImg();

    let menu = document.getElementById('menu');
    menu.classList.add('imme-appear');

    document.body.removeEventListener('click', bodyClick);

    setCookie('lastVisit', Date.now());
}


function Init() {
    let h1 = document.getElementById('h1');
    let h2 = document.getElementById('h2');

    if (initStep === 0) {
        setCookie('isFirst', 'false');
        typeStr(h1, h1Str, 0);
    } else if (initStep === 1) {
        typeTime /= 2;
        deletetime /= 2;

        timeout = setTimeout(function () {
            typeStr(h2, h2Str, 0);
        }, typeTime);
    } else {
        menuAppear();

        document.body.removeEventListener('click', bodyClick);

    }

    ++initStep;
}

let clickTime;

function bodyClick() {
    if (Date.now() - clickTime <= 500) {
        immeFinsh();
    } else {
        typeTime /= 2;
        deletetime /= 2;
    }
    clickTime = Date.now();
}

function toOthers() {
    let menu = document.getElementById('menu');
    menu.classList.add('display-none');
    let others = document.getElementById('others');
    others.classList.remove('display-none');
}

function returnMenu() {
    let menu = document.getElementById('menu');
    menu.classList.remove('appear');
    menu.classList.add('imme-appear');
    menu.classList.remove('display-none');

    let others = document.getElementById('others');
    others.classList.add('display-none');
}

function getCookie(name) {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function setCookie(name, value) {
    let Days = 7;
    let exp = new Date();
    exp.setTime(exp.getTime() + Days* 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

window.onload = function () {
    document.body.addEventListener('click', bodyClick);

    if (getCookie('isFirst') === 'false') {
        if (Date.now() - parseInt(getCookie('lastVisit')) < 1500) {
            Init();
        } else {
            immeFinsh();
        }
    } else {
        Init();
    }
};
