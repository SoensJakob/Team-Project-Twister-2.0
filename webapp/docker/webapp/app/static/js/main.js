'use strict'

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM geladen');
    serverUrl = document.querySelector('#mqttip').innerHTML;
    topic = "/twisterspeaker";
    init();
});

const init = function(){
    MQTTconnect();
    if (localStorage.getItem('TutSkipped')) {
        Temp_Index();
        console.log('skipped');
    }
    else{
        Temp_TutorialPage1();
        console.log('not skipped');
    }
}