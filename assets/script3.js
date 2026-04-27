// ЗАГРУЗКА И ОПРЕДЕЛЕНИЕ КОЛИЧЕСТВА СТРОК ТЕКСТОВОГО ФАЙЛА И ПОЛУЧЕНИЕ ПЕРВОЙ СТРОКИ
const input = document.getElementById("myInput");
const myInput = parseInt(document.getElementById("myInput").value) - 1;
const button = document.getElementById("playBtn");
const display1 = document.getElementById("myHeader");
const befWord = document.getElementById("before__word");
const aftWord = document.getElementById("after__word");
let globalData;
let StrBuff;
// Получение значений из главной страницы
// В дочерней странице (child.html)
window.onload = function () {
  const data = sessionStorage.getItem("sharedData");
  console.log(data); // Выведет: "21"

  // Разбиваем текст по переносам строк и считаем элементы

  // Получаем список уроков из текстового файла
  if (data === null) {
    // 1. Получаем имя файла (например, "/folder/index21.html")
    let path = window.location.pathname;
    let fileName = path.split("/").pop(); // Получаем "index21.html"
    // 2. Извлекаем только цифры
    let matches = fileName.match(/\d+/);
    let number = matches ? matches[0] : null;
    const filePath = "folderlist.txt";
    fetch(filePath)
      .then((response) => response.text())
      .then((content) => {
        let fldlines = content.split(/\r\n|\r|\n/);
      });
    console.log(number); // Выведет: "21"
    document.getElementById("outtest").innerText = number; // Выведет "Урок №N"
    document.getElementById("inString").innerText = fldlines[number - 1];
    globalData = number;
  } else {
    document.getElementById("outtest").innerText = data; // Выведет "Урок №N"
    globalData = data;
    const strdata = sessionStorage.getItem("sharedData1");
    document.getElementById("inString").innerText = strdata; // Выведет "Название урока"
  }

  const filePath = "lesson" + globalData + "/video/example1.txt";
  fetch(filePath)
    .then((response) => response.text())
    .then((content) => {
      // Разбиваем текст по переносам строк и считаем элементы
      const lines = content.split(/\r\n|\r|\n/);
      let maxVal = lines.length;

      document.getElementById("myInput").value = 1;
      document.getElementById("lineCount").textContent = " " + maxVal;
      // display.textContent = 1; Строка: 1
      befWord.textContent = lines[maxVal - 1];
      display1.textContent = lines[0];
      aftWord.textContent = lines[1];
    });
}; // Конец onload function взаимодействия с главной страницей

// ПОЛУЧЕНИЕ ЗНАЧЕНИЯ СТРОКИ ТЕКСТОВОГО ФАЙЛа
// Задаём нижние границы по нулю
function readLineInput(input) {
  // Если введено ровно 0, меняем на 1
  if (input.value === "0") {
    input.value = "1";
  }
  // Если пользователь ввел 0 первым, а потом другие цифры,
  // например "05", убираем ведущий ноль
  if (input.value.length > 1 && input.value[0] === "0") {
    input.value = input.value.replace(/^0+/, "");
  }
}
// Слушаем событие ввода
input.addEventListener("input", async () => {
  const lineNum = parseInt(input.value);

  // Проверка на корректность числа
  if (isNaN(lineNum) || lineNum < 1) {
    // display.textContent = 1;
    return;
  }

  try {
    // 1. Загружаем файл по относительному пути
    const response = await fetch("lesson" + globalData + "/video/example1.txt");
    if (!response.ok) throw new Error("Файл не найден");
    // Весь массив текста
    const text = await response.text();

    // 2. Разбиваем текст на строки
    const lines = text.split("\n");
    let maxValue = lines.length;

    //Выводим количество строк при первом взаимодействии с полем input
    document.getElementById("lineCount").textContent = " " + maxValue;
    let bufLineNum = lineNum;
    // 3. Получаем строку (индексация в массиве начинается с 0)
    if (lineNum <= lines.length) {
      befWord.textContent = lines[lineNum - 2];
      display1.textContent = lines[lineNum - 1];
      if (lineNum >= lines.length) {
        aftWord.textContent = lines[0];
      } else {
        aftWord.textContent = lines[lineNum];
      }
    } else {
      display1.textContent = lines[maxValue - 1];
      aftWord.textContent = lines[0];
      document.getElementById("myInput").value = lines.length;
    }
    if (lineNum === 1) befWord.textContent = lines[maxValue - 1];
  } catch (error) {
    display1.textContent = "Ошибка: " + error.message;
    // display1.textContent = lines[maxValue - 1];
  }
  plcHld();
});

// ПЕРВАЯ КНОПКА
function readLineFirstButton() {
  const FfilePath = "lesson" + globalData + "/video/example1.txt";
  fetch(FfilePath)
    .then((response) => response.text())
    .then((content) => {
      // Разбиваем текст по переносам строк и считаем элементы
      const Flines = content.split(/\r\n|\r|\n/);
      let FmaxVal = Flines.length;
      document.getElementById("myInput").value = 1;
      document.getElementById("lineCount").textContent = " " + FmaxVal;
      befWord.textContent = Flines[FmaxVal - 1];
      display1.textContent = Flines[0];
      aftWord.textContent = Flines[1];
    });
  plcHld();
}

