/*------------------------------------*\
#Global Game Variables
\*------------------------------------*/

let mqttmssg = ['',''];
let twisterboard = [
    [["",""],["",""],["",""],["",""]],
    [["",""],["",""],["",""],["",""]],
    [["",""],["",""],["",""],["",""]],
    [["",""],["",""],["",""],["",""]],
    [["",""],["",""],["",""],["",""]],
    [["",""],["",""],["",""],["",""]]
]
let currentplayerindex = 0;
let player_info = JSON.parse('{"playerinfo":[]}'); 
let gametimer, timeleft, playercount, currenplayercount, bodyparts, colors;

const setoutmsg = (out_msg) => {
    //jsonstring twister example: jsonstring = '{ "buttonpressed":[{"place":"1", "color":"green", "limb":"right hand"}]}';
    let mqttobj = JSON.parse(out_msg);
    switch (Object.keys(mqttobj)[0]) {
        case 'buttonpressed':
            mqttmssg = ["pressed", mqttobj.buttonpressed[0]];
            break;
        case 'buttonreleased':
            mqttmssg = ["released", mqttobj.buttonreleased[0]];
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
    colors = ["red", "blue", "yellow", "green"];
    bodyparts = ["left hand", "left foot", "right foot", "right hand"];
    if (gametimer != 0){
        gametimer *= 10;
        Temp_TwisterClassic((gametimer / 10));
    }
    else if (gametimer == 0) {
        gametimer = null;
        Temp_TwisterClassic(gametimer);
        console.log('gametimer is not set:', gametimer);
    }
    else{
        console.log()
    }
    timeleft = gametimer;
}

const PlayTwister = () => {
    // set variables
    mqttmssg = [];
    let currentplayer = player_info.playerinfo[currentplayerindex].name;
    let randcolor = GetTwisterColor();
    let randbodypart = bodyparts[Math.floor(Math.random() * bodyparts.length)];
    let arrbodypart = randbodypart.split(" ");

    // set innerhtml/vaslues temp_playtwister
    document.querySelector("#twistermovelimb").innerHTML = randbodypart;
    document.querySelector("#imgtwisterlimb").src = `../static/img/${arrbodypart[0]}_${arrbodypart[1]}.svg`;
    document.querySelector("#twistermovecolor").innerHTML = randcolor;
    document.querySelector("#currentplayer").innerHTML = currentplayer; 
    
    let TwisterTimer = setInterval(function(){
        if (timeleft) {
            document.querySelector("#progressBar").value =  Math.ceil(timeleft / 10);
            document.querySelector("#progressBarnumber").innerHTML =  Math.ceil(timeleft / 10);
        }
        
        if (timeleft == 0) {
            clearInterval(TwisterTimer);
            NextPlayer(true);
            CheckIfGameIsFinished(currentplayer);
        }
        
        // if gametimer is set -> countdown
        if (timeleft) {
            timeleft -= 1;
        }
    }, 100);
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
    if (currenplayercount == 0) {
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

const GetTwisterColor = () => {
    let countbtnused = 0;
    let randindex = Math.floor(Math.random() * colors.length)
    twisterboard.forEach(row => {
        if (row[randindex][0]) {
            countbtnused++;
        }
    });
    if (countbtnused == 6) {GetTwisterColor()}
    else { return colors[randindex]}
}