// Global variables for templates
player_count = 1


// templates
const Temp_SelectPlayers = function(){
    document.getElementById('InitGameWindow').innerHTML = `
        <div class="o-row" id="PlayerWindow">`;
            for (let i = 1; i <= player_count; i++) {
                document.getElementById('PlayerWindow').innerHTML += `
                <div class="o-row">
                    <img src="./img/avatar1.jpg" alt="Jakob">
                    <input type="text" name="players" placeholder="player${i}" maxlength="15" required>
                </div>`;
            }
            document.getElementById('PlayerWindow').innerHTML += `
                <div class="o-row">
                    <button onclick="AddPlayer()">Add player</button>
                </div> 
                <div>
                    <button type="button" onclick="ValidatePlayers();">Next</button>
                </div>
        </div>           
    `;
}

const Temp_SelectGameOptions = function(){
    document.getElementById('InitGameWindow').innerHTML = `
        <div class="o-row">
            <label for="gamemodes">Choose a gamemode:</label>
            <select id="gamemodes">
                <option value="Twister-Classic" selected>Twister Classic</option>
                <option value="Simon-says">Simon Says</option>
            </select>
        </div>
        <div class="o-row">
            <label for="timer">Choose a timer:</label>
            <select id="timer">
                <option value="None" selected>None</option>
                <option value="5">5s</option>
                <option value="10">10s</option>
                <option value=15">15s</option>
                <option value="20">20s</option>
                <option value="25">25s</option>
                <option value="30">30s</option>
            </select>
        <div>
        <div class="o-row">
            <label for="actions">Choose actions:</label>
            <select id="actions">
                <option value="None" selected>None</option>
                <option value="ActionList1">ActionList1</option>
                <option value="ActionList2">ActionList2</option>
            </select>
        </div>
        <div class="o-row">
            <button type="button" onclick="ValidateGameSettings();">Play Game</button>
        </div>
    `;
}

const Temp_GetReady = function(){
    document.getElementById('InitGameWindow').innerHTML = `
        <div class="o-row">
            <label>Get Ready</label></br>
            <Label>The game starts in:</label></br>
            <p id="InitGameCounter">x</p>
        </div>
    `;
}

const Temp_TwisterClassic = function(){
    document.getElementById('InitGameWindow').innerHTML = `
        <div class="o-row">
            <progress value="0" max="10" id="progressBar"></progress>
        </div>
    `;
}

// Template functions
const AddPlayer = function(){
    if( player_count >= 4){
        alert("max players reached");
    }
    else{
        player_count++;
        Temp_SelectPlayers();
    }
}