// НАЗАД КНОПКА
function readLinePrevButton() {
  const FfilePath = "lesson" + globalData + "/video/example1.txt";
  fetch(FfilePath)
    .then((response) => response.text())
    .then((content) => {
      // Разбиваем текст по переносам строк и считаем элементы
      const Flines = content.split(/\r\n|\r|\n/);
      let FmaxVal = Flines.length;
      let myInput = parseInt(document.getElementById("myInput").value) - 1;
      // if (myInput < 1) myInput = FmaxVal;
      if (myInput < 1) {
        myInput = FmaxVal;
        befWord.textContent = Flines[FmaxVal - 2] + " 1";
        aftWord.textContent = Flines[0];
      } else if (myInput === 1) {
        befWord.textContent = Flines[FmaxVal - 1] + " 2";
        aftWord.textContent = Flines[myInput];
      } else {
        befWord.textContent = Flines[myInput - 2] + " 3";
        aftWord.textContent = Flines[myInput];
      }

      document.getElementById("myInput").value = myInput;
      document.getElementById("lineCount").textContent = " " + FmaxVal; // Количество строк:
      // display.textContent = myInput;
      display1.textContent = Flines[myInput - 1];
    });
  plcHld();
}

// ПРОИЗВОЛЬНО КНОПКА

function readLineRandButton() {
  const FfilePath = "lesson" + globalData + "/video/example1.txt";
  fetch(FfilePath)
    .then((response) => response.text())
    .then((content) => {
      // Разбиваем текст по переносам строк и считаем элементы
      const Flines = content.split(/\r\n|\r|\n/);
      FmaxVal = Flines.length;
      // Math.random() дает 0..1, масштабируем [2]
      const randomNumber = Math.floor(Math.random() * FmaxVal) + 1;

      document.getElementById("myInput").value = randomNumber;
      document.getElementById("lineCount").textContent = " " + FmaxVal;

      if (randomNumber === 1) {
        befWord.textContent = Flines[FmaxVal - 1];
      } else {
        befWord.textContent = Flines[randomNumber - 2];
      }

      display1.textContent = Flines[randomNumber - 1];

      if (randomNumber === FmaxVal) {
        aftWord.textContent = Flines[0];
      } else {
        aftWord.textContent = Flines[randomNumber];
      }
    });
  plcHld();
}

// ВПЕРЁД КНОПКА
function readLineButton() {
  const FfilePath = "lesson" + globalData + "/video/example1.txt";

  fetch(FfilePath)
    .then((response) => response.text())
    .then((content) => {
      // Разбиваем текст по переносам строк и считаем элементы
      const Flines = content.split(/\r\n|\r|\n/);
      let FmaxVal = Flines.length;
      let myInput = parseInt(document.getElementById("myInput").value) + 1;
      let forBuff = myInput;
      if (myInput > FmaxVal) {
        myInput = 1;
        befWord.textContent = Flines[FmaxVal - 1];
        aftWord.textContent = Flines[1];
      } else if (forBuff > FmaxVal - 1) {
        forBuff = 0;
        befWord.textContent = Flines[myInput - 2];
        aftWord.textContent = Flines[forBuff];
      } else {
        befWord.textContent = Flines[myInput - 2];
        aftWord.textContent = Flines[forBuff];
      }

      document.getElementById("myInput").value = myInput;
      document.getElementById("lineCount").textContent = " " + FmaxVal; // Количество строк:
      // display.textContent = myInput;

      display1.textContent = Flines[myInput - 1];
    });
  plcHld();
}

// ПОСЛЕДНЯЯ КНОПКА
function readLineLastButton() {
  const FfilePath = "lesson" + globalData + "/video/example1.txt";
  fetch(FfilePath)
    .then((response) => response.text())
    .then((content) => {
      // Разбиваем текст по переносам строк и считаем элементы
      const Flines = content.split(/\r\n|\r|\n/);
      let FmaxVal = Flines.length;

      document.getElementById("myInput").value = FmaxVal;
      document.getElementById("lineCount").textContent = " " + FmaxVal;
      // display.textContent = FmaxVal;
      befWord.textContent = Flines[FmaxVal - 2];
      display1.textContent = Flines[FmaxVal - 1];
      aftWord.textContent = Flines[0];
    });
  plcHld();
}
function plcHld() {
  var video = document.getElementById("myVideo");
  video.pause(); // 1. Остановить видео
  video.setAttribute("poster", "assets/placeholder.jpeg");
  video.load(); // 4. Перезагрузить элемент, чтобы показать постер
}

button.addEventListener("click", function () {
  // 3. Записываем значение в переменную
  let inputValue = input.value;

  const playlist = "lesson" + globalData + "/video/" + inputValue + ".webm";
  // Загружаем переменную с именем файла в videoPlayer.
  document.getElementById("myVideo").value = playlist;
  let videoPlayer = document.getElementById("myVideo");
  videoPlayer.src = document.getElementById("myVideo").value;
  videoPlayer.play(); // Метод .play() запускает воспроизведение [2]
});

function playVideo() {}
