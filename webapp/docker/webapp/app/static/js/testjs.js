'use strict'

const StartGameTimer = 5;

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM geladen');
    init();
});

const init = function(){
    let playerinfo = JSON.parse(localStorage.getItem('EndGame'));
    console.log(playerinfo);
    playerinfo[0].forEach(player => {
        console.log()
    });
}