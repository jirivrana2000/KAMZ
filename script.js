const images = document.querySelectorAll('.image');
const windows = document.querySelectorAll('.window');
const progressBars = document.querySelectorAll('.progress-bar');
const articleName = document.querySelectorAll('.articleName');
const category = document.querySelectorAll('.category');
const window2 = document.getElementById('window2')
let currentIndex = 0;
let progressBarWidth = 0;
let animationInterval;

function startProgressBarAnimation() {
    if (progressBarWidth >= 100) {
        resetProgressBar();
        nextImage();
    } else {
        progressBarWidth += 1;
        progressBars[currentIndex].style.width = progressBarWidth + '%';
        articleName[currentIndex].style.color = 'white';
        articleName[currentIndex].style.fontWeight = '900';
        category[currentIndex].style.color = 'white';
        if (currentIndex === 0) {
            window2.style.borderTop = 'none'
            window2.style.borderBottom = '1px solid #ebebeb'
            window2.style.width = '220px'
        } else if (currentIndex === 1) {
            window2.style.border = 'none'
            window2.style.width = '242px'
        } else if (currentIndex === 2) {
            window2.style.borderTop = '1px solid #ebebeb'
            window2.style.borderBottom = 'none'
            window2.style.width = '220px'
        }
    }
}

function resetProgressBar() {
    progressBarWidth = 0;
    progressBars[currentIndex].style.width = '0';
}

function updateProgressBar(windowIndex, width) {
    progressBars[windowIndex].style.width = width + '%';
}

function nextImage() {
    images[currentIndex].classList.remove('active-image');
    windows[currentIndex].style.backgroundColor = 'transparent';
    articleName[currentIndex].style.color = 'black'; ////////////////////////////////
    articleName[currentIndex].style.fontWeight = '500';
    category[currentIndex].style.color = '#b2b2b2'; ////////////////////////////////
    progressBars[currentIndex].style.display = 'none';

    currentIndex = (currentIndex + 1) % images.length;

    images[currentIndex].classList.add('active-image');
    resetProgressBar();

    startProgressBarAnimation();
    progressBars[currentIndex].style.display = 'block';
    windows[currentIndex].style.backgroundColor = '#e45c5e';
}

// Zobrazte první okno s barvou pozadí
windows[currentIndex].style.backgroundColor = '#e45c5e';

// Spusťte první cyklus zobrazení obrazu
images[currentIndex].classList.add('active-image');
resetProgressBar();
progressBars[currentIndex].style.display = 'block';

function updateProgressBarContinuously() {
    animationInterval = setInterval(() => {
        startProgressBarAnimation();
        updateProgressBar(currentIndex, progressBarWidth);
    }, 50);
}

updateProgressBarContinuously(); // Spusťte funkci pro aktualizaci průběžného pruhu
