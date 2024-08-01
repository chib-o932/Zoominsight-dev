var currentName = "";

function view(city, name, city_CountryName) {
    currentName = name;
    resize();
    let locationValue = document.getElementById("locationValue");
    locationValue.textContent = `${name}`;
    let dashboardInfo = document.querySelectorAll('.dashboard-info');
    dashboardInfo.forEach(element => {
        element.style.display = 'block'; // or 'inline-block', 'flex', etc.
    });
    // Adjust the size of the map container
    let mapContainer = document.getElementById("the-map");
    map.invalidateSize();
    if (city) {
        var country = city_CountryName;
    } else {
        country = name;
    }
    // Find the bounds for the city or country in the stored GeoJSON data
    var feature = geojsonData.features.find(function (feature) {
        return feature.properties.NAME === country;
    });
    if (feature) {
        bounds = L.geoJSON(feature).getBounds();
        map.flyToBounds(bounds, {
            duration: 1, // Match this duration with the CSS transition duration
            easeLinearity: 1 // Easing option for the animation
        });
        var bounds = L.latLngBounds(southWest, northEast);
// Set the max bounds to restrict panning and zooming
        map.setMaxBounds(bounds);




    }
    //includedReportToggle();
    fillProjectDetails();
    fillCommentDetails();
}
function fillProjectDetails(){
    const projectTable = document.querySelector('#Project-Body');

    projectData.forEach((data) => {
        const cellArray = [data.id, data.title, data.status, data.start, data.end];
        const theRow = document.createElement('tr');

        cellArray.forEach((eachCell, index) => {
            const cell = document.createElement('td');

            switch(index) {
                case 0:
                    cell.innerHTML = `P${data.id.toString().padStart(3, '0')}`;
                    break;
                case 2:
                    const statusCell = document.createElement('div');
                    statusCell.textContent = data.status;
                    statusCell.className = data.status;
                    cell.appendChild(statusCell);
                    break;
                case 3:
                case 4:
                    cell.innerHTML = eachCell.split(' ').join('&nbsp;');
                    break;
                default:
                    cell.textContent = eachCell;
                    break;
            }

            theRow.appendChild(cell);
        });

        const actionCell = document.createElement('td');
        const actionButton = document.createElement('button');
        actionButton.innerHTML = 'View&nbsp;more';
        actionButton.className = 'view-more-button';
        actionButton.id = data.id;
        actionButton.addEventListener('click', () => {
            alert(`Button clicked! ${data.id}`);
        });

        actionCell.appendChild(actionButton);
        theRow.appendChild(actionCell);
        projectTable.appendChild(theRow);
    });
}

function fillCommentDetails(){
    const commentTable = document.querySelector('#Comment-Body');
    projectData.forEach((data,) => {
        var theRow = document.createElement('tr');
        var cell = document.createElement('td');
        cell.innerHTML = data.lead.split(' ').join('&nbsp;');
        theRow.appendChild(cell);
        var cell = document.createElement('td');
        cell.textContent = data.details;
        theRow.appendChild(cell);
        commentTable.appendChild(theRow);
    });
}
/*function fillCommentDetails(){
    const commentTable = document.querySelector('#Comment-Body');
    projectData.forEach((data,) => {
        let cellArray=[data.lead,data.details];
        var theRow = document.createElement('tr');

        cellArray.forEach((eachCell) => {
            var cell = document.createElement('td');
            cell.textContent = eachCell;
            theRow.appendChild(cell);
        });
        commentTable.appendChild(theRow)
    });
}*/




async function resize() {
    const mainElement = document.querySelector('main.testimonial-grid');
    mainElement.classList.remove('location-not-chosen');
    mainElement.classList.add('location-chosen');
}

function includedReportToggle() {
    const gridContainer = document.getElementById('gridContainerx');
    gridContainer.innerHTML = "";
    projectData.forEach(data => {
        // Create a new grid item
        const newItem = document.createElement('div');
        newItem.className = 'grid-itemx';
        newItem.innerHTML = ` <div>P${data.id} <input type="checkbox" id= "P${data.id}" onchange="toggleItem(${data.id}, this)" checked></div>`;//onchange="toggleItem(${itemCount + 1}, this)"
        newItem.classList.add('checked');
        // Append the new item to the grid container
        gridContainer.appendChild(newItem);
    });
    //<span>P${data.id}</span>
}

function toggleItem(item, checkbox) {
    if (checkbox.checked) {
        const mainElement = document.getElementById('P'+item);
        const parentElement = mainElement.parentElement;
        const changeElement = parentElement.parentElement;
        changeElement.classList.remove('not-checked');
        changeElement.classList.add('checked');
        console.log(parentElement);
        console.log(changeElement);
    } else {
        const mainElement = document.getElementById('P'+item);
        const parentElement = mainElement.parentElement;
        const changeElement = parentElement.parentElement;
        changeElement.classList.remove('checked');
        changeElement.classList.add('not-checked');
        //parentElement.replaceWith(parentElement)
        console.log(parentElement);
        console.log(changeElement);

    }

}

/*<script>
    // Function to change the class based on local storage value
    function updateMainClassBasedOnLocalStorage() {
    const mainElement = document.querySelector('main.testimonial-grid');
    const locationChosen = localStorage.getItem('locationChosen');

    if (locationChosen === 'true') {
    mainElement.classList.remove('location-not-chosen');
    mainElement.classList.add('location-chosen');
} else {
    mainElement.classList.remove('location-chosen');
    mainElement.classList.add('location-not-chosen');
}
}

    // Set a value in local storage for testing (remove this in production)
    localStorage.setItem('locationChosen', 'true'); // Change to 'false' to test the other condition

    // Call the function on page load
    document.addEventListener('DOMContentLoaded', updateMainClassBasedOnLocalStorage);
</script-->*/


/*RESIZE THE IMAGE******************************************8
function captureMapImage() {
    screenshoter.takeScreen('image').then(image => {
        resizeImage(image, 600, 600, (resizedImage) => {
            let imgTag = document.getElementById('map-image');
            imgTag.src = resizedImage;
        });
    }).catch(e => {
        console.error(e);
    });
}
function resizeImage(imageSrc, newWidth, newHeight, callback) {
    var img = new Image();
    img.src = imageSrc;
    img.onload = function() {
        var canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        callback(canvas.toDataURL());
    };
}*/