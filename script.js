const carouselWrapperDom = document.getElementById('carousel');
const thumbnailWrapperDom = document.getElementById('thumbnails');
const prevBtn = document.getElementById('prev_slide');
const nextBtn = document.getElementById('next_slide');
const playPauseBtn = document.getElementById('play_pause_carousel');
let playPauseState = true;
const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];
const slideNodeList = [];
thumbnailsNodeList = [];

let slideIndex = 0;
let autoplay = setInterval(nextslide, 3000);

images.forEach((image, index) => {
    slideNodeList.push(createSlide(carouselWrapperDom, image));
    thumbnailsNodeList.push(createThumbnails(thumbnailWrapperDom, image, slideIndex, index));
    thumbnailsNodeList[index].addEventListener('click', ()=> {
        slideIndex = index;
        slideNodeList[slideIndex].classList.add('active');
        thumbnailsNodeList[slideIndex].classList.add('active');
        slideNodeList.forEach((slide, index) => {
            if (index != slideIndex){
                slide.classList.remove('active');
            }
        });
        thumbnailsNodeList.forEach((thumb, index) => {
            if (index != slideIndex){
                thumb.classList.remove('active');
            }
        });
        clearInterval(autoplay);
        autoplay = setInterval(nextslide, 3000);
    })
});

slideNodeList[slideIndex].classList.add('active');
thumbnailsNodeList[slideIndex].classList.add('active');

prevBtn.addEventListener('click', () => {
    slideIndex--;
    if (slideIndex < 0){
        slideIndex = slideNodeList.length - 1;
    }
    slideNodeList[slideIndex].classList.add('active');
    thumbnailsNodeList[slideIndex].classList.add('active');

    slideNodeList.forEach((slide, index) => {
        if (index != slideIndex){
            slide.classList.remove('active');
        }
    });
    thumbnailsNodeList.forEach((thumb, index) => {
        if (index != slideIndex){
            thumb.classList.remove('active');
        }
    });
});

nextBtn.addEventListener('click', nextslide);

playPauseBtn.addEventListener('click', () =>{
    if(playPauseState){
        playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
        clearInterval(autoplay);
        playPauseState = false;
    } else {
        playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        autoplay = setInterval(nextslide, 3000);
        playPauseState = true;
    }
});

function nextslide(){
    slideIndex++;
    if (slideIndex > slideNodeList.length - 1){
        slideIndex = 0;
    };
    slideNodeList[slideIndex].classList.add('active');
    thumbnailsNodeList[slideIndex].classList.add('active');
    slideNodeList.forEach((slide, index) => {
        if (index != slideIndex){
            slide.classList.remove('active');
        }
    });
    thumbnailsNodeList.forEach((thumb, index) => {
        if (index != slideIndex){
            thumb.classList.remove('active');
        }
    });
    clearInterval(autoplay);
    autoplay = setInterval(nextslide, 3000);
};

function createSlide(parentDom, object){
    let slide = document.createElement('div');
    slide.classList.add('slide');
    slide.style.backgroundImage = "url('" + object.image + "')"
    let slideTitle = document.createElement('h1');
    slideTitle.innerHTML = object.title;
    let slideDescription = document.createElement('p');
    slideDescription.innerHTML = object.text;
    slide.appendChild(slideTitle);
    slide.appendChild(slideDescription);
    parentDom.appendChild(slide);
    return slide;
}

function createThumbnails(parentDom, object){
    let thumb = document.createElement('div');
    thumb.classList.add('thumbnail');
    thumb.style.backgroundImage = "url('" + object.image + "')";
    parentDom.appendChild(thumb);
    return thumb;
}
