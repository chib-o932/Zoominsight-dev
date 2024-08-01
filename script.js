var map = L.map('the-map', {
    center: [20, 0],
    zoom: 3,//Maybe change to 2
    minZoom: 3,
    maxZoom: 18
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap'
}).addTo(map);

var screenshoter = L.simpleMapScreenshoter({
    hidden: true,
    position: 'topright'
}).addTo(map);

// Define the bounds for the blue sections
var southWest = L.latLng(-90, -180); // Change these coordinates as needed
var northEast = L.latLng(90, 180); // Change these coordinates as needed
var bounds = L.latLngBounds(southWest, northEast);

// Set the max bounds to restrict panning and zooming
map.setMaxBounds(bounds);
map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false });
});

// List of cities to include
//IMPORTANT NOTE: In the DB these cities will need to be spelt the same as they are in the JSON file

var countriesWithCities = new Set(); // To store countries that have cities

var geojsonData = null;
// Load GeoJSON data for countries
fetch('map.geojson')
    .then(response => response.json())
    .then(data => {
        geojsonData = data;
        // Add country boundaries
        L.geoJSON(data, {
            onEachFeature: function(feature, layer) {
                layer.on('mouseover', function() {
                    document.getElementById('hoverInfo').innerText = feature.properties.NAME;
                });
                layer.on('mouseout', function() {
                    document.getElementById('hoverInfo').innerText = 'Hover over a country';
                });
                layer.on('click', function(e) {
                    var countryName = feature.properties.NAME;
                    if (countriesWithCities.has(countryName)) {
                        var latlng = e.latlng;
                        var popupContent = '<b>' + countryName + '</b><br><button onclick="viewCountryDetails(\'' + countryName + '\')" class="marker-btn">View</button>';
                        var popup = L.popup()
                            .setLatLng(latlng)
                            .setContent(popupContent)
                            .openOn(map);
                    }
                });
            }
        }).addTo(map);
    })
    .catch(error => console.error('Error loading GeoJSON data:', error));

// Load city data from the GeoJSON generated from the shapefile
fetch('places.geojson')
    .then(response => response.json())
    .then(data => {
        var filteredCities = data.features.filter(city => citiesToInclude.includes(city.properties.NAME));
        addCityPoints(filteredCities);
        populateCountryDropdown(filteredCities);
    })
    .catch(error => console.error('Error loading city data:', error));

function addCityPoints(cities) {
    cities.forEach(function(city) {
        var lat = city.geometry.coordinates[1];
        var lon = city.geometry.coordinates[0];
        var name = city.properties.NAME;
        var country = city.properties.ADM0NAME; // Assuming 'ADM0NAME' is the country name field
        countriesWithCities.add(country); // Add country to the set
        var marker = L.marker([lat, lon]).addTo(map);
        //marker.bindPopup('<b>' + name + '</b><br><button onclick="viewDetails(\'' + name + '\')">View Details</button>');
        marker.bindPopup('<b>' + name + '</b><br><button onclick="viewDetails(\'' + name + '\', \'' + country + '\')" class="marker-btn">View</button>');
    });
}

function viewDetails(cityName, countryName) {
    var is_city = true;
    map.closePopup();
    view(is_city, cityName, countryName);
}

function viewCountryDetails(countryName) {
    var is_city = false;
    var not_city="";
    map.closePopup();
    view(is_city, countryName, not_city);
}
// Populate country dropdown
function populateCountryDropdown(cities) {
    var dropdown = document.getElementById("countryDropdown");
    var countries = [];
    cities.forEach(function(city) {
        var country = city.properties.ADM0NAME; // Assuming 'ADM0NAME' is the country name field
        if (!countries.includes(country)) {
            countries.push(country);
        }
    });
    countries.forEach(function(country) {
        var option = document.createElement("option");
        option.text = country;
        option.value = country;
        dropdown.add(option);
    });
}

// Function to pan to selected country
function panToCountry() {
    var selectedCountry = document.getElementById("countryDropdown").value;
    fetch('map.geojson')
        .then(response => response.json())
        .then(data => {
            var country = data.features.find(function(feature) {
                return feature.properties.NAME === selectedCountry;
            });
            if (country) {
                var bounds = L.geoJSON(country).getBounds();
                //map.fitBounds(bounds);
                map.flyToBounds(bounds, {
                    duration: 0.5, // Duration of the fly-to animation in seconds
                    easeLinearity: 0.25 // Easing option for the animation
                });
            }
        })
        .catch(error => console.error('Error panning to country:', error));
}

/*function takeScreenshot(is_city, place_name, city_CountryName) {
    leafletImage(map, function(err, canvas) {
        if (err) {
            console.error('Error capturing map image:', err);
            return;
        }
        var img = document.getElementById('screenshot');
        img.src = canvas.toDataURL();
        view(is_city, place_name, city_CountryName);
    });
}*/


