// global game variables
let timeleft  = 5;
let mqttmssg  = "";
let colors    = ["yellow", "blue", "green", "red"]
let bodyparts = ["left hand", "left foot", "right foot", "right hand"]
let scoreplayer1 = 1

const setoutmsg = function(out_msg){
    mqttmssg = out_msg;
}

const StartTest = function(){
    var randColor = colors[Math.floor(Math.random() * colors.length)];
    var randBodypart = bodyparts[Math.floor(Math.random() * bodyparts.length)];
    console.log(randColor + "  " + randBodypart);
    if (mqttmssg != "gamefinished") {
        var timeleft = 10;
        var downloadTimer = setInterval(function(){
            if (timeleft <= 0) {
                scoreplayer1--;
                mqttmssg = "";
                console.log("current player score: " + scoreplayer1);
                clearInterval(downloadTimer);
                StartTest();
            }
            else if (mqttmssg == "done") {
                mqttmssg = "";
                clearInterval(downloadTimer);
                console.log("end of game with playerscore: " + scoreplayer1);
            }
            else if (mqttmssg == randColor) {
                scoreplayer1++;
                mqttmssg = "";
                console.log("current player score: " + scoreplayer1);
                clearInterval(downloadTimer);
                StartTest();
            }
            else if (mqttmssg != "" && mqttmssg != randColor) {
                scoreplayer1--;
                mqttmssg = "";
                console.log("current player score: " + scoreplayer1);
                clearInterval(downloadTimer);
                StartTest();
            }
            document.getElementById("progressBar").value = 10 - timeleft;
            timeleft -= 1;
        }, 1000);
    }
}
