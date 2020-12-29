/*------------------------------------*\
#Global variables for templates
\*------------------------------------*/

player_count = 1


/*------------------------------------*\
#Init Game
\*------------------------------------*/

const Temp_SelectPlayers = function(){
    document.getElementById('gamewindow').innerHTML = ` 
    <div" id="playerfields">    
        <div class="o-row">
            <label for="playername">name:</label>
            <input type="text" name="playername">
        </div> 
    <div>
    
    `;
    document.getElementById('gamewindow').innerHTML += ` 
    <div class="o-row" id="addplayerfield">
        <button type="button" onclick="AddPlayer();">Add Player</button>
    </div> 
    <div class="o-row" id="addplayerfield">
        <button type="button" onclick="ValidatePlayers();">Next</button>
    </div> 
    `;
}


/*------------------------------------*\
#Template functions
\*------------------------------------*/

const AddPlayer = function(){
    if (player_count < 4) {
        document.getElementById('playerfields').innerHTML += `
            <div class="o-row">
                <label for="playername">name:</label>
                <input type="text" name="playername">
            </div> 
        `;
        if (player_count == 3) {
            let addplayerfield = document.getElementById("addplayerfield");
            if (addplayerfield.style.display === "none") {
                addplayerfield.style.display = "block";
            } else {
                addplayerfield.style.display = "none";
            }
        }
        player_count++;
    }
    else{
        alert("max players reached")
    }
}


