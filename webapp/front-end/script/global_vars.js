// game details
var player_count = 2;

// mqtt client, user and device details
var mqtt;
var serverUrl   = "192.168.0.178";
var port        = 9001;
var clientId    = createGUID();
var device_name = "bobbie-pc";
var tenant      = "";
var username    = "";
var password    = "";
var topic       = "";
var out_msg     = "";
var sqos        = 2;

var reconnectTimeout    = 2000
var connected_flag      = 0;
var undeliveredMessages = [];
var clean_sessions      = true;

function createGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
    });
 }