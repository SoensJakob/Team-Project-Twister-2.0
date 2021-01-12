'use strict'

const StartGameTimer = 5;

document.addEventListener('DOMContentLoaded', function() {

    


    console.log('DOM geladen');
    init();
});

const init = function(){
    localStorage.setItem('EndGame', '{"playerinfo":[{"name":"a","score":79,"alive":0},{"name":"b","score":254,"alive":1},{"name":"c","score":205,"alive":0}]}');
    let player_info = JSON.parse(localStorage.getItem('EndGame'));
    player_info.playerinfo.sort(function (a, b) {
        return  b.score - a.score;
    });
    console.log(player_info);
    Temp_EndGame(player_info.playerinfo);
}

const Temp_EndGame = (player_info) => {
    document.querySelector('#gamewindow').innerHTML = `
        <table id="scoreboard">
            <tr>
                <th>name</th>
                <th>score</th>
                <th>place</th>
            </tr>
        </table>
    `;
    player_info.forEach(player => {
        document.querySelector('#scoreboard').innerHTML += `
            <tr>
                <td>${player.name}</td>
                <td>${player.score}</td>
                <td>${player.index}</td>
            </tr>
        `;
    });
}