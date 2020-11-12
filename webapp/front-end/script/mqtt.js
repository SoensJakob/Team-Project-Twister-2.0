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
        out_msg="Message received: "+ r_message.payloadString + " from topic: " + r_message.destinationName;
        console.log(out_msg);
    }
    catch(err){
        document.getElementById("out_messages").innerHTML = err.message;
    }
}



// connection callbacks for mqtt
//-------------------------------------------------------------------------------------------
const onFailure = function(message) {
    console.log("Connection Failed - Retrying");
    alert("Connection Failed - Retrying");
    setTimeout(MQTTconnect, reconnectTimeout);
}

const onConnected = function(recon, url){
	console.log(" in onConnected " + reconn);
}

function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    connected_flag=1;
    console.log("Connected to " + serverUrl + ":" + port + " with clientid: " + clientId + "clean session= "+ clean_sessions)
    console.log("on Connect " + connected_flag);
    sub_topics();
    SelectPlayers();
}
    
function disconnect() {
    if (connected_flag==1)
        mqtt.disconnect();
}


// mqtt init connection function
//-------------------------------------------------------------------------------------------
const MQTTconnect = function() {
    topic = document.getElementById("MqttTopic").value;
    mqtt = new Paho.MQTT.Client(serverUrl, port, clientId);
    console.log("connecting to " + serverUrl + ":" + port + " with clientid: " + clientId + "clean session= "+ clean_sessions)
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

const sub_topics = function(){
    if (connected_flag==0){
        console.log("Not Connected so can't subscribe");
        return false;
    }
    else{
        console.log("Subscribing to topic ="+ topic +" QOS " +sqos);
        var options={qos:sqos,};
        mqtt.subscribe(topic, options);
        return false;
    }
}

const send_message = function(){
    document.getElementById("status_messages").innerHTML ="";
    if (connected_flag==0){
    out_msg="<b>Not Connected so can't send</b>"
    console.log(out_msg);
    document.getElementById("status_messages").innerHTML = out_msg;
    return false;
    }
    var pqos=parseInt(document.forms["smessage"]["pqos"].value);
    if (pqos>2)
        pqos=0;
    var msg = document.forms["smessage"]["message"].value;
    console.log(msg);
    document.getElementById("status_messages").innerHTML="Sending message  "+msg;

    var topic = document.forms["smessage"]["Ptopic"].value;
    //var retain_message = document.forms["smessage"]["retain"].value;
    if (document.forms["smessage"]["retain"].checked)
        retain_flag=true;
    else
        retain_flag=false;
    message = new Paho.MQTT.Message(msg);
    if (topic=="")
        message.destinationName = "test-topic";
    else
        message.destinationName = topic;
    message.qos=pqos;
    message.retained=retain_flag;
    mqtt.send(message);
    return false;
}