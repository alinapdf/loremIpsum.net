// работа слайдера

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
  mousewheel: true,
  keyboard: true,
});

//переключание активности у кнопок навигации

const navBtns = document.querySelectorAll(".nav__menu-item");

navBtns.forEach((navBtn) => {
  navBtn.addEventListener("click", () => {
    navBtns.forEach((btn) => btn.classList.remove("nav__menu-item_active"));

    navBtn.classList.add("nav__menu-item_active");
  });
});

//рендер комментариев клиентов

const sliderWrapper = document.querySelector(".slider__wrapper");

sliderWrapper.innerHTML = "";

comments.forEach((comment) => {
  let starsHTML = "";
  for (let i = 0; i < comment.starsQuantity; i++) {
    starsHTML += `
        <div class="slider__star-item">
          <img src="img/slider/star.svg" alt="star" />
        </div>`;
  }

  sliderWrapper.innerHTML += `
      <div class="swiper-slide slider__slide">
        <div class="slider__slide-wrapper">
          <div class="slider__user">
            <div class="slider__user-avatar">
              <img src=${comment.avatar} alt=${comment.name} />
            </div>
            <div class="slider__user-info">
              <p class="slider__user-name">${comment.name}</p>
              <div class="slider__user-stars">
                ${starsHTML}  
              </div>
            </div>
          </div>
          <p class="slider__comment">${comment.commentText}</p>
          <span class="slider__date">${comment.date}</span>
        </div>
      </div>
    `;
});

//рендер ордер лист

const orderListSteps = document.querySelector(".order__list");
orderListSteps.innerHTML = "";

steps.forEach((step) => {
  orderListSteps.innerHTML += `
     <li class="order__list-item">
              <div class="order__list-item__img">
                <img src=${step.img} alt="${step.id}" />
              </div>
              <p class="order__list-item__text">
                ${step.text}
              </p>
            </li>
    `;
});

//рендер значения ренджа

const rangeInput = document.getElementById("form-progress");
const progressValue = document.getElementById("progress-value");

// Добавляем обработчик события input
rangeInput.addEventListener("input", function () {
  // Обновляем текст в спане в соответствии с положением ползунка
  progressValue.textContent = `${rangeInput.value}%`;
});
