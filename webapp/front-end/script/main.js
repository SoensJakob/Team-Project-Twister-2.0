'use strict'

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM geladen');
    init();
});

const init = function(){
    document.querySelector("#btn").addEventListener("click", togglemenu);
    
}

const togglemenu = function(){
    var nav = document.querySelector("#nav"),
		btn = document.querySelector("#btn");
	nav.classList.toggle("open");
	btn.classList.toggle("is-active");
}