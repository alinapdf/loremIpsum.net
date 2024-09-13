// работа слайдера

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
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
  breakpoints: {
    700: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
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

rangeInput.addEventListener("input", function () {
  progressValue.textContent = `${rangeInput.value}%`;
});

//выбор типа системы

const systemTypeCurrent = document.querySelector(
  ".order__form-system-type__current"
);
const systemTypeOptions = document.querySelectorAll(
  ".order__form-system-type__item"
);

const select = function (mainBtn, options, parentClass, activeClass) {
  mainBtn.addEventListener("click", toggleFunction);

  options.forEach((option) => {
    option.addEventListener("click", function () {
      const optionParametr = this.textContent;
      mainBtn.textContent = optionParametr;
      option.closest(parentClass).classList.toggle(activeClass);
    });
  });

  function toggleFunction() {
    this.closest(parentClass).classList.toggle(activeClass);
  }
};

select(
  systemTypeCurrent,
  systemTypeOptions,
  ".order__form-system-type",
  "order__form-system-type_active"
);

//загрузить файл

const fileInput = document.querySelector("#file-input");
const fileLabel = document.querySelector(".order__form-file-upload__label");

fileInput.addEventListener("change", function () {
  if (fileInput.files.length > 0) {
    const fileName = fileInput.files[0].name;
    fileLabel.textContent = fileName;
    fileLabel.style.backgroundImage = "none";
  } else {
    fileLabel.textContent = "";
    fileLabel.style.backgroundImage = 'url("img/add-file.svg")';
  }
});

// валидация
const form = document.querySelector(".order__form"); //форма
const formProgress = document.querySelector(".order__form-progress"); //прогресс из формы
const systemTypeSelection = document.querySelector(".order__form-system-type"); //выбор типа системы
const userEmailInput = document.querySelector("#e-mail"); //email
const userName = document.querySelector("#name"); //name

console.log(userName);

//создание сообщения об ошибке
function createErrorMessage(text) {
  const errorMessage = document.createElement("span");
  errorMessage.className = "input__error";
  errorMessage.textContent = text;
  return errorMessage;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  form.querySelectorAll(".input__error").forEach((el) => el.remove());

  let isValid = true;

  // рендж
  const progressValue = rangeInput.value;
  if (progressValue === "1") {
    formProgress.append(createErrorMessage("* Ползунок не использован"));
    isValid = false;
  }

  // тип системы
  if (systemTypeCurrent.textContent.trim() === "Выберите тип системы") {
    systemTypeSelection.append(createErrorMessage("* Система не выбрана"));
    isValid = false;
  }

  // имейл
  const emailValue = userEmailInput.value.trim();
  if (emailValue === "") {
    userEmailInput.parentElement.append(createErrorMessage("* Пустое поле"));
    isValid = false;
  } else if (!emailPattern.test(emailValue)) {
    userEmailInput.parentElement.append(
      createErrorMessage("* Неверный формат email")
    );
    isValid = false;
  }

  // имя
  const nameValue = userName.value.trim();
  if (nameValue === "") {
    userName.parentElement.append(createErrorMessage("* Пустое поле"));
    isValid = false;
  } else if (nameValue.length <= 1) {
    userName.parentElement.append(createErrorMessage("* Минимум 1 символ"));
    isValid = false;
  } else if (nameValue.length > 25) {
    userName.parentElement.append(createErrorMessage("* Максимум 25 символов"));
    isValid = false;
  } else if (!/^[A-Za-zА-Яа-яЁё\s]+$/.test(nameValue)) {
    userName.parentElement.append(
      createErrorMessage("* Имя должно содержать только буквы и пробелы")
    );
    isValid = false;
  }

  //файл
  if (fileLabel.textContent === "") {
    fileLabel.parentElement.append(createErrorMessage("* Файл не прикреплен"));
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  alert("форма валидна");
});

//nav

const navBtn = document.querySelector(".nav-icon-btn");
const navIcon = document.querySelector(".nav-icon");
const header = document.querySelector(".header__wrapper");

navBtn.addEventListener("click", () => {
  navIcon.classList.toggle("nav-icon--active");
  header.classList.toggle("header__wrapper_mobile");
  document.body.classList.toggle("no-scroll");
});
