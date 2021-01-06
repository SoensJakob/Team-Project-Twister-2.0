/*------------------------------------*\
#Global variables for templates
\*------------------------------------*/

player_count = 1;

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
    document.querySelector('#gamewindow').innerHTML = ` 
        <div class="o-container u-background-color-red">
            <nav class="o-nav o-nav-white">
                <a href="login.html" class="o-backbutton o-backbutton_white">
                    <img class="o-backbutton_img" src="../static/img/arrow-white.png" alt="arrow back">
                    <p>Back</p>
                </a>
            </nav>
            <main class="c-numberPlayers u-basic-flex-layout">
                <div class="c-numberPlayers-slider">
                    <p>number of players</p>
                    <div class="o-slider-wrap">
                        <input type="range" min="1" max="4" value="1" class="o-slider" id="myRange">
                        <span class="o-NumberPlayersValue"></span>
                    </div>
                </div>
                <!--hier begint de player fields-->
                <div id="playerfields">    
                    <div class="o-row c-newplayer">
                        <label for="playername">name player:</label>
                        <input type="text" class="c-inputplayer" placeholder="name..." name="playername">
                    </div> 
                </div>
                <div class="o-row">
                    <button type="button" id="BtnValidatePlayers">Next</button>
                </div> 
            </main>
        </div>
    `;
    document.querySelector("#BtnValidatePlayers").addEventListener("click", function() {ValidatePlayers();});
    const allRanges = document.querySelectorAll(".o-slider-wrap");
    allRanges.forEach(wrap => {
        const range = wrap.querySelector(".o-slider");
        const bubble = wrap.querySelector(".o-NumberPlayersValue");

        range.addEventListener("input", () => {
            setBubble(range, bubble);
            AddPlayer(bubble.innerHTML)
        });

        setBubble(range, bubble);
    });
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


/*------------------------------------*\
#Template functions
\*------------------------------------*/

function setBubble(range, bubble) {
    const val = range.value;
    const min = range.min ? range.min : 1;
    const max = range.max ? range.max : 4;
    const newVal = Number(((val - min) * 100) / (max - min));
    bubble.innerHTML = val;

    // Sorta magic numbers based on size of the native UI thumb
    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}

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
    
}