const ValidatePlayers = function(){
    let players = [];
    let val_players = true;
    let inputplayers = document.getElementsByName("players");
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
        Temp_SelectGameOptions();
    }
    else{
        Temp_SelectPlayers();
        alert("one or more players name(s) isnt valid")
    }
}

const ValidateGameSettings = function(){
    let gamemode = document.getElementById("gamemodes").value;
    let timer = document.getElementById("timer").value;
    let actions = document.getElementById("actions").value;
    switch(gamemode) {
        case "Twister-Classic":
            console.log("starting twister classic");
            Temp_TwisterClassic();
            StartTest()
            break;
      
        case "Simon-says":
            console.log("starting simon says");
            break;

        default:
            alert("the chosen gamemode is not available");
            Temp_SelectGameOptions();
       }
    
}