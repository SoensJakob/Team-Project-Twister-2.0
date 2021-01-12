/*------------------------------------*\
#Global Game Variables
\*------------------------------------*/
let gametimer, playercount, currenplayercount;
let player_info = JSON.parse('{"playerinfo":[]}'); 

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
    let gamesettings = JSON.parse(localStorage.getItem('gamesettings'));
    let players = JSON.parse(localStorage.getItem('gameplayers'));
    for([key, val] of Object.entries(players)) {
        player_info['playerinfo'].push({'name': val, 'score': 0, 'alive':1});
        playercount++;
    }
    currenplayercount = playercount;
    //localStorage.removeItem("gameplayers");
    //localStorage.removeItem("gamesettings");
    switch(gamesettings.gamemode) {
        case "Twister-Classic":
            console.log("starting twister classic");
            SetupTwister(gamesettings);
            gametimer = gamesettings.timer * 10;
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

const SetupTwister = (gamesettings) => {
    gametimer = gamesettings.timer;
    if (gametimer){
        gametimer = gamesettings.time * 10;
        Temp_TwisterClassic((gametimer / 10));
    }
    else if (!gametimer) {
        gametimer = null;
        Temp_TwisterClassic(gametimer);
    }
    console.log(gametimer);
}

const PlayTwister = () => {
    mqttmssg = [];
    
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