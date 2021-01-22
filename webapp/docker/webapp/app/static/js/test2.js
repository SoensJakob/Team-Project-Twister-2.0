let players = JSON.parse('{"playerinfo": [{"name": "robbe", "scores": 9999, "alive":1}, {"name": "herber", "scores": 8888, "alive":1}, {"name": "jacob", "scores": 7777, "alive":1}]}') 
let memoryseqs = JSON.parse('{"playerseq":[]}'); 
let currentplayerindex = 1;

document.addEventListener('DOMContentLoaded', function() {
    init();
});

const init = function(){
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
    
    Setupmemory(players);
    ShowMemorySeq();
}

const Setupmemory = (players) => {
    for([key, val] of Object.entries(players['playerinfo'])) {
        memoryseqs['playerseq'].push({'name': val['name'], 'col': [1,4,3,6,2,5], 'row': [3,1,4,2,4,1]}); //'col': [1,4,3,6,2,5], 'row': [3,1,4,2,4,1]
    }
}

const AddMemoryBtn = () => {
    let randcol = Math.floor(Math.random() * Math.floor(6)) + 1;
    let randrow = Math.floor(Math.random() * Math.floor(4)) + 1;
    memoryseqs.playerseq[currentplayerindex]['col'].push(randcol);
    memoryseqs.playerseq[currentplayerindex]['row'].push(randrow);
}

const ShowMemorySeq = () => {
    let seqcol= memoryseqs.playerseq[currentplayerindex]['col'];
    let seqrow = memoryseqs.playerseq[currentplayerindex]['row'];
    let seqindex = 0;
    let TempMemoryTimer = setInterval(function(){ 
        // toggle the class every two second
        
        document.querySelector(`#memory-${seqrow[seqindex]}${seqcol[seqindex]}`).classList.add("c-memory-active");
        setTimeout(function(){
          // toggle back after 1 second 
          document.querySelector(`#memory-${seqrow[seqindex]}${seqcol[seqindex]}`).classList.remove("c-memory-active");
          seqindex++;
        },1000)
        if (seqindex == (seqcol.length - 1)) {
            clearInterval(TempMemoryTimer);
        }
     },2000);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }