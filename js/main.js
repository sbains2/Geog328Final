mapboxgl.accessToken = 'pk.eyJ1Ijoic2RhbmcyIiwiYSI6ImNsb291OWF3OTAzZXIyd2xhdTBwYjl3b28ifQ.YsaTyAMEUAXpl2w7N6LTUw';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 3,
    center: [-105, 39.3]
});

map.addControl(new mapboxgl.NavigationControl(), 'top-left');


let cause_data;

async function state_cause(){
    const response = await fetch("assets/causes_of_death.json");
    cause_data = await response.json();
    showLineChart("United States");
}
state_cause()

function showLineChart(stateName) {
    // Data Preparation
    let xData = [];
    let yData_A = [];
    let yData_B = [];
    let yData_C = [];
    let yData_D = [];
    let i = 0;

    for (let key in cause_data[stateName]) {
        xData[i] = cause_data[stateName][key]['YEAR'];
        yData_A[i] = cause_data[stateName][key]['TOTAL_DEATHS'];
        yData_B[i] = cause_data[stateName][key]['TOTAL_CANCER'];
        yData_C[i] = cause_data[stateName][key]['TOTAL_HEART'];
        yData_D[i] = cause_data[stateName][key]['TOTAL_STROKE'];
        i++;
    }

    // Chart Configuration
    const ctx = document.getElementById('line-chart').getContext('2d');

    // Check if a chart instance exists and destroy it
    if (window.myLineChart) {
        window.myLineChart.destroy();
    }

    // Create a new line chart
    window.myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xData,
            datasets: [
                {
                    label: 'Total Deaths',
                    data: yData_A,
                    borderColor: 'rgba(207, 8, 8, 1)',
                    backgroundColor: 'rgba(207, 8, 8, 0.2)',
                    borderWidth: 1.5,
                },
                {
                    label: 'Total Cancer',
                    data: yData_B,
                    borderColor: 'rgba(8, 207, 135, 1)',
                    backgroundColor: 'rgba(8, 207, 135, 0.2)',
                    borderWidth: 1.5,
                },
                {
                    label: 'Total Heart',
                    data: yData_C,
                    borderColor: 'rgba(238, 146, 0, 1)',
                    backgroundColor: 'rgba(238, 146, 0, 0.2)',
                    borderWidth: 1.5,
                },
                {
                    label: 'Total Stroke',
                    data: yData_D,
                    borderColor: 'rgba(50, 128, 255, 1)',
                    backgroundColor: 'rgba(50, 128, 255, 0.2)',
                    borderWidth: 1.5,
                },
            ],
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                x: [{
                    title: {
                        display: true,
                        text: 'Year',
                        font: {
                            size: 12,
                        },
                    },
                }],
                y: {
                    min: 0,
                },
            },
            stacked: false,
            plugins: {
                title: {
                    display: true,
                    text: stateName,
                    font: {
                        size: 18,
                    },
                },
            },
            legend: { display: true },
        },
    });
}
let nationalFeature;
async function obese_data() {
    let respond = await fetch("assets/National_Obesity_By_State.geojson");
    let state_data = await respond.json();

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
                24, '#3CB371', // Darker Green than 20
                28, '#4CAF50', // Darker Green than 32
                32, '#2E8B57',
                36, '#6B8E23',  // Darkest Green
                40, '#2E8B57'   // Darkest Green
            ],
            'fill-opacity': 0.8
        }
    });

    const layers = [
        '20-24',
        '24-28',
        '28-32',
        '32-36',
        '36-40+'
    ];
    const colors = [
        '#C1FFC1', // Darker Green than 24'#4CAF50'
        '#3CB371', // Darker Green than 20'#3CB371'
        '#4CAF50', // Darker Green than 32
        '#2E8B57',
        '#6B8E23'
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


    let hoveredPolygonId = null;
    map.on('mousemove', 'state_data_layer', (e) => {
        if (e.features.length > 0) {
            if (hoveredPolygonId !== null) {
                map.setFeatureState(
                    { source: 'state_data', id: hoveredPolygonId },
                    { hover: false }
                );
            }
            hoveredPolygonId = e.features[0].id;
            map.setFeatureState(
                { source: 'state_data', id: hoveredPolygonId },
                { hover: true }
            );
        }
    });
    
    // When the mouse leaves the state-fill layer, update the feature state of the
    // previously hovered feature.
    map.on('mouseleave', 'state_data_layer', () => {
        if (hoveredPolygonId !== null) {
            map.setFeatureState(
                { source: 'state_data', id: hoveredPolygonId },
                { hover: false }
            );
        }
        hoveredPolygonId = null;
    });

    let polygonID = null;

    map.on('click', ({ point }) => {
        const state = map.queryRenderedFeatures(point, {
            layers: ['state_data_layer']
        });
    
        if (state.length) {
            // If a state is clicked, show information for that state
            document.getElementById('text-description').innerHTML = `<h3>${state[0].properties.NAME}</h3>`;
            document.getElementById('text-description').innerHTML += `<p><strong><em>${state[0].properties.Obesity}</em></strong></p>`;
            showLineChart(state[0].properties.NAME);
    
            if (polygonID) {
                map.removeFeatureState({
                    source: "state_data",
                    id: polygonID
                });
            }
    
            polygonID = state[0].id;
    
            map.setFeatureState({
                source: 'state_data',
                id: polygonID,
            }, {
                clicked: true
            });
        } else {
            document.getElementById('text-description').innerHTML = `<h3>${nationalFeature.properties.STATE}</h3>`;
            document.getElementById('text-description').innerHTML += `<p><strong><em>${nationalFeature.properties.Obesity}</em></strong></p>`;
            showLineChart('United States');
    
            if (polygonID) {
                map.setFeatureState({
                    source: 'state_data',
                    id: polygonID,
                }, {
                    clicked: false
                });
            }
        }
    });
    
    let table = document.getElementsByTagName("table")[0];
    let row, cell1, cell2;
    for (let i = 0; i < state_data.features.length-1; i++) {
        row = table.insertRow(-1);
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell1.innerHTML = state_data.features[i].properties.NAME;
        cell2.innerHTML = state_data.features[i].properties.Obesity;
    }
  
    let clicked = [false, false];
    document.getElementById('state-button').addEventListener('click', function(){
        sortToggle(clicked, 0);
    });
    document.getElementById('obesity-button').addEventListener('click', function(){
        sortToggle(clicked, 1);
    });
}

obese_data();

function openNav() {
    document.getElementById("side-container").style.display = "block";
    document.getElementById("openbtn").style.display = "none";
}

function closeNav() {
    document.getElementById("side-container").style.display = "none";
    document.getElementById("openbtn").style.display = "block";
}

function openPopup(n) {
    if (n == 1) {
        if (document.getElementById("description-popup").style.display == "block") {
            closePopup(1);
        } else {
        closePopup(2);
        document.getElementById("description-popup").style.display = "block";
        }
    }
    else if (n==2) {
        if (document.getElementById("acknowledge-popup").style.display == "block") {
            closePopup(2);
        } else {
            closePopup(1);
            document.getElementById("acknowledge-popup").style.display = "block";
        }
    }
}

function closePopup(n) {
    if (n==1) {
        document.getElementById("description-popup").style.display = "none";
    }
    else if (n==2) {
        document.getElementById("acknowledge-popup").style.display = "none";
    }
}






