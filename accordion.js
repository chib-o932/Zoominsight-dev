// accordian.js
document.addEventListener('DOMContentLoaded', function () {
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');

    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', function () {
            const children = this.children;
            const arrow  = children[1];

            const content = this.nextElementSibling;

            // Toggle the 'show' class on the content
            arrow.classList.toggle('show');
            content.classList.toggle('show');

            // Collapse other open items if single mode is desired
            if (document.querySelector('.accordion').getAttribute('data-type') === 'single') {
                accordionTriggers.forEach(otherTrigger => {
                    if (otherTrigger !== this) {
                        otherTrigger.nextElementSibling.classList.remove('show');
                    }
                });
            }
        });
    });
});

function loadOverlay() {
    fetch('accordian.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('overlay-container').innerHTML = data;
            document.getElementById('accordion').style.display = 'flex';
            attachAccordionListeners();
        })
        .catch(error => console.error('Error loading overlay:', error));
}

// Function to hide the overlay
function hideOverlay() {
    document.getElementById('accordion').style.display = 'none';
}

function attachAccordionListeners() {
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');

    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', function () {
            const children = this.children;
            const arrow  = children[1];

            const content = this.nextElementSibling;

            // Toggle the 'show' class on the content
            arrow.classList.toggle('show');
            content.classList.toggle('show');

            // Collapse other open items if single mode is desired
            if (document.querySelector('.accordion').getAttribute('data-type') === 'single') {
                accordionTriggers.forEach(otherTrigger => {
                    if (otherTrigger !== this) {
                        otherTrigger.nextElementSibling.classList.remove('show');
                    }
                });
            }
        });
    });
}
