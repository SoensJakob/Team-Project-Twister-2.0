$(document).ready(
    function () { 
        $("body").hide().fadeIn(1000);
    }
);


/*------------------------------------*\
#Global variables for templates
\*------------------------------------*/

let player_count  = 1;

/*------------------------------------*\
#Templates
\*------------------------------------*/

//--------------------------------------
// Onboarding pages
//--------------------------------------

const Temp_TutorialPage1 = () => {
    document.querySelector('#indexpage').innerHTML = `
        <div class="o-container u-background-color-green">
            <nav class="o-nav o-nav-white">
                <a class="o-backbutton o-backbutton_white">
                    <!--empty item for space-between (only tutorial)-->
                </a>
                <a class="o-backbutton o-backbutton_white" id="BtnTutSkip">
                    skip
                </a>
            </nav>
            <main class="c-tutorial">
                <h1 class="c-tutorial-title">Welkom bij Twister 2.0</h1>
                <p class="c-tutorial__text">De digitale versie van twister waar je met je vrienden unieke spelletjes kan spelen!</p>
                <button class="o-button" id="BtnTutNext">Doorgaan</button>
            </main>
            <footer class="c-footer-tutorial">
                <div class="c-footer-navigation">
                        <button class="c-footer-tutorial_button c-footer-tutorial_button_green c-footer-tutorial_button__white" id="BtnTutPage1"></button>
                        <button class="c-footer-tutorial_button c-footer-tutorial_button_green" id="BtnTutPage2"></button>
                        <button class="c-footer-tutorial_button c-footer-tutorial_button_green" id="BtnTutPage3"></button>
                </div>
            </footer>
        </div>
    `;
    document.querySelector('#BtnTutSkip').addEventListener('click', function (){ localStorage.setItem('TutSkipped', true); Temp_Index()});
    document.querySelector('#BtnTutNext').addEventListener('click', function (){ Temp_TutorialPage2() });
    document.querySelector('#BtnTutPage2').addEventListener('click', function (){ Temp_TutorialPage2() });
    document.querySelector('#BtnTutPage3').addEventListener('click', function (){ Temp_TutorialPage3() });
}

const Temp_TutorialPage2 = () => {
    document.querySelector('#indexpage').innerHTML = `
        <div class="o-container u-background-color-red">
            <nav class="o-nav o-nav-white">
                <a class="o-backbutton o-backbutton_white">
                    <!--empty item for space-between (only tutorial)-->
                </a>
                <a class="o-backbutton o-backbutton_white" id="BtnTutSkip">
                    skip
                </a>
            </nav>
            <main class="c-tutorial">
                <h1 class="c-tutorial-title_with-image">Duid eerst een spelmodus aan</h1>
                <img class="c-tutorial-image" src="../static/img/phone.png" alt="phone">
                <p class="c-tutorial__text-image">Twister 2.0 heeft een breede keuze aan unieke spelletjes dat je met je vrienden kan spelen! </p>
                <button class="o-button" id="BtnTutNext">Doorgaan</button>
            </main>
            <footer class="c-footer-tutorial">
            <div class="c-footer-navigation">
                <button class="c-footer-tutorial_button c-footer-tutorial_button_red" id="BtnTutPage1"></button>
                <button class="c-footer-tutorial_button c-footer-tutorial_button_red c-footer-tutorial_button__white" id="BtnTutPage2"></button>
                <button class="c-footer-tutorial_button c-footer-tutorial_button_red" id="BtnTutPage3"></button>
            </div>
            </footer>
        </div>
    `;
    document.querySelector('#BtnTutSkip').addEventListener('click', function (){ localStorage.setItem('TutSkipped', true); Temp_Index()});
    document.querySelector('#BtnTutNext').addEventListener('click', function (){ Temp_TutorialPage3() });
    document.querySelector('#BtnTutPage1').addEventListener('click', function (){ Temp_TutorialPage1() });
    document.querySelector('#BtnTutPage3').addEventListener('click', function (){ Temp_TutorialPage3() });
}

