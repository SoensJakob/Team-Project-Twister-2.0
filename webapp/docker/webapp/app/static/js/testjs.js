'use strict'

const StartGameTimer = 5;

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM geladen');
    init();
});

const init = function(){
    let bodyparts = ["left hand", "left foot", "right foot", "right hand"];
    let randBodypart = bodyparts[Math.floor(Math.random() * bodyparts.length)];
    let arrbodypart = randBodypart.split(" ");
    document.querySelector("#imgtwisterlimb").src = `../static/img/${arrbodypart[0]}_${arrbodypart[1]}.svg`;
}