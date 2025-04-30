const ipQuery = "179.6.0.242"

fetch(`https://api.ipquery.io/${ipQuery}?format=json`).then(
    response => response.json()
).then(data => {
    console.log(data)
});