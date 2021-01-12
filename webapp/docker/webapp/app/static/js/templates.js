/*------------------------------------*\
#Global variables for templates
\*------------------------------------*/

player_count  = 1;

/*------------------------------------*\
#Game Templates
\*------------------------------------*/

const Temp_IkWeetGeenNaam = () => {
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

const Temp_SelectPlayers = () => {
    document.querySelector('#gamewindow').innerHTML = ` 
    <div class="o-container u-background-color-red u-justify-bottom">
    <nav class="o-nav o-nav-white">
        <a href="login.html" class="o-backbutton o-backbutton_white">
            <img class="o-backbutton_img" src="../static/img/arrow-white.png" alt="arrow back">
            <p>Back</p>
        </a>
    </nav>
    <main class="c-numberPlayers">
        <div class="c-numberPlayers-slider">
            <p>number of players</p>
            <div class="o-slider-wrap u-padding-slider">
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
    </main>
    <footer class="o-footer u-footer-background-color-red u-footer-border-color-red">
        <button type="button" class="o-button-large" id="BtnValidatePlayers">play</button>
    </footer>
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

const Temp_SelectGameOptions = () => {
    document.querySelector('#gamewindow').innerHTML = `
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
                <option value="Simon-says" >Simon Says</option>
            </select>
            </div>
        
        <div class="o-row">
            <label class="c-custom-select-label" for="GameTimer">Timer:</label>
           
            <!--slider-->
            <div class="c-numberPlayers-slider">   
                <div class="o-slider-wrap">         
                    <input type="range" min="0" max="30" value="10" class="o-slider c-slider" id="GameTimer">
                    <span class="o-NumberPlayersValue"></span>
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
    </main>
    <footer class="o-footer u-footer-background-color-green u-footer-border-color-green">
        <button type="button" id="BtnGameSettings" class="o-button-large" id="BtnValidatePlayers">play</button>
    </footer>
</div>
    `;
    document.querySelector("#BtnGameSettings").addEventListener("click", function() {ValidateGameSettings();});
    const allRanges = document.querySelectorAll(".o-slider-wrap");
    allRanges.forEach(wrap => {
        const range = wrap.querySelector(".o-slider");
        const bubble = wrap.querySelector(".o-NumberPlayersValue");

        range.addEventListener("input", () => {
            setBubble(range, bubble);
        });

        setBubble(range, bubble);
    });
}

const Temp_WaitingScreen = (time, player) => {
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
    TimerWaitingScreen(time, player);
}

const Temp_TwisterClassic = () => {
    document.querySelector('#gamewindow').innerHTML = `
        <div class="o-row">
            <progress value="0" max="${(gametimer / 10)}" id="progressBar"></progress>
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

const Temp_EndGame = (player_info) => {
    document.querySelector('#gamewindow').innerHTML = `
        <table id="scoreboard">
            <tr>
                <th>name</th>
                <th>score</th>
                <th>place</th>
            </tr>
        </table>
    `;
    player_info.forEach(player => {
        document.querySelector('#scoreboard').innerHTML += `
            <tr>
                <td>${player.name}</td>
                <td>${player.score}</td>
                <td>${playerinfo.index}</td>
            </tr>
        `;
    });
}


/*------------------------------------*\
#Template functions
\*------------------------------------*/

const setBubble = (range, bubble) => {
    const val = range.value;
    const min = range.min ? range.min : 1;
    const max = range.max ? range.max : 4;
    const newVal = Number(((val - min) * 100) / (max - min));
    bubble.innerHTML = val;

    // Sorta magic numbers based on size of the native UI thumb
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
        var lastelement = len < 1 ? "" : elems[len-1];
        lastelement.remove()
        player_count--;
    }   
}

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

const customSelect = () =>{
                    var x, i, j, l, ll, selElmnt, a, b, c;
                    /*look for any elements with the class "custom-select":*/
                    x = document.getElementsByClassName("custom-select");
                    l = x.length;
                    console.log(l);
                    for (i = 0; i < l; i++) {
                    selElmnt = x[i].getElementsByTagName("select")[0];
                    ll = selElmnt.length;
                    /*for each element, create a new DIV that will act as the selected item:*/
                    a = document.createElement("DIV");
                    a.setAttribute("class", "select-selected");
                    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
                    x[i].appendChild(a);
                    /*for each element, create a new DIV that will contain the option list:*/
                    b = document.createElement("DIV");
                    b.setAttribute("class", "select-items select-hide");
                    for (j = 1; j < ll; j++) {
                        /*for each option in the original select element,
                        create a new DIV that will act as an option item:*/
                        c = document.createElement("DIV");
                        c.innerHTML = selElmnt.options[j].innerHTML;
                        c.addEventListener("click", function(e) {
                            /*when an item is clicked, update the original select box,
                            and the selected item:*/
                            var y, i, k, s, h, sl, yl;
                            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                            sl = s.length;
                            h = this.parentNode.previousSibling;
                            for (i = 0; i < sl; i++) {
                            if (s.options[i].innerHTML == this.innerHTML) {
                                s.selectedIndex = i;
                                h.innerHTML = this.innerHTML;
                                y = this.parentNode.getElementsByClassName("same-as-selected");
                                yl = y.length;
                                for (k = 0; k < yl; k++) {
                                y[k].removeAttribute("class");
                                }
                                this.setAttribute("class", "same-as-selected");
                                break;
                            }
                            }
                            h.click();
                        });
                        b.appendChild(c);
                    }
                    x[i].appendChild(b);
                    a.addEventListener("click", function(e) {
                        /*when the select box is clicked, close any other select boxes,
                        and open/close the current select box:*/
                        e.stopPropagation();
                        closeAllSelect(this);
                        this.nextSibling.classList.toggle("select-hide");
                        this.classList.toggle("select-arrow-active");
                        });
                    }
                    function closeAllSelect(elmnt) {
                    /*a function that will close all select boxes in the document,
                    except the current select box:*/
                    var x, y, i, xl, yl, arrNo = [];
                    x = document.getElementsByClassName("select-items");
                    y = document.getElementsByClassName("select-selected");
                    xl = x.length;
                    yl = y.length;
                    for (i = 0; i < yl; i++) {
                        if (elmnt == y[i]) {
                        arrNo.push(i)
                        } else {
                        y[i].classList.remove("select-arrow-active");
                        }
                    }
                    for (i = 0; i < xl; i++) {
                        if (arrNo.indexOf(i)) {
                        x[i].classList.add("select-hide");
                        }
                    }
                    }
                    /*if the user clicks anywhere outside the select box,
                    then close all select boxes:*/
                    document.addEventListener("click", closeAllSelect);
        
}