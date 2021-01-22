/*------------------------------------*\
#Global variables for Game Validations
\*------------------------------------*/

const TimerStartGame = 5;

/*------------------------------------*\
#Template Validations
\*------------------------------------*/

const ValidateGameSettings = () => {
    let gamesettings = {};
    let minplayers = 0;
    let maxplayers = 0;
    let gamemode = document.querySelector("#GameMode").value;
    switch (gamemode) {
        case "Twister-Classic":
            gamesettings['gamemode'] = gamemode;
            gamesettings['timer'] = document.querySelector("#GameTimer").value;
            minplayers = 2;
            maxplayers = 4;
            break;
        case "Memory":
            gamesettings['gamemode'] = gamemode;
            minplayers = 1;
            maxplayers = 1;
            break;
    
        default:
            console.log("initgame - validation error: gamemode error in validategamesettings");
            break;
    }
    localStorage.setItem("gamesettings", JSON.stringify(gamesettings));
    Temp_SelectPlayers(minplayers, maxplayers);
}

const ValidatePlayers = (minplayers, maxplayers) => {
    let gameplayers = {};
    let boolvalidation = false;
    let inputplayers = document.getElementsByName("playername");
    for (let i = 0; i < inputplayers.length; i++) {
        if (!inputplayers[i].value) {
            boolvalidation = true;
            Temp_SelectPlayers(minplayers, maxplayers);
            alert("one or more players name(s) isn't valid");
            break;
        }
        gameplayers[`player${i + 1}`] = inputplayers[i].value;
    }
    if (!boolvalidation) {
        localStorage.setItem("gameplayers", JSON.stringify(gameplayers));
        window.location.href = "/game"; 
    }
}