const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const undetectedImg = document.querySelector('.unexposed-msg');
const mainDisplay = document.querySelector('.main');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');

// selected image 
let sliders = [];

// search btn direct When User's Enter Button Trigger

let input = document.getElementById("search-Input");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    document.getElementById("search-btn").click();
  }
});

const KEY = `15674931-a9d714b6e9d654524df198e00&q`;

// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';

  // show gallery title

  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumb nail count-pic" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">
   
    `;

    gallery.appendChild(div)
  })
}

// show gallary img With undectedImg msg and toggole spinner Call Code Here : 

const getImages = (query) => {

  undetectedImagesMsg(false)
  toggoleSpinners();

  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())

    .then(data => {

      toggoleSpinners();

      if (data.total > 0) {
        showImages(data.hits)
      } else {
        undetectedImagesMsg(true)
      }
    })
    .catch(err => console.log(err))

}

let slideIndex = 0;
const selectItem = (ev, img) => {
  let element = ev.target;
  element.classList.toggle('added');

  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  } else {
    sliders.splice(item, 1)
    element.classList.toggle('removed');
  }
}

var timer
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }

  // crate slider previous next area
  sliderContainer.innerHTML = `<div><button class = "Previous-btn" onclick ="sliderPreviousBtn()" class="btn btn-primary px-5">Back To Previous</button></div>`;
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';

  // hide image aria

  imagesArea.style.display = 'none';
  const duration = document.getElementById('slider-duration').value || 1500;

  // slider Duration Negetive and Possitive Value Code here with If Else Statement:

  if (duration < 0) {

    sliders.forEach(slide => {
      let item = document.createElement('div')
      item.className = "slider-item";
      item.innerHTML = `
     
      <img class="w-100" src="${slide}" alt="">

      <div class = "negetive-value-slider">
      <h2>Ahhh!🛑 Negetive Value Not Allow!</h2>
      <h4>So I'm Fixed Negetive Value Converted To Default Value</h4>
      </div>
     `;
      sliderContainer.appendChild(item)
    })
    changeSlide(0)
    timer = setInterval(function () {
      slideIndex++;
      changeSlide(slideIndex);
    }, 1500);
  }
  else {

    sliders.forEach(slide => {
      let item = document.createElement('div')
      item.className = "slider-item";
      item.innerHTML = `
                <img class="w-100"
                    src="${slide}"
                    alt="">
          `;
      sliderContainer.appendChild(item)
    })
    changeSlide(0)
    timer = setInterval(function () {
      slideIndex++;
      changeSlide(slideIndex);
    }, duration);

  }

}


// change slider index 

const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search-Input');
  getImages(search.value)
  sliders.length = 0;
})

sliderBtn.addEventListener('click', function () {
  createSlider()
})

let spinners = document.getElementById("my-spinners");

const toggoleSpinners = () => {
  spinners.classList.toggle("d-none");

}

// Previous Button Click Code Here :
const sliderPreviousBtn = () => {
  mainDisplay.style.display = 'none';  
  imagesArea.style.display = 'block';
  sliders = [];
  clearInterval(timer);
  const imagesItem = document.getElementsByClassName('added');
  for (let i = 0; i <= imagesItem.length + 1; i++) {
    imagesItem[0].classList.remove('added');
  }
}

// Display and Block not found Images message

const undetectedImagesMsg = order => {

  if (order) {
    spinners.style.display = 'none'
    undetectedImg.style.display = 'block'
  } else {
    undetectedImg.style.display = 'none'
  }

}


