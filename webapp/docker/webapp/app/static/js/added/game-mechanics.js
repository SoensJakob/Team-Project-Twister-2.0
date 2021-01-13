/*------------------------------------*\
#Global Game Variables
\*------------------------------------*/

let timeleft = 0;
let gametimer = 0;
let playercount = 0;
let currenplayercount = 0;
let currentplayerindex = 0;
let colors = [];
let bodyparts = [];
let mqttmssg = ['', JSON.parse('{"place":"", "color":"", "limb":""}')];
let twisterboard = [
    [["",""],["",""],["",""],["",""]],
    [["",""],["",""],["",""],["",""]],
    [["",""],["",""],["",""],["",""]],
    [["",""],["",""],["",""],["",""]],
    [["",""],["",""],["",""],["",""]],
    [["",""],["",""],["",""],["",""]]
]
let player_info = JSON.parse('{"playerinfo":[]}'); 

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
            console.log("game - game-mechanics error: mqttobj error in setoutmsg");
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
            console.log("game - game-mechanics error: gamemode error in switch");
            Temp_SelectGameOptions();
    }
}

const SetupTwister = (gamesettings) => {
    gametimer = gamesettings.timer;
    colors = ["red", "blue", "yellow", "green"];
    bodyparts = ["left hand", "left foot", "right foot", "right hand"];
    (gametimer != 0) ? gametimer *= 10 : gametimer = null;
}

const PlayTwister = () => {
    // set variables
    mqttmssg = ['', JSON.parse('{"place":"", "color":"", "limb":""}')];
    timeleft = gametimer;
    let currentplayer = player_info.playerinfo[currentplayerindex].name;
    let randcolor = GetTwisterColor();
    let randbodypart = bodyparts[Math.floor(Math.random() * bodyparts.length)];
    let arrbodypart = randbodypart.split(" ");

    // load template
    Temp_TwisterClassic(gametimer, randcolor);

    // set innerhtml/vaslues temp_playtwister
    document.querySelector("#twistermovelimb").innerHTML = randbodypart;
    document.querySelector("#imgtwisterlimb").src = `../static/img/${arrbodypart[0]}_${arrbodypart[1]}-${(randcolor == "yellow") ? 'grey' : 'white'}.svg`;
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
        else if (mqttmssg[1].color == randcolor) {
            clearInterval(TwisterTimer);
            player_info.playerinfo[currentplayerindex].score += timeleft;
            NextPlayer(false);
            PlayTwister();
        }
        else if (mqttmssg[1].color && mqttmssg[1].color != randcolor) {
            clearInterval(TwisterTimer);
            NextPlayer(true);
            CheckIfGameIsFinished(currentplayer);
        }
        else if (mqttmssg[0] == "released") {
            console.log('btn released, remove player');
            // hier kijken welke plaats is ingedrukt en welke naam erop staat om die dan te verwijderen
            //NextPlayer(true);
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
    if (currenplayercount == 1) {
        player_info.playerinfo.sort(function (a, b) {
            return  b.score - a.score;
        });
        console.log(player_info);
        Temp_EndGame(player_info.playerinfo);
    }
    else{
        Temp_WaitingScreen((gametimer), currentplayer);
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