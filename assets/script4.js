// ЗАГРУЗКА И ОПРЕДЕЛЕНИЕ КОЛИЧЕСТВА СТРОК ТЕКСТОВОГО ФАЙЛА И ПОЛУЧЕНИЕ ПЕРВОЙ СТРОКИ
const input = document.getElementById("myInput");
const myInput = parseInt(document.getElementById("myInput").value) - 1;
const button = document.getElementById("playBtn");
const display1 = document.getElementById("myHeader");
const befWord = document.getElementById("before__word");
const aftWord = document.getElementById("after__word");
let Slines = []; // Массив для хранения всех строк файла
let searchBuff;
let globalData;
let StrBuff;
// Получение значений из главной страницы
// В дочерней странице (child.html)
window.onload = function () {
  const data = sessionStorage.getItem("sharedData");
  // console.log(data); Выведет: "21"

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
      Slines = lines;
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
    // let bufLineNum = lineNum;
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
  globalValue = 0;
});

////////////////////////////////////////////////////////////////////////////////////////////////////

let matches = []; // Массив индексов найденных строк
let currentMatchIndex = -1; // Индекс в массиве matches

const inputSearch = document.getElementById("searchInput");
//befWord
const resultSpan = document.getElementById("myHeader");
//afterWord
const lineInfoSpan = document.getElementById("lineInfo");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// // 1. Загрузка файла с помощью fetch
// Определение пременной Slines, следующей далее в этом блоке, переходит вверх

// 2. Функция поиска
function performSearch() {
  const query = inputSearch.value.toLowerCase();
  matches = [];
  currentMatchIndex = -1;

  if (query.length > 0) {
    Slines.forEach((line, index) => {
      if (line.toLowerCase().includes(query)) {
        matches.push(index); // Сохраняем номер строки
      }
    });
  }

  updateUI();
}

// 3. Обновление интерфейса (результаты + кнопки)
function updateUI() {
  if (matches.length > 0) {
    currentMatchIndex = 0;
    displayMatch();
  } else {
    resultSpan.textContent = inputSearch.value ? "Не найдено" : "";
    lineInfoSpan.textContent = "0 / 0";
    prevBtn.disabled = true;
    nextBtn.disabled = true;
  }

  // Блокировка кнопок, если результатов 1 или 0
  if (matches.length <= 1) {
    prevBtn.disabled = true;
    nextBtn.disabled = true;
  }
}

// Отображение текущего результата
function displayMatch() {
  if (currentMatchIndex >= 0 && currentMatchIndex < matches.length) {
    const lineIdx = matches[currentMatchIndex];
    const resultSpan = document.getElementById("myHeader");
    let buflineIdxMinus = lineIdx - 1;
    let buflineIdxPlus = lineIdx + 1;
    let SMaxVal = Slines.length;
    if (buflineIdxMinus < 0) {
      buflineIdxMinus = SMaxVal - 1;
      befWord.textContent = Slines[buflineIdxMinus];
    } else {
      befWord.textContent = Slines[buflineIdxMinus];
    }
    resultSpan.textContent = Slines[lineIdx];
    if (buflineIdxPlus > SMaxVal - 1) {
      buflineIdxPlus = 0;
      aftWord.textContent = Slines[buflineIdxPlus];
    } else {
      aftWord.textContent = Slines[buflineIdxPlus];
    }

    lineInfoSpan.textContent = `${currentMatchIndex + 1} / ${matches.length} (строка ${lineIdx + 1})`;
    document.getElementById("myInput").value = lineIdx + 1;
    // Управление disabled для навигации
    prevBtn.disabled = currentMatchIndex === 0;
    nextBtn.disabled = currentMatchIndex === matches.length - 1;
  }
}

// Слушатели событий
inputSearch.addEventListener("input", performSearch);
/////////////////////////////////////////////////////////////////////////
// Сохраняем данные показанные до поиска
// 1. Объявляем глобальную переменную
let globalValue = 0;

// 2. Получаем ссылки на элементы
const inputField = document.getElementById("searchInput");
const paragraph = document.getElementById("myInput");

// 3. Создаем функцию для записи значения
function updateGlobalVariable() {
  // Получаем текст, преобразуем в число (parseInt или Number)
  if (globalValue === 0) {
    globalValue = paragraph.value;
    // document.getElementById("temp__val").textContent = globalValue; ///////////////////////////////////////////
    console.log("Значение в глобальной переменной:", globalValue);
  }
}

// 4. Вешаем обработчики событий: focus (получение фокуса) и click (клик)
inputField.addEventListener("focus", updateGlobalVariable);
inputField.addEventListener("click", updateGlobalVariable);
/////////////////////////////////////////////////////////////////////////
let Blines;
let BmaxVal;
// 2. Добавляем слушатель событий на поле ввода
inputField.addEventListener("input", function () {
  // НАДО ИСПОЛЬЗОВАТЬ СОБЫТИЕ КЛИК, для запоминания исходного числа
  // .trim() удаляет лишние пробелы по краям
  if (this.value.trim() === "") {
    // Возвращаемся к переменным показанным до начала функции поиска
    document.getElementById("myInput").value = globalValue; // myInput
    // document.getElementById("temp__val").textContent = "УДАЛЕНО!"; /////////////////////////////////////////////////////////
    befWord.textContent = "Лево!";
    aftWord.textContent = "Право";
    const BfilePath = "lesson" + globalData + "/video/example1.txt"; // myHeader
    fetch(BfilePath)
      .then((response) => response.text())
      .then((content) => {
        // Разбиваем текст по переносам строк и считаем элементы
        Blines = content.split(/\r\n|\r|\n/);
        BmaxVal = Blines.length;
        let RetVal = globalValue - 1;
        document.getElementById("myHeader").textContent = Blines[RetVal];
        //befWord
        let RetValMinus = RetVal - 1;
        let RetValPlus = RetVal + 1;
        if (RetValMinus < 0) {
          RetValMinus = BmaxVal - 1;
          befWord.textContent = Blines[RetValMinus];
        } else {
          befWord.textContent = Blines[RetValMinus];
        }
        if (RetValPlus > BmaxVal - 1) {
          RetValPlus = 0;
          aftWord.textContent = Blines[RetValPlus];
        } else {
          aftWord.textContent = Blines[RetValPlus];
        }
      });
  }
});

nextBtn.addEventListener("click", () => {
  if (currentMatchIndex < matches.length - 1) {
    currentMatchIndex++;
    displayMatch();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentMatchIndex > 0) {
    currentMatchIndex--;
    displayMatch();
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////

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
  globalValue = 0;
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
  globalValue = 0;
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
  globalValue = 0;
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
  globalValue = 0;
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
  globalValue = 0;
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
