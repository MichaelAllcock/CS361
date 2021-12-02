// JavaScript for Index.html page
import maplibregl from 'https://cdn.skypack.dev/maplibre-gl@2.0.0-pre.5';    

var names = ['Denali', 'Gates of the Arctic', 'Glacier Bay', 'Katmai', 'Kenai Fjords', 'Kobuk Valley', 'Lake Clark', 'Wrangell - St. Elias',
                'American Samoa', 'Grand Canyon', 'Petrified Forest', 'Saguaro', 'Hot Springs', 'Channel Islands', 'Death Valley',
                'Joshua Tree', 'Kings Canyon', 'Lassen Volcanic', 'Pinnacles', 'Redwood', 'Sequoia', 'Yosemite', 'Black Canyon of the Gunnison',
                'Great Sand Dunes', 'Mesa Verde', 'Rocky Mountain', 'Biscayne', 'Dry Tortugas', 'Everglades', 'Haleakalā',
                'Hawai’i Volcanoes', 'Indiana Dunes', 'Mammoth Cave', 'Acadia', 'Isle Royale', 'Voyageurs', 'Gateway Arch', 'Glacier',
                'Great Basin', 'Carlsbad Caverns', 'White Sands', 'Great Smoky Mountains', 'Theodore Roosevelt', 'Cuyahoga Valley', 'Crater Lake',
                'Congaree', 'Badlands', 'Wind Cave', 'Big Bend', 'Guadalupe Mountains', 'Virgin Islands', 'Arches', 'Bryce Canyon', 'Canyonlands',
                'Capitol Reef', 'Zion', 'Shenandoah', 'Mount Rainier', 'North Cascades', 'Olympic', 'New River Gorge', 'Grand Teton', 'Yellowstone'];

var coords = [[ -151.187402, 63.097595 ], [ -153.213442, 67.867944 ], [ -136.841242, 58.613727 ], [ -155.070656, 58.610206 ], [ -150.191176, 59.843258 ],
                [ -159.127815, 67.332592 ], [ -153.360524, 60.550586 ], [ -142.983326, 61.700025 ], [ -170.683657, -14.258294 ], [ -112.112666, 36.097756 ],
                [ -109.782404, 35.065849 ], [ -111.166602, 32.296465 ], [ -93.06514, 34.532203 ], [ -119.786562, 34.013289 ], [ -117.08391, 36.495474 ],
                [ -115.899165, 33.872302 ], [ -118.566104, 36.883792 ], [ -121.426723, 40.494536 ], [ -121.185028, 36.488702 ], [ -124.00611, 41.213671 ],
                [ -118.571046, 36.479288 ], [ -119.553971, 37.860656 ], [ -107.74342, 38.573703 ], [ -105.616176, 37.785542 ], [ -108.462031, 37.230205 ],
                [ -105.690322, 40.326351 ], [ -80.207899, 25.48173 ], [ -82.873311, 24.628386 ], [ -80.900241, 25.304263 ], [ -156.146735, 20.718232 ],
                [ -155.279313, 19.383153 ], [ -87.071028, 41.650323 ], [ -86.144744, 37.186302 ], [ -68.280357, 44.33181 ], [ -88.909865, 47.990392 ],
                [ -92.849365, 48.472239 ], [ -90.183765, 38.627435 ], [ -113.807752, 48.756214 ], [ -114.260352, 38.925082 ], [ -104.554665, 32.132738 ],
                [ -106.326552, 32.785165 ], [ -83.56161, 35.611057 ], [ -103.536939, 46.972703 ], [ -81.572164, 41.277865 ], [ -122.110759, 42.937304 ],
                [ -80.779091, 33.793179 ], [ -102.330352, 43.854575 ], [ -103.447102, 43.569522 ], [ -103.276525, 29.268405 ], [ -104.857748, 31.935124 ],
                [ -64.74806, 18.342059 ], [ -109.607727, 38.726212 ], [ -112.189529, 37.593496 ], [ -109.91993, 38.208358 ], [ -111.127815, 38.074589 ], 
                [ -113.028158, 37.294454 ], [ -78.456351, 38.470271 ], [ -121.731428, 46.874788 ], [ -121.322447, 48.766927 ], [ -123.607594, 47.791411 ],
                [ -81.020216, 37.874744 ], [ -110.691364, 43.778551 ], [ -110.657269, 44.631155 ]];

// Map Script
function drawMap(maplibregl){
    const mapTilerKey = "b1f46c812f0f4a7485e46c797622ab4a"    
    const map = new maplibregl.Map({
    container: "my-map",
    style: `https://maps.geoapify.com/v1/styles/osm-carto/style.json?apiKey=${mapTilerKey}`,
    center: [-102.1585529522404, 40.23519050368728],
    zoom: 2
    });
    
    map.addControl(new maplibregl.NavigationControl());
    
    return map;
};

var map = drawMap(maplibregl);

// Pin Script
var latLon = coords; 
var parks = names;
addMarkerFromLonLatArr(latLon, parks);

function addMarkerFromLonLatArr(arr, names){
    for (let i = 0; i < arr.length; i++){
        let icon = document.createElement('div');
        icon.classList.add("icon");
        icon.setAttribute("id", "icon" + i);
        
        let iconPopup = new maplibregl.Popup({
            anchor: 'bottom',
            offset: [0, -24]
        })
        .setText(names[i] + ' National Park');
    
        let iconMarker = new maplibregl.Marker(icon, {
            anchor: 'bottom',
            offset: [0, 6]
        })
        .setLngLat(arr[i])
        .setPopup(iconPopup)
        .addTo(map);

        icon.onmouseenter = () => iconMarker.togglePopup();
        icon.onmouseleave = () => iconMarker.togglePopup();

    };
};
