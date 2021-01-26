/*------------------------------------*\
#Global Game Variables
\*------------------------------------*/

let timeleft = 0;
let gametimer = 0;
let playercount = 0;
let currenplayercount = 0;
let currentplayerindex = 0;
let gamecolors = [];
let bodyparts = [];
let memorylevel = 0;
let memoryseqs = JSON.parse('{"playerseq":[]}'); 
let mqttmssg = {"":[{"row": "", "col": ""}]};
let twisterboard = [
    [["",""],["",""],["",""],["",""],["",""],["",""]],
    [["",""],["",""],["",""],["",""],["",""],["",""]],
    [["",""],["",""],["",""],["",""],["",""],["",""]],
    [["",""],["",""],["",""],["",""],["",""],["",""]] 
]
let player_info = JSON.parse('{"gamemode": "", "playerinfo":[]}'); 

const setoutmsg = (out_msg) => {
    //jsonstring twister example: jsonstring = '{ "buttonpressed":[{"row":"1", "column":"0"}]}';
    let mqttobj = JSON.parse(out_msg);
    switch (Object.keys(mqttobj)[0]) {
        case 'buttonpressed':
            mqttmssg = ["pressed", mqttobj.buttonpressed[0]];
            break;
        case 'buttonreleased':
            mqttmssg = ["released", mqttobj.buttonreleased[0]];
            break;
        case 'row':
            mqttmssg = ['', JSON.parse('{"row":"", "column":""}')];
            break;
        default:
            console.log("game - game-mechanics error: mqttobj error in setoutmsg");
            break;
    }
}

function colourNameToHex(color)
{
    let colors = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"};

    if (typeof colors[color.toLowerCase()] != 'undefined')
        return colors[color.toLowerCase()];

    return false;
}

/*------------------------------------*\
#Game Main
\*------------------------------------*/

const StartGame = () => {     
    let gamesettings = JSON.parse(localStorage.getItem('gamesettings'));
    let players = JSON.parse(localStorage.getItem('gameplayers'));
    player_info['gamemode'] = gamesettings.gamemode;
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
      
        case "Memory":
            console.log("starting memory");
            SetupMemory(players, gamesettings);
            PlayMemory();
            break;

        default:
            console.log("game - game-mechanics error: gamemode error in switch");
            Temp_SelectGameOptions();
    }
}

const SetupTwister = (gamesettings) => {
    gametimer = gamesettings.timer;
    (gametimer != 0) ? gametimer *= 10 : gametimer = null;
    gamecolors = ["red", "blue", "yellow", "green"];
    bodyparts = ["linker hand", "linker voet", "rechter voet", "rechter hand"];
}

const SetupMemory = (players, gamesettings) => {
    gametimer = gamesettings.timer;
    (gametimer != 0) ? gametimer *= 10 : gametimer = null;
    for([key, val] of Object.entries(players)) {
        memoryseqs['playerseq'].push({'name': val, 'col': [Math.floor(Math.random() * Math.floor(6)) + 1], 'row': [Math.floor(Math.random() * Math.floor(4)) + 1]});
    }
    Temp_Memory(gametimer);
}

const PlayTwister = () => {
    // set variables
    mqttmssg = ['', JSON.parse('{"row":"", "column":""}')];
    timeleft = gametimer;
    let currentplayer = player_info.playerinfo[currentplayerindex].name;
    let randcolor = GetTwisterColor();
    let colorindex = gamecolors.indexOf(randcolor);
    let randbodypart = bodyparts[Math.floor(Math.random() * bodyparts.length)];
    let arrbodypart = randbodypart.split(" ");
    
    //send mqtt mssg to hardware to enable buttons
    send_message(`{"row": "${colorindex + 1}", "column": 0, "color": "${colourNameToHex(randcolor)}", "player":"${currentplayer}","limb": "${randbodypart}"}`);

    // load template
    Temp_TwisterClassic(gametimer, randcolor);

    // set innerhtml/vaslues temp_playtwister
    document.querySelector("#twistermovelimb").innerHTML = randbodypart;
    document.querySelector("#imgtwisterlimb").src = `../static/img/${arrbodypart[0]}_${arrbodypart[1]}-${(randcolor == "yellow") ? 'grey' : 'white'}.svg`;
    document.querySelector("#twistermovecolor").innerHTML = ColorEngToNed(randcolor); //hier andre kleur
    document.querySelector("#currentplayer").innerHTML = currentplayer;
    document.querySelector(':root').style.setProperty('--global-gamecolor', `var(--global-color-${randcolor}-dark)`);
    document.querySelector(':root').style.setProperty('--global-gamecolor-border', `var(--global-color-${randcolor}-darkest)`);
    
    let TwisterTimer = setInterval(function(){
        if (timeleft) {
            document.querySelector("#progressBar").value =  timeleft / 10;
            document.querySelector("#progressBarnumber").innerHTML =  Math.ceil(timeleft / 10);
        }
        if (timeleft == 0) {
            clearInterval(TwisterTimer);
            NextPlayer(true);
        }
        else if (mqttmssg[1].row == (colorindex + 1)) {
            clearInterval(TwisterTimer);
            player_info.playerinfo[currentplayerindex].score += timeleft;
            NextPlayer(false);
            PlayTwister();
        }
        // if gametimer is set -> countdown
        if (timeleft) { timeleft--; }
    }, 100);
}

