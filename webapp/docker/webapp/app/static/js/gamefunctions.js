/*------------------------------------*\
#Global Game Variables
\*------------------------------------*/
let gametimer     = 0;
// nog veranderen in productie
let deadtimer     = 3;
let mqttmssg      = "";
let colors        = ["yellow", "blue", "green", "red"];
let bodyparts     = ["left hand", "left foot", "right foot", "right hand"];
let player_info    = JSON.parse('{"playerinfo":[]}'); 
let playercount   = 0;
let currentplayerindex = 0;

const setoutmsg = function(out_msg){
    mqttmssg = out_msg;
    console.log(mqttmssg);
}


/*------------------------------------*\
#Game Main
\*------------------------------------*/

const StartGame = function(){
    let gamemode = JSON.parse(localStorage.getItem('gamesettings')).gamemode;
    gametimer = JSON.parse(localStorage.getItem('gamesettings')).timer;
    for([key, val] of Object.entries(JSON.parse(localStorage.getItem('players')))) {
        player_info['playerinfo'].push({'name': val, 'score': 0, 'alive':1});
        playercount++;
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
    let currentplayer = player_info.playerinfo[currentplayerindex].name;
    if (gametimer == null) {
        timeleft = 9999999999
    }
    document.querySelector("#twistermove").innerHTML = `${twistermove[0]} ${twistermove[1]}`;
    document.querySelector("#currentplayer").innerHTML = currentplayer;
    // nog wegdoen in productie
    let timeleft = 8;
    let TwisterTimer = setInterval(function(){
        document.querySelector("#progressBar").value = timeleft;
        if (timeleft == 0) {
            // stopt de TwisterTimer
            clearInterval(TwisterTimer);
            RemovePlayer();
            NextPlayer();
            CheckIfGameIsFinished(currentplayer);
        }
        else if (mqttmssg['color'] == 'green') { //twistermove[0]
            clearInterval(downloadTimer);
            player_info.playerinfo[currentplayerindex].score += timeleft;
            NextPlayer();
        }
        timeleft -= 1;
    }, 1000);
}

const NewTwisterMove = function(){
    var randColor = colors[Math.floor(Math.random() * colors.length)];
    var randBodypart = bodyparts[Math.floor(Math.random() * bodyparts.length)];
    return [randColor, randBodypart]
}

const NextPlayer = function(){
    currentplayerindex++;
    let alive = player_info.playerinfo[currentplayerindex - 1].alive;
    if (alive == 0) {
        currentplayerindex++;
    }
    else if(currentplayerindex == playercount) {
        currentplayerindex = 1;
    }
    console.log(player_info);
}

const RemovePlayer = function() {
    playercount--;
    player_info.playerinfo[currentplayerindex].alive = 0;
}

const CheckIfGameIsFinished = function(currentplayer){
    if (playercount == 0) {
        const fetch_param = {headers: { "content-type":"application/json; charset=UTF-8"}, body: JSON.stringify(playerinfo), method:"POST"}
        fetch('/scores', fetch_param)
        .catch(error=>console.log('main - CheckIfGameIsFinished error: failed to post json to flask'))
        // nog veranderen in productie
        //window.location.replace("/scores");
    }
    else{
        Temp_WaitingScreen(deadtimer, currentplayer);
    }
}