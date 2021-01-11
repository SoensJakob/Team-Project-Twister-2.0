/*------------------------------------*\
#Global variables for Game Validations
\*------------------------------------*/
// nog veranderen in productie
const TimerStartGame = 5;

/*------------------------------------*\
#Game Validations
\*------------------------------------*/

const ValidatePlayers = () => {
    let players = {};
    let val_players = true;
    let inputplayers = document.getElementsByName("playername");
    for (let i = 0; i < inputplayers.length; i++){
        if (inputplayers[i].value != "") {
            players[`player${i + 1}`] = inputplayers[i].value;
        }
        else{
            val_players = false;
            Temp_SelectPlayers();
            alert("one or more players name(s) isn't valid");
        }
    }
    if (val_players) {
        window.localStorage.setItem("players", JSON.stringify(players));
        Temp_SelectGameOptions();
    }
}

const ValidateGameSettings = () => {
    let gamesettings = {};
    gamesettings['gamemode'] = document.querySelector("#GameMode").value;
    gamesettings['timer'] = document.querySelector("#GameTimer").value;
    console.log(document.querySelector("#GameTimer").value);
    gamesettings['actions'] = document.querySelector("#GameActions").value;
    window.localStorage.setItem("gamesettings", JSON.stringify(gamesettings));
    Temp_WaitingScreen(TimerStartGame, null);
}