const Temp_TutorialPage3 = () => {
    document.querySelector('#indexpage').innerHTML = `
        <div class="o-container u-background-color-blue">
            <nav class="o-nav o-nav-white">
                <a class="o-backbutton o-backbutton_white">
                    <!--empty item for space-between (only tutorial)-->
                </a>
                <a class="o-backbutton o-backbutton_white" id="BtnTutSkip">
                    skip
                </a>
            </nav>
            <main class="c-tutorial">
                <h1 class="c-tutorial-title_with-groupimage">Kies de aantal spelers</h1>
                <img class="c-tutorial-groupImage" src="../static/img/group.svg" alt="phone">
                <p class="c-tutorial__text-image_group">Duid aan met hoeveel spelers jullie zijn en start het spel!</p>
                <button class="o-button" id="BtnTutNext">Doorgaan</button>
            </main>
            <footer class="c-footer-tutorial">
            <div class="c-footer-navigation">
                <button class="c-footer-tutorial_button c-footer-tutorial_button_blue" id="BtnTutPage1"></button>
                <button class="c-footer-tutorial_button c-footer-tutorial_button_blue" id="BtnTutPage2"></button>
                <button class="c-footer-tutorial_button c-footer-tutorial_button_blue c-footer-tutorial_button__white" id="BtnTutPage3"></button>
            </div>
            </footer>
        </div>
    `;
    document.querySelector('#BtnTutSkip').addEventListener('click', function (){ localStorage.setItem('TutSkipped', true); Temp_Index()});
    document.querySelector('#BtnTutNext').addEventListener('click', function (){ Temp_Index() });
    document.querySelector('#BtnTutPage1').addEventListener('click', function (){ Temp_TutorialPage1() });
    document.querySelector('#BtnTutPage2').addEventListener('click', function (){ Temp_TutorialPage2() });
}

//--------------------------------------
// index page
//--------------------------------------

const Temp_Index = () => {
    document.querySelector('#indexpage').innerHTML = `

        <div id="indexpage"></div>
            <div class="o-container u-justify-bottom">
                <nav class="o-nav o-nav-white">
                    <!--nav item dat leeg is om hamburger structuur te behouden-->
                    <a>  
                    </a>
                    <div class="c-hamburgerNav">
                        <button id="nav_button">
                        <img src="../static/img/hamburger.svg" alt="navigation"></button>
                        <div id="hidden_nav">
                            <div class="hidden_nav-line hidden_nav-firstline">
                                <a href="/scores"><p>scoreborden</p></a>
                                <img id="HamburgerbuttonBack" src="../static/img/nav-back.svg" alt="go back">
                            </div>
                            <div class="hidden_nav-line hidden_nav-lastline">
                            <p class="c-slider-title-volume">volume</p>
                            <div class="c-slider-volume">   
                                <div class="c-slider-wrap-volume">         
                                    <input type="range" min="0" max="100" value="50" class="c-volume-slider" id="volume">
                                </div>
                            </div> 
                            </div>
                        </div>
                    </div>
                </nav>
                <header class="c-startpage-header">
                    <h1 class="c-title-index">Twister 2.0</h1>
                </header>
                <main class="c-startpage-main">
                    <img class="c-startpage-image" src="../static/img/logo.png" alt="logo Twister">
                    <a><button class="o-button c-startpage-button" id="BtnStart"><span>start</span></button></a>
                </main>

            </div>
        </nav>
        <header class="c-startpage-header">
            <h1 class="c-title-index">Twister 2.0</h1>
        </header>
        <main class="c-startpage-main">
            <img class="c-startpage-image" src="../static/img/logo.png" alt="logo Twister">
            <a href="/initgame"><button class="o-button c-startpage-button"><span>start</span></button></a>
        </main>
    </div>
    </div>
    `;

    document.querySelector('#BtnStart').addEventListener('click', function() {
        disconnect();
        window.location.href='/initgame';
    });
    document.querySelector("#volume").addEventListener('change', function () {
        send_message(`{"volume": ${this.value}}`);
    });
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

    });
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

      
    });

}

//--------------------------------------
// game info pages
//--------------------------------------

