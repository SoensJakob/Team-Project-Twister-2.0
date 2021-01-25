'use strict'

let gamemodes = ["twister-classic", "memory"]
let currgameindex = 0;

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM geladen');
    init();
});

const init = function(){
    document.querySelector('#BtnScoresHome').addEventListener('click', function () {window.location.href = "/"});
    currgameindex = gamemodes.indexOf(document.querySelector('#txtgamemodenav').innerHTML);
    document.querySelector('#BtnNextGamemode').addEventListener('click', ShowNextGamemode);
    document.querySelector('#BtnPrevGamemode').addEventListener('click', ShowPrevGamemode);
}

const ShowNextGamemode = () => {
    currgameindex++;
    if (currgameindex == gamemodes.length ) {
        currgameindex = 0;
    }
    window.location.href = `/scores/${gamemodes[currgameindex]}`
}

const ShowPrevGamemode = () => {
    currgameindex--;
    if (currgameindex < 0) {
        currgameindex = (gamemodes.length - 1);
    }
    window.location.href = `/scores/${gamemodes[currgameindex]}`
}