// opgave12.1.js
const earthquakeUrl =
'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson';
// 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
    // 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-9-30&endtime=2020-10-1';
    // 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-09-30&endtime=2020-10-01';

function generateEarthquakeTable(earthquakes) {
    let quakes = earthquakes.features
        .filter(quake => quake.properties.mag >= 5)
        .sort((quake1, quake2) => quake1.properties.time - quake2.properties.time);
        // .sort((quake1, quake2) => quake2.properties.mag - quake1.properties.mag);

    let html = '<table>';
    for (quake of quakes) {
        let { time, place, mag } = quake.properties;
        html += '<tr><td>' + mag +
            '</td><td>' + place +
            '</td><td>' + new Date(time).toLocaleString() +
            '</td></tr>\n';
    }
    html += '</table><br><div></div>';
    return html;
}

async function main(earthquakeUrl) {
    let earthquake;
    try {
        earthquake = await get(earthquakeUrl);
    } catch (fejl) {
        console.log(fejl);
    }
    document.body.innerHTML = generateEarthquakeTable(earthquake);
}
main(earthquakeUrl);