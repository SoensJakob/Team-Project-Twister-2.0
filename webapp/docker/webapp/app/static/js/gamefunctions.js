/*------------------------------------*\
#Global Game Variables
\*------------------------------------*/
let gametimer     = 0;
let deadtimer     = 10
let mqttmssg      = "";
let colors        = ["yellow", "blue", "green", "red"]
let bodyparts     = ["left hand", "left foot", "right foot", "right hand"]
let scoreplayer1  = 1
let playerinfo    = {}
let players       = []
let currentplayerindex = 0
let playerscores  = []

const setoutmsg = function(out_msg){
    mqttmssg = out_msg;
}


/*------------------------------------*\
#Game Main
\*------------------------------------*/

const StartGame = function(){
    let gamemode = JSON.parse(localStorage.getItem('gamesettings')).gamemode;
    gametimer = JSON.parse(localStorage.getItem('gamesettings')).timer;
    for([key, val] of Object.entries(JSON.parse(localStorage.getItem('players')))) {
        playerinfo.push({
            key:   val,
            value: 0
        });
        players.push(val);
        playerscores.push(0);
    }
    switch(gamemode) {
        case "Twister-Classic":
            console.log("starting twister classic");
            Temp_TwisterClassic(gametimer);
            PlayTwister()
            break;
      
        case "Simon-says":
            console.log("starting simon says");
            break;

        default:
            alert("the chosen gamemode is not available");
            Temp_SelectGameOptions();
    }
}


/*------------------------------------*\
#Game Twister
\*------------------------------------*/

const PlayTwister = function(){
    mqttmssg = "";
    let twistermove   = NewTwisterMove();
    let currentplayer = players[currentplayerindex];
    document.querySelector("#twistermove").innerHTML = twistermove;
    document.querySelector("#currentplayer").innerHTML = currentplayer;

    var timeleft = 5;
    var TwisterTimer = setInterval(function(){
        document.getElementById("progressBar").value = timeleft;
        if (timeleft == 0) {
            // stopt de TwisterTimer
            clearInterval(TwisterTimer);

            // verwijder currentplayer naam en score uit array en v
            players.splice(currentplayer, 1);
            playerscores.splice(currentplayer, 1);

            if (!players.length) {
                Temp_EndGame();
                console.log("game done");
            }
            else{
                Temp_WaitingScreen(deadtimer, currentplayer);
            }
        }
        else if (mqttmssg['color'] == randColor) {
            clearInterval(downloadTimer);
            playerscores[currentplayerindex] += timeleft;
        }
        NextPlayer();
        timeleft -= 1;
    }, 1000);
}

const NewTwisterMove = function(){
    var randColor = colors[Math.floor(Math.random() * colors.length)];
    var randBodypart = bodyparts[Math.floor(Math.random() * bodyparts.length)];
    return `${randBodypart} ${randColor}`
}

const NextPlayer = function(){
    if (currentplayerindex < players.length) {
        currentplayer++;
    }
    else if(currentplayerindex == players.length) {
        currentplayer = 0;
    }
}