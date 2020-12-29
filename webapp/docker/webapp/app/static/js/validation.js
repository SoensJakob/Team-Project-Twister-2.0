const ValidatePlayers = function(){
    let players = [];
    let val_players = true;
    let inputplayers = document.getElementsByName("playername");
    for (let i = 0; i < inputplayers.length; i++){
        if (inputplayers[i].value != "") {
            players.push({
                key:   "player" + (i + 1),
                value: inputplayers[i].value
            });
        }
        else{
            val_players = false;
        }
    }
    if (val_players) {
        console.log(players);
        window.localStorage.setItem("players", JSON.stringify(players));
    }
    else{
        Temp_SelectPlayers();
        alert("one or more players name(s) isnt valid")
    }
}