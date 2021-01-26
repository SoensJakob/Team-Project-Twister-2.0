'use strict'

let twisterboard = [
    [["robbe","left","hand"],["","",""],["","",""],["","",""],["","",""],["","",""]],
    [["shiangi","left","hand"],["","",""],["","",""],["","",""],["","",""],["","",""]],
    [["","",""],["shiangi","left","hand"],["","",""],["","",""],["","",""],["","",""]],
    [["","",""],["","",""],["","",""],["","",""],["","",""],["","",""]]
];

let iets = {"playerinfo":[{"name":"a","score":0,"alive":0},{"name":"b","score":0,"alive":0},{"name":"c","score":0,"alive":1}]}
let gamecolors = ["red", "blue", "yellow", "green"];
let bodyparts = ["left hand", "left foot", "right foot", "right hand"];
let mqttmssg = {"":[{"row": "", "col": ""}]};
let currplayerindex = 0;
let arraybodypart = ["left", "hand"]
let gamemode = "twister";


document.addEventListener('DOMContentLoaded', function() {
    let players = iets['playerinfo'];
    let randindex = Math.floor(Math.random() * gamecolors.length)
    init();
    let newmqqtmssg = setInterval(function() {
        mqttmssg = {"":[{"row": Math.floor(Math.random() * 4) + 1, "col": Math.floor(Math.random() * 6) + 1}]};
    }, 1000);
});

const init = function(){
    let randbodypart = bodyparts[Math.floor(Math.random() * 4)];
    let arrbodypart = randbodypart.split(" ");
    let randcolor = GetTwisterColor();


    let timeleft = 5;
    let timernextplayer = setInterval(function(){
        if (timernextplayer == 0) {
            console.log(mqttmssg);
            moveplayer(mqttmssg[1].row, mqttmssg[1].col, players[currplayerindex], arrbodypart[0], arraybodypart[1]);
            randbodypart = bodyparts[Math.floor(Math.random() * 4)];
            arrbodypart = randbodypart.split(" ");
            randcolor = GetTwisterColor();
            timeleft = 5
        }
        timeleft -= 1;
    }, 1000);
}

const moveplayer = (row, col, playername, direction, limb) => {
    let playerexist = searchplayer();
    if (playerexist != false) {
        remplayeronfield(row, col);
    }
    addplayeronfield(row, col, playername, direction, limb);
    console.log(twisterboard);
}

const addplayeronfield = (row, col, playername, direction, limb) => {
    twisterboard[row - 1][col - 1][0] = playername;
    twisterboard[row - 1][col - 1][1] = direction;
    twisterboard[row - 1][col - 1][2] = limb;
}

const remplayeronfield = (row, col) => {
    twisterboard[row - 1][col - 1][0] = "";
    twisterboard[row - 1][col - 1][1] = "";
    twisterboard[row - 1][col - 1][2] = "";
}

const searchplayer = (playername, direction, limb) =>{
    let isfound = false;
    let returnmsg = [];
    for (let i = 0; i < twisterboard.length; i++) {
        for (let j = 0; j < twisterboard[i].length; j++) {
            if (playername ==  twisterboard[i][j][0] && direction == twisterboard[i][j][1] && limb == twisterboard[i][j][2] ) {
                // 0=name, 1=direction, 2=limb
                returnmsg.push(i,j,twisterboard[i][j][0],twisterboard[i][j][1],twisterboard[i][j][2]);
                isfound = true;
            }
        }
        
    }
    if (!isfound) {
        
        return false
    }
    else{
        return returnmsg
    }
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

