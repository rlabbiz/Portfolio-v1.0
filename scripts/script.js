function createSlide3() {
    const slide = document.createElement('div');
    slide.classList.add('slide');
    slide.innerHTML = `
    <div class="card card3">
        <img src="images/site4.jpeg" alt="portfolio1" />
        <div class="card-content">
            <h3>Portfolio 1</h3>
            <p>Portfolio 1 description</p>
            <a href="#" class="btn">See More</a>
        </div>
    </div>
    <div class="card card3">
        <img src="images/site5.jpeg" alt="portfolio2" />
        <div class="card-content">
            <h3>Portfolio 1</h3>
            <p>Portfolio 1 description</p>
            <a href="#" class="btn">See More</a>
        </div>
    </div>
    <div class="card card3">
        <img src="images/site6.jpeg" alt="portfolio3" />
        <div class="card-content">
            <h3>Portfolio 1</h3>
            <p>Portfolio 1 description</p>
            <a href="#" class="btn">See More</a>
        </div>
    </div>
    `;
    return slide;
}

function createSlide2() {
    const slide = document.createElement('div');
    slide.classList.add('slide');
    slide.innerHTML = `
    <div class="card card2">
        <img src="images/site4.jpeg" alt="portfolio1" />
        <div class="card-content">
            <h3>Portfolio 1</h3>
            <p>Portfolio 1 description</p>
            <a href="#" class="btn">See More</a>
        </div>
    </div>
    <div class="card card2">
        <img src="images/site5.jpeg" alt="portfolio2" />
        <div class="card-content">
            <h3>Portfolio 1</h3>
            <p>Portfolio 1 description</p>
            <a href="#" class="btn">See More</a>
        </div>
    </div>
    `;
    return slide;
}

function createSlide1() {
    const slide = document.createElement('div');
    slide.classList.add('slide');
    slide.innerHTML = `
    <div class="card card1">
        <img src="images/site4.jpeg" alt="portfolio1" />
        <div class="card-content">
            <h3>Portfolio 1</h3>
            <p>Portfolio 1 description</p>
            <a href="#" class="btn">See More</a>
        </div>
    </div>
    `;
    return slide;
}

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
    divParent.innerHTML = ''; // Clear the parent div

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

function responsiveSlide() {
    const portfolioSlide = document.querySelector('.portfolio-slide');
    portfolioSlide.innerHTML = ''; 

    if (window.innerWidth >= 1000) {
        portfolioSlide.appendChild(createSlide3());
        portfolioSlide.appendChild(createSlide3());
        portfolioSlide.appendChild(createSlide3());
    } else if (window.innerWidth >= 768) {
        portfolioSlide.appendChild(createSlide2());
        portfolioSlide.appendChild(createSlide2());
    } else if (window.innerWidth >= 500) {
        portfolioSlide.appendChild(createSlide1());
    }
    addBottons();
    showSlide(slideIndex, 'right');
}

responsiveSlide();
window.addEventListener('resize', responsiveSlide);

const prev = document.getElementById('moveLeft');

addBottons();
showSlide(slideIndex, 'right');


function mobileMenu() {
    const menu = document.getElementsByClassName('mobile-menu-link');
    const showBtn = document.querySelector('.mobile-menu-icon');

    showBtn.addEventListener('click', () => {
        const menu = document.querySelector('.mobile-menu');
        menu.classList.toggle('mobile-menu-active');
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('mobile-menu-link')) {
            const menu = document.querySelector('.mobile-menu');
            menu.classList.toggle('mobile-menu-active');
        }
    });
}

mobileMenu();
