let slideIndex = 0;
const slides = document.getElementsByClassName("slide");

function showSlide(n, direction = 'right') {
    console.log(n);
    if (n >= slides.length) {
        slideIndex = 0;
    }
    if (n < 0) {
        slideIndex = slides.length - 1;
    }

    // Remove active class from all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
            slides[i].classList.remove('slide-enter');
            slides[i].classList.remove('slide-exit');
            slides[i].classList.remove('slide-enter-left');
            slides[i].classList.remove('slide-exit-left');
    }

    // Add active class to current slide
    slides[slideIndex].classList.add('active');
    if (direction === 'right') {
        slides[slideIndex].classList.add('slide-enter');
    } else {
        slides[slideIndex].classList.add('slide-enter-left');
    }

    // Handle slide exit animation for previous slide
    if (n !== 0) {
        if (direction === 'right') {
            slides[slideIndex === slides.length - 1 ? 0 : slideIndex + 1].classList.add('slide-exit');
        } else {
            slides[slideIndex === slides.length - 1 ? 0 : slideIndex + 1].classList.add('slide-exit-left');
        }
    }
    const spans = document.getElementsByClassName("dot");
    for (let i = 0; i < spans.length; i++) {
        if (i === slideIndex) {
            spans[i].classList.add('dotActive');
        } else {
            spans[i].classList.remove('dotActive');
        }
    }
    
}

function addBottons() {
    var divParent = document.getElementById('slide-moves'); // Assuming 'slide-moves' is the ID of the parent div for buttons

    for (let i = 0; i < slides.length; i++) {
        var span = document.createElement('span');
        span.classList.add('dot'); // Example class, adjust as needed
        span.dataset.slideIndex = i; // Store the slide index as a data attribute

        span.onclick = function() {
            var index = parseInt(this.dataset.slideIndex); // Retrieve the stored index
            slideIndex = index;
            showSlide(index, 'right'); // Call showSlide with the retrieved index
        };

        divParent.appendChild(span); // Append the span to the parent div
    }
}

function plusSlides(n) {
    slideIndex += n;
    showSlide(slideIndex, 'right');
}

function plusSlidesLeft(n) {
    slideIndex += n;
    showSlide(slideIndex, 'left');
}


const prev = document.getElementById('moveLeft');

addBottons();
showSlide(slideIndex, 'right');
