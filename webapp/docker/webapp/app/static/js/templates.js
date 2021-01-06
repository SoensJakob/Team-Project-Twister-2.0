/*------------------------------------*\
#Global variables for templates
\*------------------------------------*/

player_count    = 1
timer_startgame = 5

/*------------------------------------*\
#Game Templates
\*------------------------------------*/

const Temp_IkWeetGeenNaam = function(params) {
    document.querySelector('#gamewindow').innerHTML = `
        <div class="o-container u-background-color-red">
            <nav class="o-nav o-nav-white">
                <a href="index.html" class="o-backbutton o-backbutton_white">
                    <img class="o-backbutton_img" src="../static/img/arrow-white.png" alt="arrow back">
                    <p>Back</p>
                </a>
            </nav>
            <main class="c-loginpage-main u-basic-flex-layout">
            <button class="o-button"><a id="Play">play as guest</a></button>
                <p class="c-loginpage-text">or</p>
            <button class="o-button"><a href="/login">login</a></button>
            </main>
        </div>
    `;
    document.querySelector('#Play').addEventListener('click', function name() {Temp_SelectPlayers();})
}

const Temp_SelectPlayers = function(){ //later terug zetten, sgewoon efkes voor beter html te kunnen lezen
    // document.querySelector('#gamewindow').innerHTML = ` 
    // <div id="playerfields">    
    //     <div class="o-row">
    //         <label for="playername">name:</label>
    //         <input type="text" name="playername">
    //     </div> 
    // <div>
    
    // `;
    // document.querySelector('#gamewindow').innerHTML += ` 
    // <div class="o-row" id="addplayerfield">
    //     <button type="button" onclick="AddPlayer();">Add Player</button>
    // </div> 
    // <div class="o-row">
    //     <button type="button" id="BtnSelectPlayers">Next</button>
    // </div> 
    // `;
    document.querySelector("#BtnSelectPlayers").addEventListener("click", function() {ValidatePlayers();});
}

const Temp_SelectGameOptions = function(){
    document.querySelector('#gamewindow').innerHTML = `
        <div class="o-row">
            <label for="GameMode">Choose a gamemode:</label>
            <select id="GameMode">
                <option value="Twister-Classic" selected>Twister Classic</option>
                <option value="Simon-says">Simon Says</option>
            </select>
        </div>
        <div class="o-row">
            <label for="GameTimer">Choose a timer:</label>
            <select id="GameTimer">
                <option value="None" selected>None</option>
                <option value="5">5s</option>
                <option value="10">10s</option>
                <option value="15">15s</option>
                <option value="20">20s</option>
                <option value="25">25s</option>
                <option value="30">30s</option>
            </select>
        <div>
        <div class="o-row">
            <label for="GameActions">Choose actions:</label>
            <select id="GameActions">
                <option value="None" selected>None</option>
                <option value="ActionList1">ActionList1</option>
                <option value="ActionList2">ActionList2</option>
            </select>
        </div>
        <div class="o-row">
            <button type="button" id="BtnGameSettings">Play Game</button>
        </div>
    `;
    document.querySelector("#BtnGameSettings").addEventListener("click", function() {ValidateGameSettings();});
}

const Temp_WaitingScreen = function(time, player){
    if (player == null) {
        document.querySelector('#gamewindow').innerHTML = `
        <div class="o-row">
            <label>Get Ready</label></br>
            <Label>The game starts in:</label></br>
            <p id="WaitingCounter">${time}</p>
        </div>
        `;
    }
    else if (player != null) {
        document.querySelector('#gamewindow').innerHTML = `
        <div class="o-row">
            <label>Player ${player} is dead</label></br>
            <Label>The game continues in:</label></br>
            <p id="WaitingCounter">${time}</p>
        </div>
        `;
    }
    var timeleft = time - 1;
    var game_countdown = setInterval(function(){
        document.querySelector("#WaitingCounter").innerHTML = timeleft;
        if (timeleft <= 0) {
            if (player == null) {
                StartGame();
            }
            else if (player != null) {
                Temp_TwisterClassic();
                PlayTwister()
            }
            clearInterval(game_countdown);
        }
        timeleft -= 1;
    }, 1000);
}

const Temp_TwisterClassic = function(){
    document.querySelector('#gamewindow').innerHTML = `
        <div class="o-row">
            <progress value="0" max="10" id="progressBar"></progress>
        </div>
        <div class="o-row">
            <label id="currentplayer"></label>
        </div>
        <div class="o-row">
            <label id="currentplayerpoints"></label>
        </div>
        <div class="o-row">
            <label id="twistermove"></label>
        </div>
    `;
}

const Temp_EndGame = function(){
    document.querySelector('#gamewindow').innerHTML = `
        <div class="o-row">
            <h1>game is ended</h1>
        </div>
    `;
}


/*------------------------------------*\
#Template functions
\*------------------------------------*/

const AddPlayer = function(NumberPlayers){
    console.log(NumberPlayers)
    if(NumberPlayers >= player_count){
        let playerfield = document.getElementById("playerfields");
        //create div element and place it in id
        let row = document.createElement("div");
        row.classList.add("o-row");
        playerfield.appendChild(row);

        //create label/input + details and place it in div 
        let lbl = document.createElement("label");
        lbl.innerHTML = "name player: ";
        lbl.setAttribute("for", "playername");
        row.appendChild(lbl);

        let inpt = document.createElement("input");
        inpt.setAttribute("type", "text");
        inpt.setAttribute("name", "playername");
        inpt.setAttribute("placeholder", "name...");
        inpt.classList.add("c-inputplayer");
        row.appendChild(inpt);
        player_count++;
    }
    else{
        let elems = document.getElementsByClassName("o-row");
        var len = elems.length;
        var lastelement = len < 1 ? "" : elems[len-1];
        lastelement.remove()
        player_count--;
    }
    


    //oude code
    
    // if (player_count < 4) {
    //     let playerfield = document.getElementById("playerfields");
    //     //create div element and place it in id
    //     let row = document.createElement("div");
    //     row.classList.add("o-row");
    //     playerfield.appendChild(row);

    //     //create label/input + details and place it in div 
    //     let lbl = document.createElement("label");
    //     lbl.innerHTML = "name: ";
    //     lbl.setAttribute("for", "playername");
    //     row.appendChild(lbl);

    //     let inpt = document.createElement("input");
    //     inpt.setAttribute("type", "text");
    //     inpt.setAttribute("name", "playername");
    //     row.appendChild(inpt);

    //     //oude code
    //     // document.getElementById('playerfields').innerHTML += `
    //     //     <div class="o-row">
    //     //         <label for="playername">name:</label>
    //     //         <input type="text" name="playername">
    //     //     </div> 
    //     // `;
    //     if (player_count == 3) {
    //         let addplayerfield = document.getElementById("addplayerfield");
    //         if (addplayerfield.style.display === "none") {
    //             addplayerfield.style.display = "block";
    //         } else {
    //             addplayerfield.style.display = "none";
    //         }
    //     }
    //    player_count++;
    //}
    
}