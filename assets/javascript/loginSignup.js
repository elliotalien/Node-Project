
const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");


inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});



const images = document.querySelectorAll(".images-wrapper img");
const textGroup = document.querySelector('.text-group');

let currentIndex = 0;
const intervalTime = 3000;


function moveSlider() {
  currentIndex++;
  if (currentIndex >= bullets.length) {
    currentIndex = 0;
  }
  images.forEach(img => img.classList.remove('show'));
  images[currentIndex].classList.add('show');
  
  textGroup.querySelectorAll('h2').forEach((text, index) => {
    if (index === currentIndex) {
      text.classList.add('show');
    } else {
      text.classList.remove('show');
    }
  });
  updateActiveBullet();
}

function updateActiveBullet() {
  bullets.forEach((bullet, index) => {
    bullet.classList.toggle('active', index === currentIndex);
  });
}

let intervalId = setInterval(moveSlider, intervalTime);

bullets.forEach((bullet, index) => {
  bullet.addEventListener('click', () => {
    clearInterval(intervalId);
    currentIndex = index;
    images.forEach(img => img.classList.remove('show'));
    images[currentIndex].classList.add('show');
    textGroup.querySelectorAll('h2').forEach((text, idx) => {
      if (idx === currentIndex) {
        text.classList.add('show');
      } else {
        text.classList.remove('show');
      }
    });
    updateActiveBullet();
    intervalId = setInterval(moveSlider, intervalTime);
  });
});




