/*------------------------------------*\
#Global Game Variables
\*------------------------------------*/
let gametimer     = 0;
// nog veranderen in productie
let deadtimer           = 3;
let playercount         = 0;
let currenplayercount   = 0;
let currentplayerindex  = 0;
let mqttmssg            = [];
let colors              = ["yellow", "blue", "green", "red"];
let bodyparts           = ["left hand", "left foot", "right foot", "right hand"];
let player_info         = JSON.parse('{"playerinfo":[]}'); 

const setoutmsg = (out_msg) => {
    //jsonstring twister example: jsonstring = '{ "buttonpressed":[{"place":"1", "color":"green", "limb":"right hand"}]}';
    let mqttobj = JSON.parse(out_msg);
    switch (Object.keys(mqttobj)[0]) {
        case 'buttonpressed':
            mqttmssg = ["pressed", mqttobj.buttonpressed[0]];
            break;
        case 'buttonreleased':
            mqttmssg = ["released", mqttobj.buttonpressed[0]];
            break;
    
        default:
            console.log("game - gamefunctions error: mqttobj error in setoutmsg");
            break;
    }
}


/*------------------------------------*\
#Game Main
\*------------------------------------*/

const StartGame = () => {
    let gamemode = JSON.parse(localStorage.getItem('gamesettings')).gamemode;
    gametimer = (JSON.parse(localStorage.getItem('gamesettings')).timer) * 10;

    for([key, val] of Object.entries(JSON.parse(localStorage.getItem('players')))) {
        player_info['playerinfo'].push({'name': val, 'score': 0, 'alive':1});
        playercount++;
    }
    currenplayercount = playercount;
    localStorage.removeItem("players");
    switch(gamemode) {
        case "Twister-Classic":
            console.log("starting twister classic");
            Temp_TwisterClassic((gametimer / 10));
            PlayTwister();
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

const PlayTwister = () => {
    mqttmssg = "";
    
    let twistermove   = NewTwisterMove();
    let currentplayer = player_info.playerinfo[currentplayerindex].name;
    
    document.querySelector("#currentplayer").innerHTML = currentplayer;
    document.querySelector("#twistermove").innerHTML = `${twistermove[0]} ${twistermove[1]}`;
    
    let timeleft = gametimer;
    if (timeleft == null) {
        timeleft = 10;
    }
    
    
    let TwisterTimer = setInterval(function(){
        document.querySelector("#progressBar").value =  Math.ceil(timeleft / 10);
        if (timeleft == 0) {
            clearInterval(TwisterTimer);
            NextPlayer(true);
            CheckIfGameIsFinished(currentplayer);
        }
        else if (mqttmssg[1].color == twistermove[0]) {
            clearInterval(TwisterTimer);
            player_info.playerinfo[currentplayerindex].score += timeleft;
            NextPlayer(false);
            PlayTwister();
        }
        else if (mqttmssg[1].color && mqttmssg.color[1] != twistermove[0]) {
            clearInterval(TwisterTimer);
            CheckIfGameIsFinished(currentplayer);
            NextPlayer(true);
        }
        else if (mqttmssg[0] == "released") {
            // hier kijken welke plaats is ingedrukt en welke naam erop staat om die dan te verwijderen
            NextPlayer(true);
        }

        if (timeleft != null) {
            timeleft -= 1;
        }
    }, 100);
}

const PlayMemmory = () => {

}

const NewTwisterMove = () => {
    var randColor = colors[Math.floor(Math.random() * colors.length)];
    var randBodypart = bodyparts[Math.floor(Math.random() * bodyparts.length)];
    return [randColor, randBodypart]
}

const NextPlayer = (dead) => {
    if (dead) {
        player_info.playerinfo[currentplayerindex].alive = 0;
        currenplayercount--;
    }
    currentplayerindex++;
    if (currentplayerindex == playercount) {
        currentplayerindex = 0;
    }
    if (player_info.playerinfo[currentplayerindex].alive == 0) {
        NextPlayer();
    }
}

const CheckIfGameIsFinished = function(currentplayer){
    if (currenplayercount == 1) {
        //window.localStorage.setItem("EndGame", JSON.stringify(player_info));
        player_info.sort(function (key, value) {
            return a.name.localeCompare(value.score);
        });
        Temp_EndGame(player_info);
    }
    else{
        Temp_WaitingScreen(deadtimer, currentplayer);
    }
}