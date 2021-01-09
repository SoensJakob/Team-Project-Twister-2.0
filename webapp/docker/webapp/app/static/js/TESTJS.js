'use strict'

let playerfield  = [['','','',''],
['','','',''],
['','','',''],
['','','',''],
['','','',''],
['','','','']                    
];

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM geladen');
    init();
});

const init = function(){
    setoutmsg();
}

const setoutmsg = (out_msg) => {
    out_msg = '{ "buttonreleased":[{"place":"1G", "color":"green", "limb":"right hand"}]}';
    let mqttobj = JSON.parse(out_msg);
    switch (Object.keys(mqttobj)[0]) {
        case 'buttonpressed':
            console.log('buttonpressed');
            break;
        case 'buttonreleased':
            console.log('buttonreleased');
            break;
    
        default:
            console.log("game - gamefunctions error: mqttobj error in setoutmsg");
            break;
    }
}