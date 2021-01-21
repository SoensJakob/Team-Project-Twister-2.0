'use strict'

let gamemodes = ["twister-classic", "memory"]
let currgameindex = 0;

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM geladen');
    init();
});

const init = function(){
    currgameindex = gamemodes.indexOf(document.querySelector('#txtgamemodenav').innerHTML);
    console.log(currgameindex)
    document.querySelector('#BtnNextGamemode').addEventListener('click', ShowNextGamemode);
    document.querySelector('#BtnPrevGamemode').addEventListener('click', ShowPrevGamemode);
}

const ShowNextGamemode = () => {
    currgameindex++;
    if (currgameindex == gamemodes.length ) {
        currgameindex = 0;
    }
    console.log(currgameindex);
    window.location.href = `/scores/${gamemodes[currgameindex]}`
}

const ShowPrevGamemode = () => {
    currgameindex--;
    if (currgameindex < 0) {
        currgameindex = (gamemodes.length - 1);
    }
    console.log(currgameindex);
    window.location.href = `/scores/${gamemodes[currgameindex]}`
}