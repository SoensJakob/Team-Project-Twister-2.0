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
                <a href="/" class="o-backbutton o-backbutton_white">
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
    const allRanges = document.querySelectorAll(".o-slider-wrap");
    allRanges.forEach(wrap => {
        const range = wrap.querySelector(".o-slider");
        const bubble = wrap.querySelector(".o-NumberTimerValue");
        range.addEventListener("input", () => {
            setBubble(range, bubble);
        });
        setBubble(range, bubble);
    });
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
            <main class="c-numberPlayers">
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
            </main>
            <footer class="o-footer u-footer-background-color-red u-footer-border-color-red">
                <button type="button" class="o-button-large" id="BtnValidatePlayers">play</button>
            </footer>
        </div>
    `;
    document.querySelector("#BtnValidatePlayers").addEventListener("click", function() { ValidatePlayers(); });
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
            <div class="o-container u-background-color-green u-justify-bottom u-background-color-yellow">
                <nav class="o-nav">
                    <a href="#" class="o-backbutton o-backbutton_white">
                        <img class="o-backbutton_img" src="../static/img/arrow-grey.png" alt="arrow back">
                        <p>Back</p>
                    </a>
                </nav> 
                <main class="c-waitPage">
                    <h1 class="c-ready">Get Ready</h1>
                    <h2>The game starts in:</h2>
                    <p class="c-counter" id="WaitingCounter">${time}</p>
                </main>
            </div>
        `;
        TimerWaitingScreen(time);
    }
    else if (player) {
        document.querySelector('#gamewindow').innerHTML = `
            <div class="o-container u-justify-bottom u-background-color-white">
                <main class="c-lose">
                    <h1>game over</h1>
                    <p class="c-lose-name" id="currentplayer">for ${player}</p>
                    <img class="c-victory_img" src="../static/img/to_late.png" alt="victory crown">
                </main>
                <footer class="o-footer u-footer-background-color-red u-footer-border-color-red">
                    <button type="button" class="o-button-large" id="ContinueGame">continue</button>
                </footer>
            </div>
        `;
        document.querySelector('#ContinueGame').addEventListener('click', function() { PlayTwister(); });
    }
}

const Temp_TwisterClassic = (gametimer, color) => {
    let textcolor = (color == "yellow") ? 'grey' : 'white';
    document.querySelector('#gamewindow').innerHTML = `
        <div class="o-container u-justify-bottom u-background-color-${color}">
            <nav class="o-nav">
                <a href="#" class="o-backbutton">
                    <img class="o-backbutton_img" src="../static/img/arrow-${imgcolor}.png" alt="arrow back">
                    <p class="o-backbutton-${textcolor}">Back</p>
                </a>
            </nav> 
            <main class="c-gamemode-twister u-textcolor-${textcolor}">
                <h1 id="twistermovelimb">right foot</h1>
                <img class="c-gamemode-twister__image" id="imgtwisterlimb">
                <div id="timer" class="c-gamemode-twister-info">
                </div>
                <p id="twistermovecolor" class="c-gamemode-twister__color"></p>
            </main>
            <footer class="o-footer u-footer-background-color-${color} u-footer-border-color-${color} u-textcolor-${textcolor} c-gamemode-twister__footer">
                <div class="o-row">
                    <p>player: </p>
                    <label class="c-gamemode-twister__name" id="currentplayer"></label>
                </div>
            </footer>
        </div>
    `;
    if (gametimer) {
        document.querySelector('#timer').innerHTML += `
            <!--hier komen de seconden value-->
            <p class="c-gamemode-twister__seconds">seconds left: <span id="progressBarnumber">${gametimer/10}</span></p>
            <progress value="0" max="${gametimer/10}" id="progressBar"></progress>
        `;
    }
}

const Temp_EndGame = (player_info) => {
    document.querySelector('#gamewindow').innerHTML = `
        <div class="o-container u-justify-bottom u-background-color-white"> 
            <main class="c-victory">
                <h1>game finished</h1>
                <img class="c-victory_img" src="../static/img/crown.svg" alt="victory crown">
                <p class="c-victory_text">player:</p>
                <p class="c-victory_text-big" id="currentplayer">${player_info[0].name}</p>
                <p>won with a score of</p>
                <p class="c-victory_text-number" id="#">${player_info[0].score}</p>
            </main>
            <footer class="o-footer u-footer-background-color-green u-footer-border-color-green">
                <button type="button" class="o-button-large" id="Continue">Next</button>
            </footer>
        </div>
    `;
    document.querySelector('#Continue').addEventListener('click', function() { Temp_EndGameOverview(player_info); });
}

const Temp_EndGameOverview = (player_info) => {
    document.querySelector('#gamewindow').innerHTML = `
        <div class="o-container u-justify-bottom u-background-color-green">
            <main class="c-score">
                <h1>score</h1>
                <div id="scoreboard">
                </div>
            </main>
            <footer class="o-footer u-footer-background-color-green u-footer-border-color-green">
                <button type="button" class="o-button-large" id="">continue</button>
            </footer>
        </div>
    `;
    let i = 1;
    player_info.forEach(player => {
        if (i == 1) {
            document.querySelector('#scoreboard').innerHTML += `
                <div class="c-scoreboard">
                    <div class="c-place">
                        <p>${i}</p>
                    </div>  
                    <div class="c-nameboard">
                        <img class="c-nameboard-img" src="../static/img/crown-white.png" alt="crown">
                        <p class="c-nameboard-name" id="#">${player.name}</p>
                    </div>  
                    <div class="c-scorePlayer" id="#">
                        <p>${player.score}</p>
                    </div>
                </div>
            `;
        }
        else {
            document.querySelector('#scoreboard').innerHTML += `
                <div class="c-scoreboard">
                    <div class="c-place">
                        <p>${i}</p>
                    </div>  
                    <div class="c-nameboard">
                        <p class="c-nameboard-name" id="#">${player.name}</p>
                    </div>  
                    <div class="c-scorePlayer" id="#">
                        <p>${player.score}</p>
                    </div>
                </div>
            `;
        }
        i++;
    });
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
        let len = elems.length;
        let lastelement = len <= 1 ? "" : elems[len-1];
        lastelement.remove()
        player_count--;
    }   
}

//functions voor Temp_WaitingScreen
const TimerWaitingScreen = (time) => {
    var timeleft = time - 1;
    var game_countdown = setInterval(function(){
        document.querySelector("#WaitingCounter").innerHTML = timeleft;
        if (timeleft == 0) {
            clearInterval(game_countdown);
            StartGame();
        }
        timeleft -= 1;
    }, 1000);
}