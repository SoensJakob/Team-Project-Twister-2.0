'use strict'

const StartGameTimer = 5;

document.addEventListener('DOMContentLoaded', function() {

    


    console.log('DOM geladen');
    init();
});

const init = function(){
    let randcolor = "yellow";
    document.querySelector("#imgtwisterlimb").src = `../static/img/left_foot-${(randcolor == "yellow") ? 'grey' : 'white'}.svg`;
}