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
}


/*------------------------------------*\
#Game Main
\*------------------------------------*/

const StartGame = () => {
    let gamemode = JSON.parse(localStorage.getItem('gamesettings')).gamemode;
    gametimer = JSON.parse(localStorage.getItem('gamesettings')).timer;
    for([key, val] of Object.entries(JSON.parse(localStorage.getItem('players')))) {
        player_info['playerinfo'].push({'name': val, 'score': 0, 'alive':1});
        playercount++;
    }
    localStorage.removeItem("players");
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

const PlayTwister = () => {
    let twistermove   = NewTwisterMove();
    let currentplayer = player_info.playerinfo[currentplayerindex].name;
    if (gametimer == null) {
        timeleft = 9999999999
    }
    document.querySelector("#twistermove").innerHTML = `${twistermove[0]} ${twistermove[1]}`;
    document.querySelector("#currentplayer").innerHTML = currentplayer;
    // nog veranderen in productie
    let timeleft = 100;
    let TwisterTimer = setInterval(function(){
        document.querySelector("#progressBar").value =  Math.ceil(timeleft / 10);
        if (timeleft == 0) {
            // stopt de TwisterTimer
            clearInterval(TwisterTimer);
            RemovePlayer();
            CheckIfGameIsFinished(currentplayer);
            NextPlayer();
        }
        else if (mqttmssg == 'green') { //mqttmssg['color'] == twistermove[0]
            clearInterval(TwisterTimer);
            mqttmssg = "";
            player_info.playerinfo[currentplayerindex].score += timeleft;
            NextPlayer();
            PlayTwister();
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
    if (currentplayerindex == playercount) {
        currentplayerindex = 0;
    }
    else{
        currentplayerindex++;
        if (player_info.playerinfo[currentplayerindex].alive == 0) {
            NextPlayer();
        }
    }
}

const RemovePlayer = () => {
    playercount--;
    player_info.playerinfo[currentplayerindex].alive = 0;
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