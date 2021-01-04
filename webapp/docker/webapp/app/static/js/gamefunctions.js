/*------------------------------------*\
#Global Game Variables
\*------------------------------------*/
let timer         = 0;
let mqttmssg      = "";
let colors        = ["yellow", "blue", "green", "red"]
let bodyparts     = ["left hand", "left foot", "right foot", "right hand"]
let scoreplayer1  = 1
let currentplayer = 1

const setoutmsg = function(out_msg){
    mqttmssg = out_msg;
}


/*------------------------------------*\
#Game Main
\*------------------------------------*/

const StartGame = function(){
    let gamemode = JSON.parse(localStorage.getItem('gamesettings')).gamemode;
    timer = JSON.parse(localStorage.getItem('gamesettings')).timer;
    switch(gamemode) {
        case "Twister-Classic":
            console.log("starting twister classic");
            Temp_TwisterClassic();
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
    let currplayername = JSON.parse(localStorage.getItem('players'))['player' + currentplayer];
    let twistermove = NewTwisterMove();
    document.querySelector("#twistermove").innerHTML = twistermove;
    document.querySelector("#currentplayer").innerHTML = currplayername;

    var timeleft = 10;
    var TwisterTimer = setInterval(function(){
        if (timeleft == 0) {
            clearInterval(TwisterTimer);
            Temp_WaitingScreen(10, currplayername);
            localStorage.removeItem('players')['player' + currentplayer];
        }
        document.getElementById("progressBar").value = timeleft;
        timeleft -= 1;
    }, 1000);
}

const NewTwisterMove = function(){
    var randColor = colors[Math.floor(Math.random() * colors.length)];
    var randBodypart = bodyparts[Math.floor(Math.random() * bodyparts.length)];
    return `${randBodypart} ${randColor}`
}

const NextPlayer = function(){
    if (currentplayer < Object.keys(JSON.parse(localStorage.getItem('players'))).length) {
        currentplayer++;
    }
    else if(currentplayer == Object.keys(JSON.parse(localStorage.getItem('players'))).length) {
        currentplayer = 1;
    }
}