function generateReport() {
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

    projectData.forEach(data=> {
        const newDiv = document.createElement('div');
        newDiv.classList.add('ProjectContainer');

        const templateFunction = new Function('data', `return \`${htmlTemplate}\`;`);
        const populatedHtml = templateFunction(data);

        newDiv.innerHTML = populatedHtml;

        /*const statusCell = newDiv.querySelector('td div[data-status-id]');
        if (data.status === 'open') {
            statusCell.classList.add('open-status');
        } else if (data.status === 'completed'){
            statusCell.classList.add('completed-status');
        } else {
            statusCell.classList.add('closed-status');
        }*/

        const visitTable = newDiv.querySelector('#VisitTable');
        visitData.forEach((visit, index) => {
            const row1 = document.createElement('tr');
            const headers = ["ID", "Date", "Time", "Venue", "Visitors", "Rating"];
            headers.forEach(header => {
                const cell = document.createElement('th');
                cell.textContent = header;
                row1.appendChild(cell);
            });
            visitTable.appendChild(row1);

            const row2 = document.createElement('tr');
            const cells = [visit.id, visit.date, visit.time, visit.venue, visit.visitors, visit.rating];
            cells.forEach(cellContent => {
                const cell = document.createElement('td');
                cell.textContent = cellContent;
                row2.appendChild(cell);
            });

            const ratingCell = row2.querySelector('td:nth-child(6)');
            const ratingDiv = document.createElement('div');
            ratingDiv.innerHTML = '';
            ratingDiv.innerHTML = visit.id;
            if (visit.rating === 1 || visit.rating === 2) {
                ratingDiv.classList.add('low-rating');
            } else if (visit.rating === 3) {
                ratingDiv.classList.add('mid-rating');
            } else {
                ratingDiv.classList.add('high-rating');
            }
            const newRatingCell = document.createElement('td');
            newRatingCell.appendChild(ratingDiv)
            ratingCell.replaceWith(newRatingCell);
            visitTable.appendChild(row2);

            const row3 = document.createElement('tr');
            const detailsHeaders = [" ", "Details", "Agenda", "Action Items", "Notes", ""];
            detailsHeaders.forEach((header, index) => {
                const cell = document.createElement('th');
                cell.textContent = header;
                row3.appendChild(cell);
                if (index == 0) {
                    cell.id = 'remove-background';
                }
            });
            visitTable.appendChild(row3);

            const row4 = document.createElement('tr');
            const detailsCells = [" ", visit.details, visit.agenda, visit.action, visit.notes, ""];
            detailsCells.forEach(cellContent => {
                const cell = document.createElement('td');
                cell.textContent = cellContent;
                row4.appendChild(cell);
            });
            visitTable.appendChild(row4);

            if (index < visitData.length - 1) {
                const spacerRow = document.createElement('tr');
                const cell = document.createElement('td');
                cell.colSpan = 6;
                cell.style.height = '1rem';
                spacerRow.appendChild(cell);
                visitTable.appendChild(spacerRow);
            }
        });

        const meetingTable = newDiv.querySelector('#MeetingTable');
        meetingData.forEach((meeting, index) => {
            const row1 = document.createElement('tr');
            const headers = ["ID", "Date", "Time", "Attendees"];
            headers.forEach(header => {
                const cell = document.createElement('th');
                cell.textContent = header;
                row1.appendChild(cell);
            });
            meetingTable.appendChild(row1);

            const row2 = document.createElement('tr');
            const cells = [meeting.id, meeting.date, meeting.time, meeting.attendees];
            cells.forEach(cellContent => {
                const cell = document.createElement('td');
                cell.textContent = cellContent;
                row2.appendChild(cell);
            });
            meetingTable.appendChild(row2);

            const row3 = document.createElement('tr');
            const detailsHeaders = [" ", "Minutes", "Action", " "];
            detailsHeaders.forEach((header, index) => {
                const cell = document.createElement('th');
                cell.textContent = header;
                row3.appendChild(cell);
                if (index == 0) {
                    cell.id = 'remove-background';
                }
            });
            meetingTable.appendChild(row3);

            const row4 = document.createElement('tr');
            const detailsCells = [" ", meeting.minutes, meeting.action, " "];
            detailsCells.forEach(cellContent => {
                const cell = document.createElement('td');
                cell.textContent = cellContent;
                row4.appendChild(cell);
            });
            meetingTable.appendChild(row4);

            if (index < meetingData.length - 1) {
                const spacerRow = document.createElement('tr');
                const cell = document.createElement('td');
                cell.colSpan = 4;
                cell.style.height = '1rem';
                spacerRow.appendChild(cell);
                meetingTable.appendChild(spacerRow);
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
        const htmlContent = divElement.outerHTML;
        const cssLink = '<link rel="stylesheet" href="Styles.css">';
        const finalHtml = `<html><head>${cssLink}</head><body>${htmlContent}</body></html>`;
        localStorage.setItem('mySavedHtml', finalHtml);
        console.log('HTML content with CSS saved to local storage.');
        generatePDF();
    } else {
        console.error('Div with ID "getReport" not found.');
    }
}

function generatePDF() {
    const element = document.getElementById('getReport');
    const opt = {
        margin: 0.5,
        filename: 'report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    const pages = document.querySelectorAll('.page');
    let totalHeight = 0;

    pages.forEach((page, index) => {
        const contentHeight = page.scrollHeight;

        if (totalHeight + contentHeight > opt.html2canvas.height) {
            totalHeight = 0;
        }

        totalHeight += contentHeight;
    });

    html2pdf().from(element).set(opt).save();
}

