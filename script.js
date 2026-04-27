/////////////////////////////////// SLIDER ///////////////////////////////////////
var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 25,
  //   slidesPerGroup: 3,
  loop: true,
  centerSlide: "true",
  fade: "true",
  grabCursor: "true",
  // observer: true,
  // observeParents: true,
  //   loopFillGroupWithBlank: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
  },

  // 2. Слушаем события
  on: {
    init: function () {
      // При инициализации записываем начальный индекс (0 + 1)
      document.getElementById("slide-number").value = this.realIndex + 1;
    },
    slideChange: function () {
      // При смене слайда обновляем значение
      document.getElementById("slide-number").value = this.realIndex + 1;
    },
  },
});

/////////////////////////////////// INPUT  ///////////////////////////////////////
let maxLess;
// Первое открытие текстового файла для получения первой строки
// И максимального значения количества строк
const filePath = "folderlist.txt";
fetch(filePath)
  .then((response) => response.text())
  .then((content) => {
    // Разбиваем текст по переносам строк и считаем элементы
    const lines = content.split(/\r\n|\r|\n/);
    // Максимальное количество строк
    maxLess = lines.length;

    //Выводим количество строк при первом взаимодействии с полем input в p-span
    document.getElementById("lessCount").textContent = " " + maxLess;
    // document.getElementById("lesson__caption").textContent =
    //   "Урок: " + lines[0];
  });

// Ограничение вводимых значений
const input = document.getElementById("slide-number");
function difInput(input) {
  // Если введено ровно 0, меняем на 1
  if (input.value === "0") {
    input.value = "1";
  }
  // Если пользователь ввел 0 первым, а потом другие цифры,
  // например "05", убираем ведущий ноль
  if (input.value.length > 1 && input.value[0] === "0") {
    input.value = input.value.replace(/^0+/, "");
  }
  // if (input.value.length > 1 && input.value[0] === "-") {
  //   input.value = input.value.replace(/^-+/, "");
  // }
}

// input.addEventListener("input", function (e) {
//   // 1. Получаем текущее значение
//   let value = e.target.value;
//   // 2. Если значение отрицательное (или ввели '-' первым),
//   // берем абсолютное значение (убираем знак)
//   if (value < 0) {
//     e.target.value = Math.abs(value);
//     swiper.update();
//   }

//   swiper.unlockSwipeToPrev();
//   swiper.unlockSwipeToNext();
//   // Принудительное обновление состояния
//   // 3. Дополнительная защита: удаляем все, кроме цифр, если type="text"
//   // e.target.value = value.replace(/[^0-9]/g, '');
// });

// Слушаем событие ввода
input.addEventListener("input", async () => {
  const lineNum = parseInt(input.value);

  // Проверка на корректность числа
  if (isNaN(lineNum) || lineNum < 1) {
    return;
  }

  try {
    // 1. Загружаем файл по относительному пути
    const response = await fetch("folderlist.txt");
    if (!response.ok) throw new Error("Файл не найден");
    // Весь массив текста
    const text = await response.text();

    // 2. Разбиваем текст на строки
    const lines = text.split("\n");

    // 3. Получаем строку (индексация в массиве начинается с 0)
    if (lineNum > lines.length) {
      document.getElementById("slide-number").value = lines.length;
    }
  } catch (error) {
    document.getElementById("lessCount").textContent =
      "Ошибка: " + error.message;
  }
  plcHld();
});

//////////////// ПЕРЕСЧЁТ КОЛИЧЕСТВА ВИДИМЫХ СЛАЙДОВ НА СТРАНИЦЕ /////////////////
let currentSlidesPerView;
function updateCardPerView() {
  // Если вводимое число меньше нуля, устанавливаем ближаейшее значение - 1.
  const lineNum = parseInt(input.value);
  if (lineNum < 0) {
    document.getElementById("slide-number").value = 1;
    swiper.update();
    updateCardPerView();
  }
  currentSlidesPerView = swiper.params.slidesPerView;
  // document.getElementById("test__caption").textContent = currentSlidesPerView;
}
window.addEventListener("resize", updateCardPerView);
// Инициализация
updateCardPerView();

//// ПЕРЕСЧЁТ КОЛИЧЕСТВА ВИДИМЫХ СЛАЙДОВ ПРИ СВОРАЧИВАНИИ-РАЗВОРАЧИВАНИИ ОКНА //// ? НУЖНО ЛИ
function checkWindowState() {
  if (
    window.outerWidth === screen.availWidth &&
    window.outerHeight === screen.availHeight
  ) {
    console.log("Окно развернуто на весь экран");
    currentSlidesPerView = 3;
  } else {
    console.log("Окно в обычном режиме или свернуто");

    currentSlidesPerView = swiper.params.slidesPerView;
    updateCardPerView();
  }
}

// Отслеживаем изменение размера
window.addEventListener("resize", checkWindowState);
let slidBuff;
const button = document.getElementById("goToSlideBtn");
////////////////////////// ФУНКЦИЯ ПЕРЕХОДА К СЛАЙДУ /////////////////////////////
input.addEventListener("input", async () => {
  updateCardPerView();
  const index = parseInt(input.value); // Получаем число из инпута
  swiper.slideTo(index + currentSlidesPerView - 1, 500);
  slidBuff = index + currentSlidesPerView - 1;
  swiper.update(); // Принудительное обновление состояния
  // document.getElementById("test__caption").textContent = currentSlidesPerView;
  document.getElementById("lesson__caption").textContent =
    "Урок: " + lines[slidBuff];
});

document.querySelectorAll(".card").forEach((item) => {
  item.addEventListener("click", function (event) {
    // Получаем значение data-index
    const name = this.dataset.index;
    console.log("Индекс:", name);
    // Получаем список уроков из текстового файла
    const filePath = "folderlist.txt";
    fetch(filePath)
      .then((response) => response.text())
      .then((content) => {
        // Разбиваем текст по переносам строк и считаем элементы
        const fldlines = content.split(/\r\n|\r|\n/);

        //fldlines[name - 1]
        if (name) {
          // 4. Формируем URL и переходим (например, page1.html)
          // window.location.href = "dfdlessons/lesson" + name + "/index.html"; - для стандартного расположения
          window.location.href = "dfdlessons/index" + name + ".html";

          // Отправляем данные в дочерние окна
          let valPas = name;
          sessionStorage.setItem("sharedData", valPas);
          sessionStorage.setItem("sharedData1", fldlines[name - 1]); //
        } else {
          alert("Пожалуйста, введите имя страницы");
        }
      });
  });
});
