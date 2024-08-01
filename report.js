
function generateReport() {
    // Chain promises to ensure sequential execution
    new Promise((resolve) => {
        setTimeout(function() {
            document.getElementById('hoverInfo').innerText = currentName;
            captureMapImage();
            loadContainers();
            resolve();
        }, 500);
    })
        .then(() => {
            return new Promise((resolve) => {
                setTimeout(function() {
                    loadContainers();
                    const stage = document.querySelector('.block');
                    stage.classList.remove('block');
                    resolve();
                }, 500);
            });
        });
        /*.then(() => {
            genReport();
            const savedHtml = localStorage.getItem('mySavedHtml');
            console.log('Retrieved HTML content:', savedHtml);
        });*/
}

function captureMapImage() {
    screenshoter.takeScreen('image').then(image => {
        let imgTag = document.getElementById('map-image');
        imgTag.src = image;
    }).catch(e => {
        console.error(e);
    });
}

async function loadHtml(templatePath) {
    try {
        const response = await fetch(templatePath);
        if (!response.ok) {
            throw new Error(`Failed to fetch template: ${response.statusText}`);
        }
        const html = await response.text();
        return html;
    } catch (error) {
        console.error(error);
        return '';
    }
}

async function loadContainers() {
    const containerDiv = document.getElementById('FullProjects');
    containerDiv.innerHTML = ''; // Clear previous containers

    const templatePath = 'template.html'; // Path to the single template file
    const htmlTemplate = await loadHtml(templatePath);


    projectData.forEach(data => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('ProjectContainer');

        // Create a function from the HTML content string
        const templateFunction = new Function('data', `return \`${htmlTemplate}\`;`);

        // Generate the HTML content by passing data to the function
        const populatedHtml = templateFunction(data);

        // Insert the populated HTML content into the new div
        newDiv.innerHTML = populatedHtml;

        const statusCell = newDiv.querySelector('td div[data-status-id]');
        if (data.status === 'open') {
            statusCell.classList.add('open-status'); // Add a class for 'open' status
        } else if (data.status === 'completed'){
            statusCell.classList.add('completed-status'); // Add a class for 'closed' status
        } else {
            statusCell.classList.add('closed-status'); // Add a class for 'closed' status
        }

        const visitTable = newDiv.querySelector('#VisitTable');

        visitData.forEach((visit,index) => {

            var theRow = document.createElement('tr');
            let cellArray=["ID","Date","Time","Venue","Visitors","Rating"];
            cellArray.forEach((eachCell) => {
                var cell = document.createElement('th');
                cell.textContent = eachCell;
                theRow.appendChild(cell);
            });
            visitTable.appendChild(theRow);

            theRow = document.createElement('tr');
            cellArray=[visit.id,visit.date,visit.time,visit.venue,visit.visitors,visit.rating];
            cellArray.forEach((eachCell) => {
                var cell = document.createElement('td');
                cell.textContent = eachCell;
                theRow.appendChild(cell);
            });

            const ratingCell = theRow.querySelector('td:nth-child(6)');
            const ratingDiv = document.createElement('div');
            ratingDiv.innerHTML = '';
            ratingDiv.innerHTML = visit.id;
            if (visit.rating === 1 || visit.rating === 2) {
                ratingDiv.classList.add('low-rating'); // Add a class for 'low' rating
            } else if (visit.rating === 3) {
                ratingDiv.classList.add('mid-rating'); // Add a class for 'mid' rating
            } else {
                ratingDiv.classList.add('high-rating'); // Add a class for 'high' rating
            }
            const newRatingCell = document.createElement('td');
            newRatingCell.appendChild(ratingDiv)
            ratingCell.replaceWith(newRatingCell)
            visitTable.appendChild(theRow);
            theRow = document.createElement('tr');
            cellArray=[" ","Details","Agenda","Action Items","Notes",""];
            cellArray.forEach((eachCell,index) => {
                var cell = document.createElement('th');
                cell.textContent = eachCell;
                theRow.appendChild(cell);
                if (index==0){
                    cell.id = 'remove-background';
                }
            });
            visitTable.appendChild(theRow);


            theRow = document.createElement('tr');
            cellArray=[" ",visit.details,visit.agenda,visit.action,visit.notes,""];
            cellArray.forEach((eachCell) => {
                var cell = document.createElement('td');
                cell.textContent = eachCell;
                theRow.appendChild(cell);
            });
            visitTable.appendChild(theRow);


            // Create an empty row for spacing, but not after the last entry
            if (index < visitData.length - 1) {
                const spacer_row = document.createElement('tr');
                cell = document.createElement('td');
                cell.colSpan = 6; // Span all columns
                cell.style.height = '1rem'; // Adjust the height as needed
                spacer_row.appendChild(cell);
                visitTable.appendChild(spacer_row);
            }

        });

        const meetingTable = newDiv.querySelector('#MeetingTable');

        meetingData.forEach((meeting,index) => {

            var theRow = document.createElement('tr');
            let cellArray=["ID","Date","Time","Attendees"];
            cellArray.forEach((eachCell) => {
                var cell = document.createElement('th');
                cell.textContent = eachCell;
                theRow.appendChild(cell);
            });
            meetingTable .appendChild(theRow);

            theRow = document.createElement('tr');
            cellArray=[meeting.id,meeting.date,meeting.time,meeting.attendees];
            cellArray.forEach((eachCell) => {
                var cell = document.createElement('td');
                cell.textContent = eachCell;
                theRow.appendChild(cell);
            });
            meetingTable .appendChild(theRow);

            theRow = document.createElement('tr');
            cellArray=[" ","Minutes","Action"," "];
            cellArray.forEach((eachCell,index) => {
                var cell = document.createElement('th');
                cell.textContent = eachCell;
                theRow.appendChild(cell);
                if (index==0){
                    cell.id = 'remove-background';
                }
            });
            meetingTable .appendChild(theRow);


            theRow = document.createElement('tr');
            cellArray=[" ",meeting.minutes, meeting.action," "];
            cellArray.forEach((eachCell) => {
                var cell = document.createElement('td');
                cell.textContent = eachCell;
                theRow.appendChild(cell);
            });
            meetingTable .appendChild(theRow);


            // Create an empty row for spacing, but not after the last entry
            if (index < visitData.length - 1) {
                const spacer_row = document.createElement('tr');
                cell = document.createElement('td');
                cell.colSpan = 6; // Span all columns
                cell.style.height = '1rem'; // Adjust the height as needed
                spacer_row.appendChild(cell);
                meetingTable .appendChild(spacer_row);
            }

        });

        const partnerTable = newDiv.querySelector('#partner-table-body');

        partnerData.forEach(data => {
            const row = document.createElement('tr');
            Object.values(data).forEach(value => {
                const cell = document.createElement('td');
                cell.textContent = value;
                row.appendChild(cell);
            });

            partnerTable.appendChild(row);

        });

        containerDiv.appendChild(newDiv);
    });
}

