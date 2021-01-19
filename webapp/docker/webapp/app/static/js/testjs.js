'use strict'

const StartGameTimer = 5;
let memoryarr = {"row": [], "col": []};
let memoryindex = 0;
let timeleft = 0;
let out_msg = '{"buttonpressed":[{"row": "", "col": ""}]}';
let mqttmssg = [];

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM geladen');
    init();
});

const init = function(){
    let mqttobj = JSON.parse(out_msg);
    switch (Object.keys(mqttobj)[0]) {
        case 'buttonpressed':
            mqttmssg = ["pressed", mqttobj.buttonpressed[0]];
            break;
        case 'buttonreleased':
            mqttmssg = ["released", mqttobj.buttonreleased[0]];
            break;
    
        default:
            console.log("game - game-mechanics error: mqttobj error in setoutmsg");
            break;
    }
    console.log(mqttmssg);
}