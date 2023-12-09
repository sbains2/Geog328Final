mapboxgl.accessToken = 'pk.eyJ1Ijoic2RhbmcyIiwiYSI6ImNsb291OWF3OTAzZXIyd2xhdTBwYjl3b28ifQ.YsaTyAMEUAXpl2w7N6LTUw';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 2.3,
    center: [-120.1, 49.0]
});

map.addControl(new mapboxgl.NavigationControl(), 'top-left');

async function obese_data() {
    let response = await fetch("assets/National_Obesity_By_State.geojson");
    let state_data = await response.json();

    map.addSource('state_data', {
        type: 'geojson',
        data: state_data,
    });

    map.addLayer({
        'id': 'state_data_layer',
        'type': 'fill',
        'source': 'state_data',
        'paint': {
            'fill-color': [
                'step',
                ['get', 'Obesity'],
                '#C1FFC1', // Lightest Green
                10, '#98FB98',
                20, '#8FBC8F',
                24, '#6B8E23',
                28, '#4CAF50',
                32, '#3CB371',
                36, '#2E8B57',  // Darkest Green
                40, '#2E8B57'   // Darkest Green
            ],
            'fill-opacity': 0.7
        }
    });

    const layers = [
        '<10',
        '20',
        '24',
        '28',
        '32',
        '36',
        '40+'
    ];
    const colors = [
        '#C1FFC1',
        '#98FB98',
        '#8FBC8F',
        '#6B8E23',
        '#4CAF50',
        '#3CB371',
        '#2E8B57'
    ];

    const legend = document.getElementById('legend');
    legend.innerHTML = "<b>Obesity Rate<br></b><br><br>";

    layers.forEach((layer, i) => {
        const color = colors[i];
        const item = document.createElement('div');
        const key = document.createElement('span');
        key.className = 'legend-key';
        key.style.backgroundColor = color;

        const value = document.createElement('span');
        value.innerHTML = `${layer}`;
        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
    });

    map.on('mousemove', 'state_data_layer', (e) => {
        const stateName = e.features[0].properties.NAME;
        const obesityRate = e.features[0].properties.Obesity;

        const tooltip = document.getElementById('tooltip');
        tooltip.innerHTML = `<h3>${stateName}</h3><p><strong><em>${obesityRate}</strong> overall proportion</em></p>`;
        tooltip.style.visibility = 'visible';
        tooltip.style.left = `${e.point.x}px`;
        tooltip.style.top = `${e.point.y}px`;
    });

    map.on('mouseleave', 'state_data_layer', () => {
        const tooltip = document.getElementById('tooltip');
        tooltip.style.visibility = 'hidden';
    });

    map.on('mouseenter', 'state_data_layer', (e) => {
        const stateName = e.features[0].properties.NAME;
        const obesityRate = e.features[0].properties.Obesity;

        document.getElementById('text-description').innerHTML =
            `<h3>${stateName}</h3><p><strong><em>${obesityRate}</strong> overall proportion</em></p>`;
    });

    map.on('mouseleave', 'state_data_layer', () => {
        document.getElementById('text-description').innerHTML = `<p> Hover over any state! </p>`;
    });

    // Click event remains unchanged
    map.on('click', 'state_data_layer', (e) => {
        const stateName = e.features[0].properties.NAME;
        const obesityRate = e.features[0].properties.Obesity;

        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<h3>${stateName}</h3><p><strong><em>${obesityRate}</strong> overall proportion</em></p>`)
            .addTo(map);
    });
}

obese_data();




