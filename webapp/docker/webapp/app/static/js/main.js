'use strict'

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM geladen');
    init();
});

const init = function(){
    if (localStorage.getItem('TutSkipped')) {
        Temp_Index();
        console.log('skipped');
    }
    else{
        Temp_TutorialPage1();
        console.log('not skipped');
    }
}