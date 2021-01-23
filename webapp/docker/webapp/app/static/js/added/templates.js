/*------------------------------------*\
#Global variables for templates
\*------------------------------------*/

let player_count  = 1;

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
            <div class="c-hamburgerNav">
                <button id="nav_button">
                <img src="../static/img/hamburger.svg" alt="navigation"></button>
                <div id="hidden_nav">
                    <div class="hidden_nav-line hidden_nav-firstline">
                        <a href="/scores"><p>leaderboards</p></a>
                        <img id="HamburgerbuttonBack" src="../static/img/nav-back.svg" alt="go back">
                    </div>
                    <div class="hidden_nav-line hidden_nav-lastline">
                       <p class="c-slider-title-volume">volume</p>
                       <div class="o-slider-volume c-slider-volume">   
                        <div class="o-slider-wrap c-slider-wrap-volume">         
                            <input type="range" min="0" max="100" value="50" class="c-volume-slider" id="volume">
                        </div>
                    </div> 
                    </div>
                </div>
            </div>
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
                            <span class="o-NumberTimerValue" id="slidervalue-timer"></span>
                        </div>
                    </div> 
                </div> 
            </div>
        </main>
        <footer class="o-footer u-footer-background-color-green u-footer-border-color-green">
            <button type="button" class="o-button-large" id="BtnValidateGameOptions"><span>play</span></button>
        </footer>
    </div>
    `;
    /* code voor timer off */
    let timer = document.getElementById("GameTimer");
    timer.addEventListener("change", function() {
        if(timer.value==0){
            document.getElementById("slidervalue-timer").innerHTML = "off";
        }
    })

    /*hier komt hamburger js */
    document.getElementById("HamburgerbuttonBack").addEventListener("click", function(){
        var hv = document.getElementById("hidden_nav"); 
        var nb = document.getElementById('nav_button');
        if(hv.style.display == "flex"){
            hv.style.display = "none";
            nb.style.borderRadius = "1rem";
        }
        else{
            hv.style.display = "flex";
            nb.style.borderRadius = "1rem 1rem 0 0";
        }
    })
    document.getElementById("nav_button").addEventListener("click", function(){
        var hv = document.getElementById("hidden_nav"); 
        var nb = document.getElementById('nav_button');
        if(hv.style.display == "flex"){
            hv.style.display = "none";
            nb.style.borderRadius = "1rem";
        }
        else{
            hv.style.display = "flex";
            nb.style.borderRadius = "1rem 1rem 0 0";
        }
    })
    
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
                                <span class="o-NumberTimerValue" id="slidervalue-timer"></span>
                            </div>
                        </div> 
                    </div> 
                `;
                let timer = document.getElementById("GameTimer");
                timer.addEventListener("change", function() {
                    if(timer.value==0){
                        document.getElementById("slidervalue-timer").innerHTML = "off";
                    }
                })
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

const Temp_SelectPlayers = (minplayers, maxplayers) => {
    player_count = 1;
    document.querySelector('#initgamewindow').innerHTML = ` 
        <div class="o-container u-background-color-red">
            <nav class="o-nav o-nav-white">
                <a href="/initgame" class="o-backbutton o-backbutton_white">
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
                <button type="button" class="o-button-large" id="BtnValidatePlayers"><span>play</span></button>
            </footer>
        </div>
    `;
    document.querySelector("#BtnValidatePlayers").addEventListener("click", function() { ValidatePlayers(minplayers, maxplayers); });
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
                    <a href="/" class="o-backbutton o-backbutton_white">
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
                    <button type="button" class="o-button-large" id="ContinueGame"><span>continue</span></button>
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
                <a href="/initgame" class="o-backbutton">
                    <img class="o-backbutton_img" src="../static/img/arrow-${textcolor}.png" alt="arrow back">
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
            <script>
               
            </script>
        </div>
    `;
    if (gametimer) {
        document.querySelector('#timer').innerHTML += `
            <p class="c-gamemode-twister__seconds">seconds left: <span id="progressBarnumber">${gametimer/10}</span></p>
            <progress value="0" max="${gametimer/10}" id="progressBar"></progress>
        `;
    }
     // Get the root element
     var r = document.querySelector(':root');
     // Create a function for setting a variable value
     function myFunction_set(color) {
     // Set the value of variable --blue to another value
     console.log(color)
     r.style.setProperty('--global-gamecolor', `var(--global-color-${color}-dark)`);
     r.style.setProperty('--global-gamecolor-border', `var(--global-color-${color}-darkest)`);
     }
     myFunction_set(color)
}

const Temp_Memory = () => {
    document.querySelector('#gamewindow').innerHTML = `
        <div class="o-container u-background-color-green u-justify-bottom">
            <nav class="o-nav o-nav-white">
                <a href="/" class="o-backbutton o-backbutton_white">
                    <img class="o-backbutton_img" src="../static/img/arrow-white.png" alt="arrow back">
                    <p>Back</p>
                </a>
            </nav>
            <main class="c-memory">
                <h1 id="memory-currplayer">Memory</h1>
                <div class="c-memory_mat">
                    <div class="c-memory-buttons" id="buttonfield">
                    </div>
                </div>
                <div class="c-memory-voorkant">
                    <img class="c-memory-arrow" src="../static/img/arrow-white.png" alt="arrow">
                    <p>voorkant</p>
                </div>
            </main>
        </div>
    `;
    for (let i = 0; i < 6; i++) {
        document.querySelector('#buttonfield').innerHTML += `
            <div class="c-memory_mat-row">
                <div class="c-memory-vakwrap">
                    <div class="c-memory_mat-vak c-memory_mat-vak__color-green" id="memory-1${i + 1}"></div>
                </div>
                <div class="c-memory-vakwrap">
                    <div class="c-memory_mat-vak c-memory_mat-vak__color-yellow" id="memory-2${i + 1}"></div>
                </div>
                <div class="c-memory-vakwrap">
                    <div class="c-memory_mat-vak c-memory_mat-vak__color-blue" id="memory-3${i + 1}"></div>
                </div>
                <div class="c-memory-vakwrap">
                    <div class="c-memory_mat-vak c-memory_mat-vak__color-red" id="memory-4${i + 1}"></div>
                </div>
            </div>
        `;
    }
}

const Temp_EndGame = (player_info) => {
    document.querySelector('#gamewindow').innerHTML = `
        <div class="o-container u-justify-bottom u-background-color-white"> 
            <nav class="o-nav">
                <a href="/initgame" class="o-backbutton">
                    <img class="o-backbutton_img" src="../static/img/arrow-grey.png" alt="arrow back">
                    <p class="o-backbutton-grey">Back</p>
                </a>
            </nav> 
            <main class="c-victory">
                <h1>game finished</h1>
                <img class="c-victory_img" src="../static/img/crown.svg" alt="victory crown">
                <p class="c-victory_text">player:</p>
                <p class="c-victory_text-big" id="currentplayer">${player_info[0].name}</p>
                <p>won with a score of</p>
                <p class="c-victory_text-number" id="#">${player_info[0].score}</p>
            </main>
            <footer class="o-footer u-footer-background-color-green u-footer-border-color-green">
                <button type="button" class="o-button-large" id="Continue"><span>Next</span></button>
            </footer>
        </div>
    `;
    document.querySelector('#Continue').addEventListener('click', function() { Temp_EndGameOverview(player_info); });
}

const Temp_EndGameOverview = (player_info) => {
    document.querySelector('#gamewindow').innerHTML = `
    <div class="o-container u-justify-bottom u-background-color-green">
        <nav class="o-nav c-nav-score">
        <a href="/initgame" class="o-backbutton">
            <img class="o-backbutton_img" src="../static/img/arrow-white.png" alt="arrow back">
            <p class="o-backbutton-white">Back</p>
        </a>
        </nav> 
        <main class="c-score">
            <h1>score</h1>
            <div class="c-scoreboard_container" id="scoreboard">
                <!--hier begint de score-->
            </div>
        </main>
        <footer class="o-footer u-footer-background-color-green u-footer-border-color-green">
            <button type="button" class="o-button-large" id="Continue"><span>continue</span></button>
        </footer>
    </div>
    `;
    document.querySelector('#Continue').addEventListener('click', function() {window.location.href='/scores'})
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
    const max = range.max ? range.max : 30;
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