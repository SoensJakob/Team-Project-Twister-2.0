const ValidatePlayers = function(){
    let players = [];
    let currplayer;;
    let inputplayers = document.getElementsByName("players");
    for (let i = 0; i < inputplayers.length; i++){
        playername = inputplayers[i].value;
        players.push({
            key:   i,
            value: playername
        });
    }
    window.localStorage.setItem("players", JSON.stringify(players));
    SelectGameOptions();
}

const ValidateGameSettings = function(){
    let gamemode = document.getElementById("gamemodes").value;
    let timer = document.getElementById("timer").value;
    let actions = document.getElementById("actions").value;
    console.log(gamemode);
    console.log(timer);
    console.log(actions);
    alert(gamemode, timer, actions);
}