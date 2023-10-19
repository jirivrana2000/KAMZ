let interval; 
let currentIndex = 0;

let currentContainer
let currentCategory
let currentArticle
let currentImage
let currentContainerProgress

let previousContainer
let previousCategory
let previousArticle
let previousImage
let previousContainerProgress

let anotherPreviousContainer
let anotherPreviousCategory
let anotherPreviousArticle
let anotherPreviousImage
let anotherPreviousContainerProgress

// uložení prvků a jejich class do proměnných
const containerNames = ['window1', 'window2', 'window3'];
const classToShift = 'activeWindow'; 
const categoryNames = ['category1', 'category2', 'category3']
const categoryClass = ['activeCategory']
const articleNames = ['article1', 'article2', 'article3']
const articleClass = ['activeArticleName']
const imageNames = ['image1', 'image2', 'image3']
const imageClass = 'activeImage'
const progressBarNames = ['progress-bar1', 'progress-bar2', 'progress-bar3']
const progressBarClass = ['progressBar']

window.addEventListener('resize', handleWindowResize(currentIndex)) // při změně šířky stránky volá funkci která mění styly ohraničení kachlí podle grafického návrhu

function shiftClassBetweenContainers(currentIndex) {
    
    function moveClass() {
        handleWindowResize(currentIndex) // volá funkci která mění styly ohraničení kachlí podle grafického návrhu

        // určuje pořadí předchozího indexu
        const previousIndex = (currentIndex + containerNames.length - 1) % containerNames.length;

        // přeřezuje class mezi okny, (prvek s class je oranžový)
        currentContainer = document.getElementById(containerNames[currentIndex])
        previousContainer = document.getElementById(containerNames[previousIndex])
        previousContainer.classList.remove(classToShift)
        currentContainer.classList.add(classToShift)

        // přeřazuje class mezi kategorií v oranžovém okně zároveň odstraňuje predchozí class (změní barvu na bílou)
        currentCategory = document.getElementById(categoryNames[currentIndex])
        previousCategory = document.getElementById(categoryNames[previousIndex]) 
        previousCategory.classList.remove(categoryClass)
        currentCategory.classList.add(categoryClass)
        previousCategory.classList.add('category')
        currentCategory.classList.remove('category')
        

        // přeřezuje class mezi nadpisy článků v oranžovém okně (nadpis je bíly a bold)
        currentArticle = document.getElementById(articleNames[currentIndex])
        previousArticle = document.getElementById(articleNames[previousIndex]) 
        previousArticle.classList.remove(articleClass)
        currentArticle.classList.add(articleClass)

        // přeřezuje class mezi obrázky, (prvek s class je viditelný)
        currentImage = document.getElementById(imageNames[currentIndex])
        previousImage = document.getElementById(imageNames[previousIndex]) 
        previousImage.classList.remove(imageClass)
        currentImage.classList.add(imageClass)

        // přeřezuje class mezi progress bary (prvek s class spustí animaci načítání)
        currentContainerProgress = document.getElementById(progressBarNames[currentIndex])
        previousContainerProgress = document.getElementById(progressBarNames[previousIndex]) 
        previousContainerProgress.classList.remove(progressBarClass)
        currentContainerProgress.classList.add(progressBarClass)

        // určuje pořadí aktuálního indexu
        currentIndex = (currentIndex + 1) % containerNames.length;
    }

    moveClass() // Spouští hned po načtení stránky
    interval = setInterval(moveClass, 5000) // Přidání a odebrání tříd každých 5 sekund
}