const Temp_InfoTwister = () => {
    document.querySelector('#initgamewindow').innerHTML = ``;
    document.querySelector('#initgamewindow').innerHTML = `
        <div class="o-container u-background-color-green">
            <nav class="o-nav o-nav-white c-nav_info">
                <a href="/initgame" class="o-backbutton o-backbutton_white">
                    <img class="o-backbutton_img" src="../static/img/arrow-white.png" alt="arrow back">
                    <p>Terug</p>
                </a>
            </nav>
            <main class="c-info">
                <h1>Twister</h1>
                <img class="c-info-image" src="../static/img/twistermat.png" alt="twistermat">
                <h2>Hoe speel je het?</h2>
                <p class="c-info-text">
                    Iedere speler krijgt om de beurt een actie.
                    Een actie bestaat uit een kleur en een lichaamsdeel.
                    De speler moet dan deze actie uitvoeren op de twistermat.
                </p>
                <div class="c-info_maxPlayers">
                    <h3 class="c-info-maxPlayers_text">max spelers: 4</h3>
                    <div class="c-info-maxPlayers_icons">
                        <img class="c-info-maxPlayers_icon" src="../static/img/person.png" alt="person">
                        <img class="c-info-maxPlayers_icon" src="../static/img/person.png" alt="person">
                        <img class="c-info-maxPlayers_icon" src="../static/img/person.png" alt="person">
                        <img class="c-info-maxPlayers_icon" src="../static/img/person.png" alt="person">
                    </div>
                </div>
            </main>
            <footer class="c-footer-tutorial">
                <div class="c-footer-navigation">
                    <button class="c-footer-tutorial_button c-footer-tutorial_button_green c-footer-tutorial_button__white" id="InfoTwister"></button>
                    <button class="c-footer-tutorial_button c-footer-tutorial_button_green" id="InfoMemory"></button>
                </div>
            </footer>
        </div>
    `;
    document.querySelector('#InfoMemory').addEventListener('click', function() { Temp_InfoMemory(); });
}

const Temp_InfoMemory = () => {
    document.querySelector('#initgamewindow').innerHTML = ``;
    document.querySelector('#initgamewindow').innerHTML = `
        <div class="o-container u-background-color-green">
            <nav class="o-nav o-nav-white c-nav_info">
                <a href="/initgame" class="o-backbutton o-backbutton_white">
                    <img class="o-backbutton_img" src="../static/img/arrow-white.png" alt="arrow back">
                    <p>Terug</p>
                </a>
            </nav>
            <main class="c-info">
                <h1>Memory</h1>
                <img class="c-info-image" src="../static/img/twistermat.png" alt="twistermat">
                <h2>Hoe speel je het?</h2>
                <p class="c-info-text">
                    Iedere speler krijgt een volgorde van platen die oplichten.
                    Het is de bedoeling dat de speler deze volgorde op de mat nabootst.
                    Elke keer een volgorde succesvol is nagebootst wordt het spel moeilijker!
                </p>
                <div class="c-info_maxPlayers">
                    <h3 class="c-info-maxPlayers_text">max spelers: 4</h3>
                    <div class="c-info-maxPlayers_icons">
                        <img class="c-info-maxPlayers_icon" src="../static/img/person.png" alt="person">
                        <img class="c-info-maxPlayers_icon" src="../static/img/person.png" alt="person">
                        <img class="c-info-maxPlayers_icon" src="../static/img/person.png" alt="person">
                        <img class="c-info-maxPlayers_icon" src="../static/img/person.png" alt="person">
                    </div>
                </div>
            </main>
            <footer class="c-footer-tutorial">
                <div class="c-footer-navigation">
                    <button class="c-footer-tutorial_button c-footer-tutorial_button_green" id="InfoTwister"></button>
                    <button class="c-footer-tutorial_button c-footer-tutorial_button_green c-footer-tutorial_button__white" id="InfoMemory"></button>
                </div>
            </footer>
        </div>
    `;
    document.querySelector('#InfoTwister').addEventListener('click', function() { Temp_InfoTwister(); });
}

//--------------------------------------
// game initiliaze pages
//--------------------------------------

