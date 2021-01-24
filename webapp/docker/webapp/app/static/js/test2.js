document.addEventListener('DOMContentLoaded', function() {
    init();
});

const init = function(){
    if (localStorage.getItem('startup')) {
        console.log('startup skipped');
    }
    console.log('statrup staring')
}