function genReport() {
    const divElement = document.getElementById('getReport');
    if (divElement) {
        // Get the outerHTML of the div
        const htmlContent = divElement.outerHTML;

        // Add the CSS link to the head
        const cssLink = '<link rel="stylesheet" href="Styles.css">';
        const finalHtml = `<html><head>${cssLink}</head><body>${htmlContent}</body></html>`;

        localStorage.setItem('mySavedHtml', finalHtml);
        console.log('HTML content with CSS saved to local storage.');
        /*html2canvas(document.getElementById('getReport')).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'screenshot.png';
            link.click();*/
        ge();
    } else {
        console.error('Div with ID "hello" not found.');
    }
    const savedHtml = localStorage.getItem('mySavedHtml');
    //console.log('Retrieved HTML content:', savedHtml);
    /*const blob = new Blob([savedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');*/

}

async function ge() {
        const { jsPDF } = window.jspdf;

        // Capture the screenshot of the element
        const canvas = await html2canvas(document.getElementById('getReport'));

        // Convert the canvas to an image
        const imgData = canvas.toDataURL('image/png');

        // Create a PDF document
    // Create a PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Add the image to the PDF and handle page breaks
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save('screenshot.pdf');
}

    /*
// Retrieve HTML content from local storage
    var htmlContent = localStorage.getItem('mySavedHtml');

    if (htmlContent) {
        // Create a new iframe to render the HTML content
        var iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = 'none';
        document.body.appendChild(iframe);

        // Write the HTML content into the iframe's document
        var iframeDoc = iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();

        // Wait for the iframe to load the content
        iframe.onload = function() {
            html2canvas(iframeDoc.body).then(function(canvas) {

                var desiredWidth = 595; // Set your desired width here

                // Calculate the new height to maintain aspect ratio
                var aspectRatio = canvas.height / canvas.width;
                var desiredHeight = desiredWidth * aspectRatio;

                // Create a new canvas with the desired dimensions
                var resizedCanvas = document.createElement('canvas');
                resizedCanvas.width = desiredWidth;
                resizedCanvas.height = desiredHeight;
                var context = resizedCanvas.getContext('2d');

                // Draw the original canvas onto the resized canvas
                context.drawImage(canvas, 0, 0, desiredWidth, desiredHeight);
                // Convert canvas to base64 image data
                var imageData = canvas.toDataURL('image/png');

                // Create an image element and set its source to the base64 data
                var imgElem = document.createElement('img');
                imgElem.src = imageData;

                // Append the image element to the container
                document.getElementById('image-container').appendChild(imgElem);

                // Remove the iframe from the DOM
                document.body.removeChild(iframe);
            }).catch(function(error) {
                console.error('Error rendering HTML to canvas:', error);
                document.body.removeChild(iframe);
            });
        };
    } else {
        console.error('No HTML content found in local storage.');
    }
}*/
