// mqtt client, user and device details
var mqtt;
var serverUrl   = "127.0.0.1";
var port        = 9001;
var clientId    = "clientID-" + parseInt(Math.random() * 100);  
var device_name = "bobbie-pc";
var tenant      = "";
var username    = "";
var password    = "";
var topic       = "/twisterboard";
var out_msg     = "";
var sqos        = 2;

var reconnectTimeout    = 2000
var connected_flag      = 0;
var undeliveredMessages = [];
var clean_sessions      = true;
var retain_flag         = false;

const onConnectionLost = function(){
	console.log("connection lost");
	alert("connection lost");
	connected_flag = 0;
}

// message callbacks for mqtt
//-------------------------------------------------------------------------------------------
const onMessageArrived = function(r_message){
    //console.log(out_msg+row);
    try{
        //out_msg="Message received: "+ r_message.payloadString + " from topic: " + r_message.destinationName;
        //console.log(out_msg);
        setoutmsg(r_message.payloadString);
    }
    catch(err){
        document.getElementById("out_messages").innerHTML = err.message;
    }
}



// connection callbacks for mqtt
//-------------------------------------------------------------------------------------------
const onFailure = function(message) {
    console.log("Connection Failed - Retrying");
    setTimeout(MQTTconnect, reconnectTimeout);
}

const onConnected = function(recon, url){
	console.log(" in onConnected " + reconn);
}

function onConnect() {
    connected_flag=1;
    console.log("Connected to " + serverUrl + ":" + port + " with clientid: " + clientId + "clean session= "+ clean_sessions)
    sub_topics();
}
    
function disconnect() {
    if (connected_flag==1)
        mqtt.disconnect();
}


// mqtt init connection function
//-------------------------------------------------------------------------------------------
const MQTTconnect = function() {
    console.log("connecting to " + serverUrl + ":" + port + " with clientid: " + clientId + "clean session= "+ clean_sessions)
    mqtt = new Paho.MQTT.Client(serverUrl, port, clientId);
    var options = {
        timeout: 3,
        cleanSession: clean_sessions,
        onSuccess: onConnect,
        onFailure: onFailure,
     };
    if (username !="")
        options.userName=username;
    if (password !="")
        options.password=password;

        mqtt.onConnectionLost = onConnectionLost;
        mqtt.onMessageArrived = onMessageArrived;
        mqtt.onConnected = onConnected;

    mqtt.connect(options);
    return false;
}


// mqtt subscribe to topic
//-------------------------------------------------------------------------------------------
const sub_topics = function(){
    if (connected_flag==0){
        console.log("Not Connected to mqttbroker, cant subscribe to topic");
        return false;
    }
    else{
        console.log("Subscribing to topic =" + topic + " QOS " +sqos);
        var options={qos:sqos,};
        mqtt.subscribe(topic, options);
        return false;
    }
}


// mqtt send to topic
//-------------------------------------------------------------------------------------------
const send_message = function(msg){
    if (connected_flag==0){
        console.log("Not Connected to mqttbroker for sending message");
        return false;
    }

    message = new Paho.MQTT.Message(msg);
    if (topic=="")
        console.log("No topic selected for sending message");
    else
        message.destinationName = topic;

    message.qos = sqos;
    message.retained = retain_flag;
    mqtt.send(message);
    return false;
}