'use strict'

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM geladen');
    init();
});

const init = function(){
    window.onload = Temp_SelectPlayers;
}