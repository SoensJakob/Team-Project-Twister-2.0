/*------------------------------------*\
#Global variables for Game Validations
\*------------------------------------*/

const TimerStartGame = 5;
let maxplayers = 0;

/*------------------------------------*\
#Template Validations
\*------------------------------------*/

const ValidateGameSettings = () => {
    let gamesettings = {};
    let gamemode = document.querySelector("#GameMode").value;
    switch (gamemode) {
        case "Twister-Classic":
            gamesettings['gamemode'] = gamemode;
            gamesettings['timer'] = document.querySelector("#GameTimer").value;
            gamesettings['actions'] = document.querySelector("#GameActions").value;
            maxplayers = 4;
            break;
    
        default:
            console.log("initgame - validation error: gamemode error in validategamesettings");
            break;
    }
    localStorage.setItem("gamesettings", JSON.stringify(gamesettings));
    Temp_SelectPlayers(maxplayers);
    console.log('end of validation gamesettings');
}

const ValidatePlayers = () => {
    let gameplayers = {};
    let boolvalidation = false;
    let inputplayers = document.getElementsByName("playername");
    for (let i = 0; i < inputplayers.length; i++) {
        if (!inputplayers[i].value) {
            boolvalidation = true;
            Temp_SelectPlayers(maxplayers);
            alert("one or more players name(s) isn't valid");
            break;
        }
        gameplayers[`player${i + 1}`] = inputplayers[i].value;
    }
    if (!boolvalidation) {
        localStorage.setItem("gameplayers", JSON.stringify(gameplayers));
        // nog veranderen in productie
        window.location.href = "/templates/game.html"; 
    }
}