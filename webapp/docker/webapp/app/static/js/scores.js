'use strict'

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM geladen');
    init();
});

const init = function(){
    const playerinfo = JSON.parse(localStorage.getItem('EndGame'))
    console.log(playerinfo.playerinfo[0].name);
    for (let index = 0; index < Object.keys(playerinfo['playerinfo']).length; index++) {
        document.querySelector('#scoreboard').innerHTML += `
            <tr>
                <td>${index}</td>
                <td>${playerinfo.playerinfo[index].name}</td>
                <td>${playerinfo.playerinfo[index].score}</td>
            </tr>
        `;
    }
}