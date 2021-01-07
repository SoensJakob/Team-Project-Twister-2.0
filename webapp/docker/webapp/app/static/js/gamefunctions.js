/*------------------------------------*\
#Global Game Variables
\*------------------------------------*/
let gametimer     = 0;
// nog veranderen in productie
let deadtimer     = 3;
let mqttmssg      = JSON.parse('{ "buttonpressed":[{"place":"", "color":"", "limb":""}]}');
let colors        = ["yellow", "blue", "green", "red"];
let bodyparts     = ["left hand", "left foot", "right foot", "right hand"];
let player_info    = JSON.parse('{"playerinfo":[]}'); 
let playercount   = 0;
let currentplayerindex = 0;

const setoutmsg = (out_msg) => {
    //jsonstring twister example: jsonstring = '{ "buttonpressed":[{"place":"1G", "color":"green", "limb":"right hand"}]}';
    let mqttobj = JSON.parse(out_msg);
    if (mqttobj.buttonpressed) {
        mqttmssg = mqttobj.buttonpressed[0]
        
    }
    else if (!mqttobj.buttonreleased){
        console.log('buttonreleased');
    }
    else{
        console.log("game - gamefunctions error: mqttobj error in setoutmsg");
    }
}


/*------------------------------------*\
#Game Main
\*------------------------------------*/

const StartGame = () => {
    let gamemode = JSON.parse(localStorage.getItem('gamesettings')).gamemode;
    gametimer = (JSON.parse(localStorage.getItem('gamesettings')).timer) * 10;
    console.log(gametimer, " stargame")
    if (gametimer == null) {
        gametimer = 999999;
    }

    for([key, val] of Object.entries(JSON.parse(localStorage.getItem('players')))) {
        player_info['playerinfo'].push({'name': val, 'score': 0, 'alive':1});
        playercount++;
    }
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
    let TwisterTimer = setInterval(function(){
        document.querySelector("#progressBar").value =  Math.ceil(timeleft / 10);
        if (timeleft == 0) {
            clearInterval(TwisterTimer);
            RemovePlayer();
            CheckIfGameIsFinished(currentplayer);
        }
        else if (mqttmssg.color == twistermove[0]) {
            clearInterval(TwisterTimer);
            player_info.playerinfo[currentplayerindex].score += timeleft;
            NextPlayer();
            PlayTwister();
        }
        else if (mqttmssg.color != twistermove[0] && mqttmssg.color) {
            clearInterval(TwisterTimer);
            RemovePlayer();
            CheckIfGameIsFinished(currentplayer);
            NextPlayer();
        }
        timeleft -= 1;
    }, 100);
}

const NewTwisterMove = () => {
    var randColor = colors[Math.floor(Math.random() * colors.length)];
    var randBodypart = bodyparts[Math.floor(Math.random() * bodyparts.length)];
    return [randColor, randBodypart]
}

const NextPlayer = () => {
    console.log(currentplayerindex, ' old');
    if (currentplayerindex == playercount) {
        currentplayerindex = 0;
    }
    else{
        currentplayerindex++;
        if (currentplayerindex == playercount) {
            currentplayerindex = 0
        }
        if (player_info.playerinfo[currentplayerindex].alive == 0) {
            NextPlayer();
        }
    }
    console.log(currentplayerindex, ' new');
}

const RemovePlayer = () => {
    player_info.playerinfo[currentplayerindex].alive = 0;
    NextPlayer();
    playercount--;
}

const CheckIfGameIsFinished = function(currentplayer){
    if (playercount == 1) {
        //const fetch_param = {headers: { "content-type":"application/json; charset=UTF-8"}, body: JSON.stringify(player_info), method:"POST"}
        //fetch('/scores', fetch_param)
        //.catch(error=>console.log('main - CheckIfGameIsFinished error: failed to post json to flask'))
        // nog verwijderen in productie
        window.localStorage.setItem("EndGame", JSON.stringify(player_info));
        window.location.replace("/scores");
    }
    else{
        Temp_WaitingScreen(deadtimer, currentplayer);
    }
}