// ЗАГРУЗКА И ОПРЕДЕЛЕНИЕ КОЛИЧЕСТВА СТРОК ТЕКСТОВОГО ФАЙЛА И ПОЛУЧЕНИЕ ПЕРВОЙ СТРОКИ
const input = document.getElementById("myInput");
const myInput = parseInt(document.getElementById("myInput").value) - 1;
const button = document.getElementById("playBtn");
const display1 = document.getElementById("myHeader");
const befWord = document.getElementById("before__word");
const aftWord = document.getElementById("after__word");
let Slines; // Массив для хранения всех строк файла
let searchBuff;
let globalData;
let StrBuff;
let globalValue = 0;
// Получение значений из главной страницы
// В дочерней странице (child.html)
window.onload = function () {
  ///////////////////////////////// INFO BLOCK /////////////////////////////////////
  // document.getElementById("temp__val").textContent = "НАЧАЛИ";
  // document.getElementById("glob__val").textContent = globalValue;
  ///////////////////////////////// INFO BLOCK /////////////////////////////////////
  const data = sessionStorage.getItem("sharedData");
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
    console.log(filePath);
    fetch(filePath)
      .then((response) => response.text())
      .then((content) => {
        let fldlines = content.split(/\r\n|\r|\n/);
        let NameLess = fldlines.length;

        // console.log(number);Выведет: "21"
        document.getElementById("outtest").innerText = number; // Выведет "Урок №N"
        document.getElementById("inString").innerText = fldlines[NameLess - 1];
      });
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
const inputSearch = document.getElementById("searchInput"); // Окно поиска
//befWord
const resultSpan = document.getElementById("myHeader"); // Заголовок, основное слово
//afterWord
const lineInfoSpan = document.getElementById("lineInfo"); // Строка информации под окном поиска
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const cleanBtn = document.getElementById("cleanBtn");

// // 1. Загрузка файла с помощью fetch
// Определение пременной Slines, следующей далее в этом блоке, переходит вверх
// inputSearch.addEventListener("input", function () {
//   // 3. Проверяем, есть ли текст (убираем пробелы по краям)
//   if (this.value.trim() !== "") {
//     cleanBtn.disabled = false; // Делаем доступной
//   } else {
//     cleanBtn.disabled = true; // Делаем заблокированной
//   }
// });
// 2. Функция поиска
function performSearch() {
  // То, что вводится в окно поиска searchInput и регистр - маленькие буквы
  const query = inputSearch.value.toLowerCase();
  matches = []; // Обнуление массива
  currentMatchIndex = -1; // определение первого значения массива
  //Если в searchInput что-то набрано
  if (query.length > 0) {
    // Формируем массив, набирая слова включающие введенное значение
    // document.getElementById("temp__val").textContent = "Больше!"; Подтверждение, что в searchInput есть символы

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
  //Если в searchInput массиве любое количество значений
  if (matches.length > 0) {
    currentMatchIndex = 0;
    displayMatch();
  } else {
    resultSpan.textContent = inputSearch.value ? "Не найдено" : "";
    lineInfoSpan.textContent = "0 / 0";
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    cleanBtn.disabled = true;
  }

  // Блокировка кнопок, если результатов 1 или 0
  if (matches.length <= 1) {
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    updateUI;
  }
  if (matches.length < 1) {
    cleanBtn.disabled = false; // Здесь!?
    updateUI;
  }
}

// Отображение текущего результата
function displayMatch() {
  if (currentMatchIndex >= 0 && currentMatchIndex < matches.length) {
    const lineIdx = matches[currentMatchIndex];
    const resultSpan = document.getElementById("myHeader");
    //Дописано мной
    //При достижении граничных значений в окне поиска, уточняем значения ДО и ПОСЛЕ
    //для показа их справа и слева от myHeader
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
    // Вывод в lineInfo (под поиском)
    // lineInfoSpan.textContent = `${currentMatchIndex + 1} / ${matches.length} (строка ${lineIdx + 1})`;
    lineInfoSpan.textContent = `${currentMatchIndex + 1} / ${matches.length} (${lineIdx + 1})`;
    document.getElementById("myInput").value = lineIdx + 1;
    // Управление disabled для навигации
    // Если равно нулю, кнопка ПРЕД disabled
    prevBtn.disabled = currentMatchIndex === 0;
    // Если максимальное значение, кнопка ПОСЛ disabled
    nextBtn.disabled = currentMatchIndex === matches.length - 1;

    cleanBtn.disabled = currentMatchIndex === "";
  }
}

// Слушатели событий
inputSearch.addEventListener("input", performSearch);
/////////////////////////////////////////////////////////////////////////
// Сохраняем данные показанные до поиска
// 1. Объявляем глобальную переменную

// 2. Получаем ссылки на элементы
const inputField = document.getElementById("searchInput");
const paragraph = document.getElementById("myInput");

// 3. Создаем функцию для записи значения
function updateGlobalVariable() {
  // Получаем текст, преобразуем в число (parseInt или Number)
  if (globalValue === 0) {
    globalValue = paragraph.value;
    ///////////////////////////////// INFO BLOCK /////////////////////////////////////
    // document.getElementById("temp__val").textContent = "ВВЕЛИ";
    // document.getElementById("glob__val").textContent = globalValue;
    ///////////////////////////////// INFO BLOCK /////////////////////////////////////

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
    cleanBtn.disabled = true; // Здесь срабатывает disabled если удаляешь вручную!!!
    //////////////////////////////// INFO BLOCK //////////////////////////////////
    // document.getElementById("temp__val").textContent = "УДАЛ РУЧН";
    // document.getElementById("glob__val").textContent = globalValue;
    //////////////////////////////// INFO BLOCK //////////////////////////////////
    document.getElementById("myHeader").textContent = Slines[globalValue];
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
  if (query.length > 0) {
    cleanBtn.disabled = false;
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

cleanBtn.addEventListener("click", () => {
  if (globalValue === 0) {
    //////////////////////////////// INFO BLOCK //////////////////////////////////
    // document.getElementById("temp__val").textContent = "УДАЛ КНОП!";
    // document.getElementById("glob__val").textContent = globalValue;
    //////////////////////////////// INFO BLOCK //////////////////////////////////
    globalValue = document.getElementById("myInput").value;
  }

  //////////////////////////////// INFO BLOCK //////////////////////////////////
  // document.getElementById("temp__val").textContent = "УДАЛ КНОП!";
  // document.getElementById("glob__val").textContent = globalValue;
  //////////////////////////////// INFO BLOCK //////////////////////////////////
  document.getElementById("searchInput").value = "";
  lineInfoSpan.textContent = "0 / 0";
  prevBtn.disabled = true;
  nextBtn.disabled = true;
  cleanBtn.disabled = true;
  currentMatchIndex = 0;
  matches = [];
  document.getElementById("myInput").value = globalValue;

  const UfilePath = "lesson" + globalData + "/video/example1.txt"; // myHeader
  fetch(UfilePath)
    .then((response) => response.text())
    .then((content) => {
      // Разбиваем текст по переносам строк и считаем элементы
      Ulines = content.split(/\r\n|\r|\n/);
      UmaxVal = Ulines.length;

      let CetVal = globalValue - 1;
      document.getElementById("myHeader").textContent = Ulines[globalValue];

      document.getElementById("myHeader").textContent = Ulines[CetVal];
      let CetValMinus = CetVal - 1;
      let CetValPlus = CetVal + 1;
      if (CetValMinus < 0) {
        CetValMinus = UmaxVal - 1;
        befWord.textContent = Ulines[CetValMinus];
      } else {
        befWord.textContent = Ulines[CetValMinus];
      }
      if (CetValPlus > UmaxVal - 1) {
        CetValPlus = 0;
        aftWord.textContent = Ulines[CetValPlus];
      } else {
        aftWord.textContent = Ulines[CetValPlus];
      }
      document.getElementById("cetval").textContent = CetVal;
    });
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
        befWord.textContent = Flines[FmaxVal - 2];
        aftWord.textContent = Flines[0];
      } else if (myInput === 1) {
        befWord.textContent = Flines[FmaxVal - 1];
        aftWord.textContent = Flines[myInput];
      } else {
        befWord.textContent = Flines[myInput - 2];
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