const ColorEngToNed = (color) => {
    switch (color) {
        case "red":
            return "rood"
            break;
        case "blue":
            return "blauw"
            break;
        case "yellow":
            return "geel"
            break;
        case "green":
            return "groen"
            break;
    
        default:
            break;
    }
}

const PlayMemory = () => {
    // set variables
    mqttmssg = ['', JSON.parse('{"row":"", "column":""}')];
    currentplayer = player_info.playerinfo[currentplayerindex].name;

    // set innerhtml/vaslues Temp_Memory
    document.querySelector('#memory-currplayer').innerHTML = currentplayer;
    document.querySelector('#memory-lvl').innerHTML =  `lvl: ${memoryseqs.playerseq[currentplayerindex]['col'].length}`;

    ShowMemorySeq();
}

const NextPlayer = (dead) => {
    if (dead) {
        player_info.playerinfo[currentplayerindex].alive = 0;
        currenplayercount--;
        if (currenplayercount == 0) { // 0 wil zeggen hoeveel players er nog mogen overblijven vooraleer game stopt
            console.log('no players left');
            EndGame();
        }
        else{
            Temp_WaitingScreen(gametimer, player_info.playerinfo[currentplayerindex].name, player_info.gamemode, gametimer);
            NextPlayer(false);
        }
    }
    else{
        currentplayerindex++;
        if (currentplayerindex == playercount) {
            currentplayerindex = 0;
        }
        if (player_info.playerinfo[currentplayerindex].alive == 0) {
            NextPlayer(false);
        }
    }
}

const EndGame = () => {
    player_info.playerinfo.sort(function (a, b) {
        return  b.score - a.score;
    });
    fetch(`/scores/${player_info.gamemode}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(player_info)
    }).then(function (response) {
        return response.text();
    }).then(function (text) {
        if (text != "succes") {
            alert('scores not saved')
            console.log('game - gamemechanics warning: scores are not saved');
        }
    });
    Temp_EndGame(player_info.playerinfo);
}

const GetTwisterColor = () => {
    let countbtnused = 0;
    let randindex = Math.floor(Math.random() * gamecolors.length)
    twisterboard.forEach(row => {
        if (row[randindex][0]) {
            countbtnused++;
        }
    });
    if (countbtnused == 6) {GetTwisterColor()}
    else { return gamecolors[randindex]}
}

const AddMemoryBtn = () => {
    let randcol = Math.floor(Math.random() * Math.floor(6)) + 1;
    let randrow = Math.floor(Math.random() * Math.floor(4)) + 1;
    memoryseqs.playerseq[currentplayerindex]['col'].push(randcol);
    memoryseqs.playerseq[currentplayerindex]['row'].push(randrow);
}

const ShowMemorySeq = () => {
    let seqindex = 0;
    let seqcol= memoryseqs.playerseq[currentplayerindex]['col'];
    let seqrow = memoryseqs.playerseq[currentplayerindex]['row'];
    let TempMemoryTimer = setInterval(function(){ 
        document.querySelector(`#memory-${seqrow[seqindex]}${seqcol[seqindex]}`).classList.add("c-memory-active");
        setTimeout(function(){
          document.querySelector(`#memory-${seqrow[seqindex]}${seqcol[seqindex]}`).classList.remove("c-memory-active");
          seqindex++;
        },1000)
        if (seqindex == (seqcol.length - 1)) {
            clearInterval(TempMemoryTimer);
            ListenMemorySeq();
        }
     },2000);
}

const ListenMemorySeq = () => {
    let seqindex = 0;
    timeleft = gametimer; // = 10 sec

    //send mqtt mssg to hardware to enable buttons
    send_message(`{"row": "${memoryseqs.playerseq[currentplayerindex]['row'][seqindex]}", "column": ${memoryseqs.playerseq[currentplayerindex]['col'][seqindex]}, "color": null, "player":"${currentplayer}","limb": null}`);
    let MemoryTimer = setInterval(function(){
        if (timeleft) {
            document.querySelector("#progressBarnumber").innerHTML =  Math.ceil(timeleft / 10);
        }
        if (timeleft == 0) {
            clearInterval(MemoryTimer);
            console.log('player dead');
            NextPlayer(true);
        }
        if (mqttmssg[1].row == memoryseqs.playerseq[currentplayerindex]['row'][seqindex] && mqttmssg[1].column == memoryseqs.playerseq[currentplayerindex]['col'][seqindex]) {
            if ((seqindex + 1) == memoryseqs.playerseq[currentplayerindex]['row'].length) {
                clearInterval(MemoryTimer);
                console.log('memory - correct hit');
                document.querySelector("#progressBarnumber").innerHTML =  "";
                AddMemoryBtn();
                player_info.playerinfo[currentplayerindex].score += 1;
                memorylevel++;
                NextPlayer(false);
                PlayMemory();
            }
            else{
                seqindex++;
                send_message(`{"row": "${memoryseqs.playerseq[currentplayerindex]['row'][seqindex]}", "column": ${memoryseqs.playerseq[currentplayerindex]['col'][seqindex]}, "color": null, "player":"${currentplayer}","limb": null}`);
            }
        }
        // if gametimer is set -> countdown
        if (timeleft) { timeleft--; }
    }, 100);
}

const StopMemoryTimers = () => {
    try {
        clearInterval(TempMemoryTimer);
    } catch (error) {
    }
    try {
        clearInterval(MemoryTimer);
    } catch (error) {
        
    }
    
}