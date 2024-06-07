async function getPlayerLength(ip) {
    if (!ip || typeof ip !== "string")
        throw new Error(`ip and port must be present and must be a string`);
    const data = await fetch(`http://${ip}/players.json`);
    const json = await data.json();
    return json.length;
}
async function getMaxPlayers(ip) {
    if (!ip || typeof ip !== "string")
        throw new Error(`ip and port must be present and must be a string`);
    const data = await fetch(`http://${ip}/info.json`);
    const json = await data.json();
    return json.vars.sv_maxClients;
}

function discord_message(webHookURL, message) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", webHookURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        'content': message,
        'username': 'CHECK PLAYER NOPIXEL 4.0',
    }));
}

var LowPlayer = false

setInterval(async () => {
    const ip = "15.204.207.46:30120"
    var playercount = await getPlayerLength(ip);
    var maxplayer = await getMaxPlayers(ip);
    $('#now_player').text(playercount);
    $('#max_player').text(maxplayer);
    if (playercount <= 100 && LowPlayer == false) {
        LowPlayer = true
    } else if (playercount > 100 && LowPlayer == true) {
        LowPlayer = false
    }
}, 100);