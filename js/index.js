const url = 'http://15.204.216.10:30120/players.json';

setInterval(() => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const count = data.length;
            $('#now_player').text(count);
            if (count <= 100) {
                discord_message('https://discord.com/api/webhooks/936650461090549810/VWceX2NluZTVmNV6h1NkfMI5MkCfEXICyO6el0mWvVsjrRp8IarVThfC8i0ePTTulM29', `ตอนนี้มีคนน้อยกว่า 100 คนแล้วนะครับ ${count}/220`)
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}, 1000);

function discord_message(webHookURL, message) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", webHookURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        'content': message,
        'username': 'CHECK PLAYER NOPIXEL 4.0',
    }));
}