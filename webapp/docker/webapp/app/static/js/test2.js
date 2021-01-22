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
        memoryseqs['playerseq'].push({'name': val['name'], 'col': [1,4,3,6,2,5], 'row': [3,1,4,2,4,1]});
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
    console.log(seqcol);
    console.log(seqrow);
    let seqindex = 0; 
    let timeleft = seqcol.length - 1; 
    let TempMemoryTimer = setInterval(function(){
        if (timeleft == 0) {
            clearInterval(TempMemoryTimer);
            
        }
        try {
            document.querySelector(`#memory-${((seqrow[seqindex] - 1) < 0) ? 0 : seqrow[seqindex] - 1}${((seqcol[seqindex] - 1) < 0 ? 0 : seqcol[seqindex] - 1)}`).classList.remove("c-memory-active");
            console.log('remove succeeded')
        } catch (error) {
            //console.log(error);
        }
        console.log(`#memory-${(seqrow[seqindex - 1] == null) ? 1 : seqrow[seqindex - 1]}${(seqcol[seqindex - 1] == null ? 1 : seqcol[seqindex - 1])}`);
        document.querySelector(`#memory-${seqrow[seqindex]}${seqcol[seqindex]}`).classList.add("c-memory-active");
        seqindex++;
        timeleft--;
    }, 1000);
}