const Temp_SelectGameOptions = () => {
    document.querySelector('#initgamewindow').innerHTML = `
        <div class="o-container u-background-color-green u-justify-bottom">
            <nav class="o-nav o-nav-white">
                <a href="/" class="o-backbutton o-backbutton_white">
                    <img class="o-backbutton_img" src="../static/img/arrow-white.png" alt="arrow back">
                    <p>Terug</p>
                </a>
                <div class="c-hamburgerNav">
                    <button id="nav_button">
                    <img src="../static/img/hamburger.svg" alt="navigation"></button>
                    <div id="hidden_nav">
                        <div class="hidden_nav-line hidden_nav-firstline">
                            <a href="/scores"><p>scoreborden</p></a>
                            <img id="HamburgerbuttonBack" src="../static/img/nav-back.svg" alt="go back">
                        </div>
                        <div class="hidden_nav-line hidden_nav-lastline">
                        <p class="c-slider-title-volume">volume</p>
                        <div class="c-slider-volume">   
                            <div class="c-slider-wrap-volume">         
                                <input type="range" min="0" max="100" value="50" class="c-volume-slider" id="volume">
                            </div>
                        </div> 
                        </div>
                    </div>
                </div>
            </nav>
            <main class="c-SelectGameOptions">
                <div class="o-row">
                    <div class="c-label-wrap">
                        <label class="c-custom-select-label" for="GameMode">Spelmodus:</label>
                        <a id="linkInfo"><button class="c-info_button" id="BtnShowInfo"><img class="c-info_image" src="../static/img/info.png" alt="info"></button></a>
                    </div>
                    <select id="GameMode" class="o-select">
                        <option value="Twister-Classic">Twister</option>
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
                <button type="button" class="o-button-large" id="BtnValidateGameOptions"><span>Speel</span></button>
            </footer>
        </div>
    `;
    document.querySelector("#volume").addEventListener('change', function () {
        send_message(`{"volume": ${this.value}}`);
    });
    document.querySelector("#BtnShowInfo").addEventListener('click', function () {
        let gamemode = document.querySelector("#GameMode").value;
        console.log(gamemode);
        switch (gamemode) {
            case "Twister-Classic":
                Temp_InfoTwister();
                break;
            case "Memory":
                Temp_InfoMemory();
                break;
        
            default:
                console.log('failed to show infopage - wrong gamemode selected');
                break;
        }
    });
    document.querySelector("#BtnValidateGameOptions").addEventListener("click", ValidateGameSettings);
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
    });
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
    });

    const allRanges = document.querySelectorAll(".o-slider-wrap");
    allRanges.forEach(wrap => {
        const range = wrap.querySelector(".o-slider");
        const bubble = wrap.querySelector(".o-NumberTimerValue");
        range.addEventListener("input", () => {
            setBubble(range, bubble);
        });
        setBubble(range, bubble);
    });

    /* code voor timer off */
    let timer = document.getElementById("GameTimer");
    timer.addEventListener("change", function() {
        if(timer.value==0){
            document.getElementById("slidervalue-timer").innerHTML = "off";
        }
    })
}

