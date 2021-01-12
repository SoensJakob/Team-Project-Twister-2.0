/*------------------------------------*\
#Global Game Variables
\*------------------------------------*/
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
    

    for([key, val] of Object.entries(JSON.parse(localStorage.getItem('players')))) {
        player_info['playerinfo'].push({'name': val, 'score': 0, 'alive':1});
        playercount++;
    }
    currenplayercount = playercount;
    localStorage.removeItem("players");
    switch(gamemode) {
        case "Twister-Classic":
            console.log("starting twister classic");
            let gametimer = (JSON.parse(localStorage.getItem('gamesettings')).timer) * 10;
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