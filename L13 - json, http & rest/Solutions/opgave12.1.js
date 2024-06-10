// opgave12.1.js
const earthquakeUrl = // https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php 
    'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson';

function generateEarthquakeTable(earthquakes) {
    let html = '<table>';
    for (let quake of earthquakes) {
        let { time, place, mag } = quake.properties;
        html += '<tr><td>' + mag +
            '</td><td>' + place +
            '</td><td>' + new Date(time).toLocaleString() +
            '</td></tr>\n';
    }
    html += '</table><br><div></div>';
    return html;
}

function selectEarthquakes(earthquakes){
    return earthquakes.features
    .filter(quake => quake.properties.mag >= 5)
    .sort((quake1, quake2) => quake2.properties.mag - quake1.properties.mag);
}

async function main(earthquakeUrl) {
    let earthquakes;
    try {
        earthquakes = await get(earthquakeUrl);
    } catch (fejl) {
        console.log(fejl);
    }
    earthquakes = selectEarthquakes(earthquakes);
    document.body.innerHTML = generateEarthquakeTable(earthquakes);
}
main(earthquakeUrl);