const Temp_SelectPlayers = (minplayers, maxplayers) => {
    player_count = 1;
    document.querySelector('#initgamewindow').innerHTML = ` 
        <div class="o-container u-background-color-red">
            <nav class="o-nav o-nav-white">
                <a href="/initgame" class="o-backbutton o-backbutton_white">
                    <img class="o-backbutton_img" src="../static/img/arrow-white.png" alt="arrow back">
                    <p>Terug</p>
                </a>
            </nav>
            <main class="c-numberPlayers">
                <div class="c-numberPlayers-slider">
                    <p>Aantal spelers</p>
                    <div class="o-slider-wrap">
                        <input type="range" min="1" max="${maxplayers}" value="1" class="o-slider" id="myRange">
                        <span class="o-NumberPlayersValue"></span>
                    </div>
                </div>
                <div id="playerfields">    
                    <div class="o-row c-newplayer">
                        <label for="playername">naam speler:</label>
                        <input type="text" class="c-inputplayer" placeholder="naam..." name="playername" maxlength="10" required>
                    </div> 
                </div>
            </main>
            <footer class="o-footer u-footer-background-color-red u-footer-border-color-red">
                <button type="button" class="o-button-large" id="BtnValidatePlayers"><span>speel</span></button>
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

//--------------------------------------
// game pages
//--------------------------------------

const Temp_WaitingScreen = (time, player, gamemode, gametimer) => {
    if (!player) {
        document.querySelector('#gamewindow').innerHTML = `
            <div class="o-container u-background-color-green u-justify-bottom u-background-color-yellow">
                <nav class="o-nav">
                    <a href="/" class="o-backbutton o-backbutton_white">
                        <img class="o-backbutton_img" src="../static/img/arrow-grey.png" alt="arrow back">
                        <p>Terug</p>
                    </a>
                </nav> 
                <main class="c-waitPage">
                    <h1 class="c-ready">Maak je klaar</h1>
                    <h2>Het spel begint in:</h2>
                    <p class="c-counter" id="WaitingCounter">${time}</p>
                </main>
            </div>
        `;
        TimerWaitingScreen(time);
    }
    else if (player) {
        document.querySelector('#gamewindow').innerHTML = `

            <div class="o-container u-justify-bottom u-background-color-white">
                <!--lege nav voor zelfde padding op elke pagina te hebben-->
                <nav class="o-nav">
                </nav>
                <main class="c-lose">
                    <h1>game over</h1>
                    <p class="c-lose-name" id="currentplayer">voor ${player}</p>
                    <img class="c-victory_img" src="../static/img/to_late.png" alt="victory crown">
                </main>
                <footer class="o-footer u-footer-background-color-red u-footer-border-color-red">
                    <button type="button" class="o-button-large c-lose-footer" id="ContinueGame"><span>spelpagina</span></button>
                </footer>
            </div>
  
        `;
        document.querySelector('#ContinueGame').addEventListener('click', function() { 
            switch (gamemode) {
                case "Twister-Classic":
                    PlayTwister();
                    break;
                case "Memory":
                    Temp_Memory(gametimer);
                    PlayMemory();
                    break;
                default:
                    break;
            }
         });
    }
}

const Temp_TwisterClassic = (gametimer, color) => {
    let textcolor = (color == "yellow") ? 'grey' : 'white';
    document.querySelector('#gamewindow').innerHTML = `
        <div class="o-container u-justify-bottom u-background-color-${color}">
            <nav class="o-nav">
                <a href="/initgame" class="o-backbutton">
                    <img class="o-backbutton_img" src="../static/img/arrow-${textcolor}.png" alt="arrow back">
                    <p class="o-backbutton-${textcolor}">Terug</p>
                </a>
            </nav> 
            <main class="c-gamemode-twister u-textcolor-${textcolor}">
                <h1 id="twistermovelimb">linker voet</h1>
                <img class="c-gamemode-twister__image" id="imgtwisterlimb">
                <div id="timer" class="c-gamemode-twister-info">
                </div>
                <p id="twistermovecolor" class="c-gamemode-twister__color"></p>
            </main>
            <footer class="o-footer u-footer-background-color-${color} u-footer-border-color-${color} u-textcolor-${textcolor} c-gamemode-twister__footer">
                <div class="o-row">
                    <p>speler: </p>
                    <label class="c-gamemode-twister__name" id="currentplayer"></label>
                </div>
            </footer>
            <script>
               
            </script>
        </div>
    `;
    if (gametimer) {
        document.querySelector('#timer').innerHTML += `
            <p class="c-gamemode-twister__seconds">tijd: <span id="progressBarnumber">${gametimer/10}</span></p>
            <progress value="0" max="${gametimer/10}" id="progressBar"></progress>
        `;
    }
     // Get the root element
     var r = document.querySelector(':root');
     // Create a function for setting a variable value
     function myFunction_set(color) {
     // Set the value of variable --blue to another value
     if(color == "yellow"){
        r.style.setProperty('--global-gamecolor-value', `var(--global-textcolor)`);
     }
     else{
        r.style.setProperty('--global-gamecolor-value', `var(--global-color-white)`);
     }
     r.style.setProperty('--global-gamecolor', `var(--global-color-${color}-dark)`);
     r.style.setProperty('--global-gamecolor-border', `var(--global-color-${color}-darkest)`);
     }
     myFunction_set(color)
}

const Temp_Memory = (gametimer) => {
    let memorybtnvalue = (currenplayercount >  1) ? "Next Player" : "Stop Game";
    document.querySelector('#gamewindow').innerHTML = `
        <div class="o-container u-background-color-green u-justify-bottom">
            <nav class="o-nav o-nav-white c-nav-memory">
                <a href="/" class="o-backbutton o-backbutton_white">
                    <img class="o-backbutton_img" src="../static/img/arrow-white.png" alt="arrow back">
                    <p>Terug</p>
                </a>
            </nav>
            <main class="c-memory">
                <h1 id="memory-currplayer"></h1>
                <p id="memory-lvl"></p>
                <div class="c-memory_mat">
                    <div class="c-memory-buttons" id="buttonfield">
                    </div>
                </div>
                <div class="c-memory-voorkant">
                    <img class="c-memory-arrow" src="../static/img/arrow-white.png" alt="arrow">
                    <p>voorkant</p>
                </div>
                <footer class="c-footer-memory" id="memoryfooter">
                    <button type="button" class="o-button-large c-button-memory" id="BtnMemoryStop"><span>${memorybtnvalue}</span></button>
                </footer>
            </main>
        </div>
    `;
    for (let i = 0; i < 6; i++) {
        document.querySelector('#buttonfield').innerHTML += `
            <div class="c-memory_mat-row">
                <div class="c-memory-vakwrap">
                    <div class="c-memory_mat-vak c-memory_mat-vak__color-green" id="memory-4${i + 1}"></div>
                </div>
                <div class="c-memory-vakwrap">
                    <div class="c-memory_mat-vak c-memory_mat-vak__color-yellow" id="memory-3${i + 1}"></div>
                </div>
                <div class="c-memory-vakwrap">
                    <div class="c-memory_mat-vak c-memory_mat-vak__color-blue" id="memory-2${i + 1}"></div>
                </div>
                <div class="c-memory-vakwrap">
                    <div class="c-memory_mat-vak c-memory_mat-vak__color-red" id="memory-1${i + 1}"></div>
                </div>
            </div>
        `;
    }
    if (gametimer) {
        document.querySelector('#memoryfooter').innerHTML = `
            <div id="timer" class="c-gamemode-memory-info">
                <p class="c-gamemode-twister__seconds">Tijd resterend: <span id="progressBarnumber"></span></p>
            </div>
        `;
    }
    else{
        document.querySelector('#BtnMemoryStop').addEventListener('click', function() {
            StopMemoryTimers();
            NextPlayer(true);
        });
    }
}

const Temp_EndGame = (player_info) => {
    document.querySelector('#gamewindow').innerHTML = `
        <div class="o-container u-justify-bottom u-background-color-white"> 
            <nav class="o-nav">
                <a href="/initgame" class="o-backbutton">
                    <img class="o-backbutton_img" src="../static/img/arrow-grey.png" alt="arrow back">
                    <p class="o-backbutton-grey">Terug</p>
                </a>
            </nav> 
            <main class="c-victory">
                <h1>spel afgelopen
                </h1>
                <img class="c-victory_img" src="../static/img/crown.svg" alt="victory crown">
                <p class="c-victory_text">speler:</p>
                <p class="c-victory_text-big" id="currentplayer">${player_info[0].name}</p>
                <p class="c-victory-text-small">heeft gewonnen met <br> een score van </p>
                <p class="c-victory_text-number" id="#">${player_info[0].score}</p>
            </main>
            <footer class="o-footer u-footer-background-color-green u-footer-border-color-green">
                <button type="button" class="o-button-large" id="Continue"><span>Volgende</span></button>
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
            <p class="o-backbutton-white">Terug</p>
        </a>
        </nav> 
        <main class="c-score">
            <h1>score</h1>
            <div class="c-scoreboard_container" id="scoreboard">
                <!--hier begint de score-->
            </div>
        </main>
        <!--nieuwe knoppen-->
        <footer class="c-footer-score u-footer-background-color-green u-footer-border-color-green">
            <button type="button" class="o-button-large c-footer-score_button" id="Spelpagina"><span>Spelpagina</span></button>
            <button type="button" class="o-button-large c-footer-score_button" id="scoreborden"><span>scoreborden</span></button>
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
    document.querySelector('#Spelpagina').addEventListener('click', function() {window.location.href='/initgame'});
    document.querySelector('#scoreborden').addEventListener('click', function() {window.location.href='/scores'});
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