// po kliknutí na kachli, zapne animaci od této kachle a okamžitě odstraní aktivní styly ze všech jiných kachlí
const windowChange = (num) => {
    currentIndex = num
    clearInterval(interval) // Zruší interval
    shiftClassBetweenContainers(currentIndex) // Spustí funkci s novým currentIndex

    // určuje pořadí nastávajícího indexu
    const anotherPreviousIndex = (currentIndex + containerNames.length - 2) % containerNames.length; 
    
    anotherPreviousContainer = document.getElementById(containerNames[anotherPreviousIndex])
    anotherPreviousCategory = document.getElementById(categoryNames[anotherPreviousIndex])
    anotherPreviousArticle = document.getElementById(articleNames[anotherPreviousIndex])
    anotherPreviousImage = document.getElementById(imageNames[anotherPreviousIndex])
    anotherPreviousContainerProgress = document.getElementById(progressBarNames[anotherPreviousIndex])

    previousContainer.classList.remove(classToShift);
    previousCategory.classList.remove(categoryClass)
    previousArticle.classList.remove(articleClass)
    previousImage.classList.remove(imageClass)
    previousContainerProgress.classList.remove(progressBarClass)
    anotherPreviousContainer.classList.remove(classToShift); 
    anotherPreviousCategory.classList.remove(categoryClass)
    anotherPreviousArticle.classList.remove(articleClass)
    anotherPreviousImage.classList.remove(imageClass)
    anotherPreviousContainerProgress.classList.remove(progressBarClass)
    anotherPreviousCategory.classList.add('category')
}


// zajišťuje aby po kliknutí na šipku vpravo, byl zobrazený další obrázek 
let nextButtons = document.getElementsByClassName("nextButton")
let buttonsForward = Array.from(nextButtons)
buttonsForward.forEach((btn) => {
    btn.addEventListener("click", () => {
        clearInterval(interval) // Zruší interval
  
        currentIndex = (currentIndex + 1) % containerNames.length // Nastaví currentIndex o jedna větším
        shiftClassBetweenContainers(currentIndex) // Spustí funkci s novým currentIndex
    
        // odstraňuje všechny styly a animaci z prvků které přiřadil do te doby probihajiciho interval
        previousContainer.classList.remove(classToShift)
        previousCategory.classList.remove(categoryClass)
        previousArticle.classList.remove(articleClass)
        previousImage.classList.remove(imageClass)
        previousContainerProgress.classList.remove(progressBarClass)
    })
})

// zajišťuje aby po kliknutí na šipku vlevo, byl zobrazený předchozí obrázek 
let prevButtons = document.getElementsByClassName("prevButton")
let buttonsPrev = Array.from(prevButtons)
buttonsPrev.forEach((btn) => {
    btn.addEventListener("click", () => {
        clearInterval(interval) // Zruší interval
   
        // odstraňuje všechny styly a animaci z prvků které přiřadil do te doby probihajiciho interval
        currentContainer.classList.remove(classToShift);
        currentCategory.classList.remove(categoryClass)
        currentCategory.classList.add('category')
        currentArticle.classList.remove(articleClass)
        currentImage.classList.remove(imageClass)
        currentContainerProgress.classList.remove(progressBarClass)

        currentIndex = (currentIndex - 1 + containerNames.length) % containerNames.length // Nastaví currentIndex o jedna menším
        shiftClassBetweenContainers(currentIndex) // Spustí funkci s novým currentIndex
    })
 })



// přidává a bere styly dlaždice podle aktuálního zobrazení, mobilní verze je jiná než pc
function handleWindowResize(currentIndex) {
    if (window.innerWidth >= 1007) {
        window1.style.borderBottom = 'none'
        window2.style.borderBottom = 'none'
        window3.style.borderBottom = 'none'
        if (currentIndex === 0) {

            window2.style.borderTop = 'none'
            window2.style.borderBottom = '1px solid #ebebeb'
            window2.style.width = '220px'
            window2.style.marginRight = '20px'
        } else if (currentIndex === 1) {

            window2.style.borderBottom = 'none'
            window2.style.borderTop = 'none'
            window2.style.width = '240px'
        } else if (currentIndex === 2) {

            window2.style.borderTop = '1px solid #ebebeb'
            window2.style.borderBottom = 'none'
            window2.style.width = '220px'
            window2.style.marginRight = '20px'
        }
    } else if (window.innerWidth < 1007) {
        window2.style.borderTop = 'none'
        window2.style.borderBottom = 'none'
        window2.style.marginRight = '0'

        window1.style.borderBottom = '1px solid #ebebeb'
        window2.style.borderBottom = '1px solid #ebebeb'
        window2.style.width = '255px'
        window3.style.borderBottom = '1px solid #ebebeb'
    }
}

// spuštění funkcí hned po načtení stránky
handleWindowResize()
shiftClassBetweenContainers(currentIndex)