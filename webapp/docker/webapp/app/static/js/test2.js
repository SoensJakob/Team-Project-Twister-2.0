let players = JSON.parse(localStorage.getItem('gameplayers'));
let memoryseqs = JSON.parse('{"playerseq":[]}'); 

for([key, val] of Object.entries(players)) {
    memoryseqs['playerseq'].push({'name': val, 'col': [Math.floor(Math.random() * Math.floor(6)) + 1], 'row': [Math.floor(Math.random() * Math.floor(4)) + 1]});
}

console.log(memoryseqs);