'use strict'

let jsonstring = '{ "buttonpressed":[{"place":"1G", "color":"green", "limb":"right hand"}]}';

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM geladen');
    init();
});

const init = function(){
    let mqttobj = JSON.parse(jsonstring);
    if (mqttobj.buttonpressed) {
        console.log('buttonpressed');
    }
    else if (!mqttobj.buttonpressed){
        console.log('buttonreleased');
    }
    else{
        console.log("failed");
    }
    let test = mqttobj.buttonpressed[0]
    let color = test.color;
    console.log(color);
}