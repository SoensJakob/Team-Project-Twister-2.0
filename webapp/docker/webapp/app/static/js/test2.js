let player_info = {"playerinfo": [{"name": "robbe", "scores": 9999, "alive":1}, {"name": "herber", "scores": 8888, "alive":1}, {"name": "jacob", "scores": 7777, "alive":1}]}

document.addEventListener('DOMContentLoaded', function() {
    init();
});

const init = function(){

    fetch('/scores/memory', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(player_info)
    }).then(function (response) {
        return response.text();
    }).then(function (text) {
        console.log('POST response: ');
        console.log(text);
    });

    // response = postData('/scores/memory', player_info);
    // console.log(response);
    // if (response == "succes") {
    //     console.log('succes');
    // }
    // else{
    //     console.log('failed');
    // }
    // postData('/scores/memory', player_info)
    // .then(function (response) => {
    //     console.log(response);
    //     if (response == "succes") {
    //         console.log('succes');
    //     }
    //     else{
    //         console.log('failed');
    //     }
    // });
}


async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.\
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.text; // parses JSON response into native JavaScript objects
  }