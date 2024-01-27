async function getPlayerLength(ip) {
    if (!ip || typeof ip !== "string")
        throw new Error(`ip and port must be present and must be a string`);
    const data = await fetch(`https://${ip}/players.json`);
    const json = await data.json();
    return json.length;
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
    const ip = "15.204.216.10:30120"
    var playercount = await getPlayerLength(ip);
    $('#now_player').text(playercount);
    if (playercount <= 100 && LowPlayer == false) {
        LowPlayer = true
        discord_message('https://discord.com/api/webhooks/936650461090549810/VWceX2NluZTVmNV6h1NkfMI5MkCfEXICyO6el0mWvVsjrRp8IarVThfC8i0ePTTulM29', `ตอนนี้มีคนน้อยกว่า 100 คนแล้วนะครับ ${playercount}/220`)
    } else if (playercount > 100 && LowPlayer == true) {
        LowPlayer = false
    }
}, 500);