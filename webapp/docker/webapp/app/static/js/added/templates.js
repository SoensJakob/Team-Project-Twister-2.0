/*------------------------------------*\
#Global variables for templates
\*------------------------------------*/

player_count  = 1;

/*------------------------------------*\
#Templates
\*------------------------------------*/

const Temp_SelectGameOptions = () => {
    document.querySelector('#initgamewindow').innerHTML = `
        <div class="o-container u-background-color-green u-justify-bottom">
            <nav class="o-nav o-nav-white">
                <a href="login.html" class="o-backbutton o-backbutton_white">
                    <img class="o-backbutton_img" src="../static/img/arrow-white.png" alt="arrow back">
                    <p>Back</p>
                </a>
            </nav>
            <main class="c-SelectGameOptions">
                <div class="o-row">
                    <label class="c-custom-select-label" for="GameMode">Gamemode:</label>
                    <select id="GameMode" class="o-select">
                        <option value="Twister-Classic">Twister Classic</option>
                        <option value="Memory" >Memory</option>
                    </select>
                </div>
                <div id="GameSettings" class="o-row">
                    <div class="o-row">
                    <label class="c-custom-select-label" for="GameTimer">Timer:</label>
                    <div class="c-numberPlayers-slider">   
                        <div class="o-slider-wrap">         
                            <input type="range" min="0" max="30" value="10" class="o-slider c-slider" id="GameTimer">
                            <span class="o-NumberTimerValue"></span>
                        </div>
                    </div> 
                    </div> 
                    <div>
                        <div class="o-row">
                            <label class="c-custom-select-label" for="GameActions">Actions:</label>
                            <select id="GameActions" class="o-select">
                                <option value="null" selected>None</option>
                                <option value="ActionList1">ActionList1</option>
                                <option value="ActionList2">ActionList2</option>
                            </select>
                        </div>
                    </div>
                </div>
            </main>
            <footer class="o-footer u-footer-background-color-green u-footer-border-color-green">
                <button type="button" class="o-button-large" id="BtnValidateGameOptions">play</button>
            </footer>
        </div>
    `;
    document.querySelector("#BtnValidateGameOptions").addEventListener("click", ValidateGameSettings);
    document.querySelector("#GameMode").addEventListener("change", function(){
        switch (this.value) {
            case "Twister-Classic":
                document.querySelector('#GameSettings').innerHTML = `
                    <div class="o-row">
                        <label class="c-custom-select-label" for="GameTimer">Timer:</label>
                        <div class="c-numberPlayers-slider">   
                            <div class="o-slider-wrap">         
                                <input type="range" min="0" max="30" value="10" class="o-slider c-slider" id="GameTimer">
                                <span class="o-NumberTimerValue"></span>
                            </div>
                        </div> 
                    </div> 
                    <div>
                        <div class="o-row">
                            <label class="c-custom-select-label" for="GameActions">Actions:</label>
                            <select id="GameActions" class="o-select">
                                <option value="null" selected>None</option>
                                <option value="ActionList1">ActionList1</option>
                                <option value="ActionList2">ActionList2</option>
                            </select>
                        </div>
                    </div>
                `;
                const allRanges = document.querySelectorAll(".o-slider-wrap");
                allRanges.forEach(wrap => {
                    const range = wrap.querySelector(".o-slider");
                    const bubble = wrap.querySelector(".o-NumberTimerValue");

                    range.addEventListener("input", () => {
                        setBubble(range, bubble);
                    });
                    setBubble(range, bubble);
                });
                break;
            case "Memory":
                document.querySelector('#GameSettings').innerHTML = ``;
                break;
            default:
                console.log('initgame - template error: switch selectgamneoptions');
                break;
        }
    });
}

const Temp_SelectPlayers = (maxplayers) => {
    document.querySelector('#initgamewindow').innerHTML = ` 
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
                        <input type="range" min="1" max="${maxplayers}" value="1" class="o-slider" id="myRange">
                        <span class="o-NumberPlayersValue"></span>
                    </div>
                </div>
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

const Temp_WaitingScreen = (time, player) => {
    if (!player) {
        document.querySelector('#gamewindow').innerHTML = `
        <div class="o-row">
            <label>Get Ready</label></br>
            <Label>The game starts in:</label></br>
            <p id="WaitingCounter">${time}</p>
        </div>
        `;
    }
    else if (player) {
        document.querySelector('#gamewindow').innerHTML = `
        <div class="o-row">
            <label>Player ${player} is dead</label></br>
            <Label>The game continues in:</label></br>
            <p id="WaitingCounter">${time}</p>
        </div>
        `;
    }
    TimerWaitingScreen(time, player);
}

/*------------------------------------*\
#Template functions
\*------------------------------------*/

// functions voor Temp_SelectPlayers
const setBubble = (range, bubble) => {
    const val = range.value;
    const min = range.min ? range.min : 1;
    const max = range.max ? range.max : 4;
    const newVal = Number(((val - min) * 100) / (max - min));
    bubble.innerHTML = val;
    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}

const AddPlayer = (NumberPlayers) => {
    if(NumberPlayers > player_count){
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
        var lastelement = len <= 1 ? "" : elems[len-1];
        lastelement.remove()
        player_count--;
    }   
}

//functions voor Temp_WaitingScreen
const TimerWaitingScreen = (time, player) => {
    var timeleft = time - 1;
    var game_countdown = setInterval(function(){
        document.querySelector("#WaitingCounter").innerHTML = timeleft;
        if (timeleft == 0) {
            if (player == null) {
                 StartGame();
            }
            else if (player != null) {
                Temp_TwisterClassic();
                PlayTwister();
            }
            clearInterval(game_countdown);
        }
        timeleft -= 1;
    }, 1000);
}