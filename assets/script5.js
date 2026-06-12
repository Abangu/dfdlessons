// ЗАГРУЗКА И ОПРЕДЕЛЕНИЕ КОЛИЧЕСТВА СТРОК ТЕКСТОВОГО ФАЙЛА И ПОЛУЧЕНИЕ ПЕРВОЙ СТРОКИ
const input = document.getElementById("myInput");
const myInput = parseInt(document.getElementById("myInput").value) - 1;
const button = document.getElementById("playBtn");
const display1 = document.getElementById("myHeader");
const befWord = document.getElementById("before__word");
const aftWord = document.getElementById("after__word");
const counter = document.getElementById("counter__field");
const temp__val = document.getElementById("temp__val");
const button__bookmark = document.getElementById("button__bookmark");
const search__horizontal = document.getElementById("search__horizontal");

let Slines; // Массив для хранения всех строк файла
let searchBuff;
let globalData;
let StrBuff;
let globalValue = 0;
let maxValue;
let maxVal;
let globalOut;
let inputValue;
let BuffBookMark;
BuffBookMark = 0;
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
      maxVal = lines.length;

      document.getElementById("myInput").value = 1;
      document.getElementById("lineCount").textContent = " " + maxVal;
      // display.textContent = 1; Строка: 1
      befWord.textContent = lines[maxVal - 1];
      display1.textContent = lines[0];
      aftWord.textContent = lines[1];
    });
}; // Конец onload function взаимодействия с главной страницей

/////////////////////////////// ПОЛЕ INPUT ВВОД-ВЫВОД !!! ///////////////////////////////
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
  if (checkbox.checked) {
    const lineNum = parseInt(input.value);
    // Проверка на корректность числа
    if (isNaN(lineNum) || lineNum < 1) {
      // display.textContent = 1;
      return;
    }
    try {
      // 1. Загружаем файл по относительному пути
      if (dataArray.length > 0) {
        currentIndex = lineNum - 1;
        BMBuffNum = dataArray[currentIndex];
        const response = await fetch(
          "lesson" + globalData + "/video/example1.txt",
        );
        if (!response.ok) throw new Error("Файл не найден");
        // Весь массив текста
        const text = await response.text();

        // 2. Разбиваем текст на строки
        const lines = text.split("\n");
        let maxValue = lines.length;

        //Выводим количество строк при первом взаимодействии с полем input
        // document.getElementById("lineCount").textContent = " " + dataArray.length;
        // 3. Получаем строку (индексация в массиве начинается с 0)
        if (lineNum <= dataArray.length) {
          befWord.textContent = lines[dataArray[lineNum - 1] - 2];
          display1.textContent = lines[dataArray[lineNum - 1] - 1];
          displayArea.textContent = dataArray[input.value - 1];
          // temp__val.textContent = dataArray[lineNum - 1];
        } else {
          // Если введённое значение больше элементов массива
          input.value = dataArray.length;
          befWord.textContent = lines[dataArray.at(-1) - 2];
          display1.textContent = lines[dataArray[dataArray.length - 1] - 1];
          displayArea.textContent = dataArray[dataArray.length - 1];
          input.style.color = `rgb(${0o0}, ${0o170}, ${0o257})`;
          displayArea.style.color = "white";
          btnAdd.disabled = true;
          btnDelete.disabled = false;
        }
        if (lineNum >= dataArray.length) {
          aftWord.textContent = lines[dataArray.at(0) - 1];
          // befWord.textContent = lines[dataArray[lineNum - 1] - 2];
        } else {
          aftWord.textContent = lines[dataArray[lineNum - 1]];
        }
        if (lineNum === 1)
          befWord.textContent = lines[dataArray[dataArray.length - 1] - 1];

        // displayArea.textContent = dataArray[0];
        document.getElementById("quanArea").textContent = " " + maxVal;
        document.getElementById("lineCount").textContent =
          " " + dataArray.length;
      }
    } catch (error) {
      display1.textContent = "Ошибка: " + error.message;
    }
  } else {
    // СТАНДАРТНАЯ ФУНКЦИЯ INPUT
    const lineNum = parseInt(input.value);

    // Проверка на корректность числа
    if (isNaN(lineNum) || lineNum < 1) {
      // display.textContent = 1;
      return;
    }

    try {
      // 1. Загружаем файл по относительному пути
      BMBuffNum = lineNum;
      const response = await fetch(
        "lesson" + globalData + "/video/example1.txt",
      );
      if (!response.ok) throw new Error("Файл не найден");
      // Весь массив текста
      const text = await response.text();

      // 2. Разбиваем текст на строки
      const lines = text.split("\n");
      let maxValue = lines.length;

      //Выводим количество строк при первом взаимодействии с полем input
      document.getElementById("lineCount").textContent = " " + maxValue;
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
    }
  }
  plcHld();
  globalValue = 0;
  BMBuffNum = input.value;
});

/////////////////////////////// ПОЛЕ INPUT ВВОД-ВЫВОД !!! ///////////////////////////////

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
    // const resultSpan = document.getElementById("myHeader");
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
    // document.getElementById("myInput").value = globalValue; // myInput
    cleanBtn.disabled = true; // Здесь срабатывает disabled если удаляешь вручную!!!
    // document.getElementById("myHeader").textContent = Slines[globalValue];

    BMBuffNum = globalValue;
    outputVal();
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
    globalValue = document.getElementById("myInput").value;
  }
  document.getElementById("searchInput").value = "";
  lineInfoSpan.textContent = "0 / 0";
  prevBtn.disabled = true;
  nextBtn.disabled = true;
  cleanBtn.disabled = true;
  currentMatchIndex = 0;
  matches = [];
  // document.getElementById("myInput").value = globalValue;
  BMBuffNum = globalValue;
  outputVal();

  // BMBuffNum
});

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// ОДНА ЗАКЛАДКА //////////////////////////////////////////
let pressTimer; // Переменная для хранения таймера
const delayTime = 1000; // Время удержания в миллисекундах (1 секунда)

display1.addEventListener("click", () => {
  if (!checkbox.checked) {
    button__bookmark.style.display = "block";
    // button__bookmark.classList.remove("hidden");
    button__bookmark.textContent = BMBuffNum;
    BuffBookMark = BMBuffNum;
  }
});

// Добавляем слушатель события "click"
button__bookmark.addEventListener("click", function () {
  if (!checkbox.checked) {
    console.log("Кнопка сработала через EventListener!");
    BMBuffNum = BuffBookMark;
    // Здесь можно вызвать вашу процедуру
    outputVal();
  }
});

// Функция запуска таймера при нажатии
function startPress() {
  if (!checkbox.checked) {
    pressTimer = setTimeout(() => {
      button__bookmark.style.display = "none"; // Скрываем кнопку, если время истекло
      BuffBookMark = 0;
      // button__bookmark.classList.add("hidden");
    }, delayTime);
  }
}

// Функция отмены таймера, если кнопку отпустили раньше времени
function cancelPress() {
  clearTimeout(pressTimer);
}

// События для мыши (ПК)
button__bookmark.addEventListener("mousedown", startPress);
button__bookmark.addEventListener("mouseup", cancelPress);
button__bookmark.addEventListener("mouseleave", cancelPress); // Если увели курсор, не отпуская

// События для тачскринов (смартфоны)
button__bookmark.addEventListener("touchstart", startPress);
button__bookmark.addEventListener("touchend", cancelPress);
button__bookmark.addEventListener("touchcancel", cancelPress);

// Отключаем системное контекстное меню на смартфонах при долгом тапе
button__bookmark.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

/////////////////////////////////////////// ОДНА ЗАКЛАДКА //////////////////////////////////////////

// ПЕРВАЯ КНОПКА
function readLineFirstButton() {
  if (checkbox.checked) {
    // Выполняет свои функции, заданные тут
    if (dataArray.length > 0) {
      currentIndex = 0;
      BMBuffNum = dataArray[currentIndex];
      outputVal();
      updateDisplay();
    }
  } else {
    BMBuffNum = 1;
    outputVal();
  }
}

// НАЗАД КНОПКА
function readLinePrevButton() {
  if (checkbox.checked) {
    if (dataArray.length > 0) {
      // Если мы в начале, переходим в конец, иначе уменьшаем индекс
      currentIndex =
        currentIndex === 0 ? dataArray.length - 1 : currentIndex - 1;
      BMBuffNum = dataArray[currentIndex];
      outputVal();
      updateDisplay();
    }
  } else {
    BMBuffNum--;
    outputVal();
  }
}

// ПРОИЗВОЛЬНО КНОПКА
function readLineRandButton() {
  if (checkbox.checked) {
    // Выполняет свои функции, заданные тут
    if (dataArray.length > 0) {
      // Если мы в конце, переходим в начало, иначе увеличиваем индекс
      currentIndex = Math.floor(Math.random() * dataArray.length);
      BMBuffNum = dataArray[currentIndex];
      outputVal();
      updateDisplay();
    }
  } else {
    BMBuffNum = Math.floor(Math.random() * maxVal) + 1;
    outputVal();
  }
}

// ВПЕРЁД КНОПКА
function readLineButton() {
  if (checkbox.checked) {
    // Выполняет свои функции, заданные тут
    if (dataArray.length > 0) {
      // Если мы в конце, переходим в начало, иначе увеличиваем индекс
      currentIndex =
        currentIndex === dataArray.length - 1 ? 0 : currentIndex + 1;
      BMBuffNum = dataArray[currentIndex];
      outputVal();
      updateDisplay();
    }
  } else {
    BMBuffNum++;
    outputVal();
  }
}

// ПОСЛЕДНЯЯ КНОПКА
function readLineLastButton() {
  if (checkbox.checked) {
    // Выполняет свои функции, заданные тут
    if (dataArray.length > 0) {
      currentIndex = dataArray.length - 1;
      BMBuffNum = dataArray[currentIndex];
      outputVal();
      updateDisplay();
    }
  } else {
    BMBuffNum = maxVal;
    outputVal();
  }
}

////////////////////////////////////////// ПОВТОРЕНИЕ //////////////////////////////////////////
let dataArray = [];
let currentIndex = 0;

const btnAdd = document.getElementById("btnAdd");
const btnDelete = document.getElementById("btnDelete");
const btnClear = document.getElementById("btnClear");
const checkbox = document.getElementById("myCheckbox");
const BMlabel = document.getElementById("BMlabel");
const displayArea = document.getElementById("displayArea");
const numberArea = document.getElementById("numberArea");
const quanArea = document.getElementById("quanArea");
let dispWrapArea = document.getElementById("dispWrapArea");
const container1 = document.getElementById("valWarpArea"); // должен быть hidden
const container2 = document.getElementById("numWarpArea");

let BMBuffNum;
BMBuffNum = 1;
let BMbuff = 1;
input.value = BMBuffNum;
let NextNumber;
let PrevNumber;
let delBuff;

checkbox.disabled = true;
checkbox.checked = false;
BMlabel.disabled = true;

// Функция обновления параграфа
// Данная функция маркирует статус элементов после выполнения каких-либо действий
function updateDisplay() {
  if (dataArray.length === 0) {
    // Массив пуст
    document.getElementById("myInput").value = BMBuffNum;
    displayArea.textContent = "-";
    numberArea.textContent = "-";
    quanArea.textContent = dataArray.length; // checkbox выключен
    checkbox.checked = false; //Автоматически выключается checkbox
    BMlabel.textContent = "Обуч";

    btnAdd.disabled = false;
    displayArea.style.color = "black";
    // dispWrapArea.style.display = "none"; // Проблема была в этой строчке!..
    numberArea.style.color = "black";
    input.style.color = "black";
    btnDelete.disabled = true;
    btnClear.disabled = true;
    checkbox.disabled = true;
    BMlabel.disabled = true;
    search__horizontal.style.visibility = "visible";
  } else {
    // Длина массива больше нуля
    numberArea.textContent = currentIndex + 1;
    btnDelete.disabled = false;
    btnClear.disabled = false;
    checkbox.disabled = false;
    BMlabel.disabled = false;
    if (checkbox.checked) {
      container1.classList.remove("hidden");
      container2.classList.add("hidden");
      displayArea.textContent = dataArray[currentIndex];
      input.style.color = `rgb(${0o0}, ${0o170}, ${0o257})`;
      displayArea.style.color = "white";
    }
  }
}

function BMExclusion() {
  // trim() убирает случайные пробелы, а проверка !== '' гарантирует, что поле не пустое
  // const svalue = input.value.trim();
  if (checkbox.checked) {
    const svalue = String(dataArray[currentIndex]);
    // Находим в массиве индекс соответствующий введённому в input числу
    const index = dataArray.findIndex((item) => item == svalue);
    if (dataArray.includes(svalue)) {
      // Если есть — выводим сообщение
      // displayArea.textContent = "Такое значение уже есть.";
      displayArea.style.color = "white";
      numberArea.style.color = "white";
      input.style.color = `rgb(${0o0}, ${0o170}, ${0o257})`;
      displayArea.textContent = svalue;
      numberArea.textContent = index + 1;
      btnAdd.disabled = true;
      btnDelete.disabled = false;
    } else {
      displayArea.textContent = "-";
      numberArea.textContent = "-";
      displayArea.style.color = "black";
      numberArea.style.color = "black";
      input.style.color = "black";
      btnAdd.disabled = false;
      btnDelete.disabled = true;
    }
  } else {
    const svalue = String(BMBuffNum);
    // Находим в массиве индекс соответствующий введённому в input числу
    const index = dataArray.findIndex((item) => item == svalue);
    if (dataArray.includes(svalue)) {
      // Если есть — выводим сообщение
      // displayArea.textContent = "Такое значение уже есть.";
      displayArea.style.color = "white";
      numberArea.style.color = "white";
      input.style.color = `rgb(${0o0}, ${0o170}, ${0o257})`;
      displayArea.textContent = svalue;
      numberArea.textContent = index + 1;
      btnAdd.disabled = true;
      btnDelete.disabled = false;
    } else {
      displayArea.textContent = "-";
      numberArea.textContent = "-";
      displayArea.style.color = "black";
      numberArea.style.color = "black";
      input.style.color = "black";
      btnAdd.disabled = false;
      btnDelete.disabled = true;
    }
  }
}

// При вводе вручную в INPUT если имеется значение, делаем кнопку "Добавить" активной
input.addEventListener("input", () => {
  BMExclusion();
});

// 1. Добавление значения
btnAdd.addEventListener("click", () => {
  const value = input.value.trim();
  if (value !== "") {
    dataArray.push(value);
    // input.value = ""; // Очищаем инпут // Мы не можем очистить input!!!
    currentIndex = dataArray.length - 1; // Переходим на последний добавленный
    updateDisplay();
    btnAdd.disabled = true;
  }
  displayArea.style.color = "white";
  numberArea.style.color = "white";
  document.getElementById("quanArea").textContent = " " + dataArray.length;
  input.style.color = `rgb(${0o0}, ${0o170}, ${0o257})`;
});

// 4. Удаление текущего значения
btnDelete.addEventListener("click", () => {
  if (checkbox.checked) {
    // Если удаляем элемент в режиме "Повторение"
    if (dataArray.length > 0) {
      // Удаляем 1 элемент по текущему индексу
      dataArray.splice(currentIndex, 1);
      // Корректируем индекс после удаления
      if (currentIndex >= dataArray.length) {
        currentIndex = dataArray.length - 1;
      }
      if (currentIndex < 0) {
        currentIndex = 0;
      }
      input.value = currentIndex; //
      BMBuffNum = currentIndex; //
      outputVal();
    } else {
      btnDelete.disabled = true;
      btnClear.disabled = true;
    }
    displayArea.style.color = "black";
    numberArea.style.color = "black";
    updateDisplay();
    BMExclusion();
  } else {
    // Если удаляем элемент в режиме "Обучение"
    if (dataArray.length > 0) {
      // navigate.style.backgroundColor = "lightblue";
      // Удаляем 1 элемент по текущему индексу
      dataArray.splice(currentIndex, 1);
      // Корректируем индекс после удаления
      if (currentIndex >= dataArray.length) {
        currentIndex = dataArray.length - 1;
      }
      if (currentIndex < 0) {
        currentIndex = 0;
      }
      displayArea.textContent = "-";
      numberArea.textContent = "-";
      quanArea.textContent = dataArray.length;
      btnAdd.disabled = false;
      btnDelete.disabled = true;
    }
    input.style.color = "black";
    displayArea.style.color = "black";
    numberArea.style.color = "black";
  }
});

// 5. Полная очистка массива
btnClear.addEventListener("click", () => {
  dataArray = [];
  currentIndex = 0;
  updateDisplay();
  input.value = BMBuffNum;
  outputVal();
  container1.classList.add("hidden");
  container2.classList.remove("hidden");
});

checkbox.addEventListener("change", function () {
  if (this.checked) {
    if (dataArray.length > 1) {
      currentIndex = 0; // При переходе в режим обучения переходим на 1 позицию массива

      BMlabel.textContent = "Повт";
      updateDisplay();
      BMBuffNum = dataArray[0];
      outputVal();
      BMExclusion();
      container1.classList.remove("hidden");
      container2.classList.add("hidden");
      displayArea.textContent = dataArray[currentIndex];

      button__bookmark.style.display = "none";
      search__horizontal.style.visibility = "hidden";
    }
    // button__bookmark.classList.add("hidden");
  } else {
    if (dataArray.length > 1) {
      input.value = BMBuffNum;
      BMlabel.textContent = "Обуч";
      numberArea.style.color = "black";
      updateDisplay();

      container1.classList.add("hidden");
      container2.classList.remove("hidden");
      document.getElementById("myInput").value = BMBuffNum;
      document.getElementById("numberArea").textContent = currentIndex + 1;
      document.getElementById("quanArea").textContent = " " + dataArray.length;
      document.getElementById("lineCount").textContent = " " + maxVal;
      if (BuffBookMark > 0) {
        button__bookmark.style.display = "block";
      }
      search__horizontal.style.visibility = "visible";
    }
  }
  // button__bookmark.classList.remove("hidden");
});

////////////////////////////////////////// ПОВТОРЕНИЕ //////////////////////////////////////////

//////////////////////////////////////// ВЫВОД ЗНАЧЕНИЯ ////////////////////////////////////////
function outputVal() {
  const GLfilePath = "lesson" + globalData + "/video/example1.txt"; // myHeader
  fetch(GLfilePath)
    .then((response) => response.text())
    .then((content) => {
      // Разбиваем текст по переносам строк и считаем элементы
      GLlines = content.split(/\r\n|\r|\n/);
      GLmaxVal = GLlines.length;
      if (BMBuffNum > GLmaxVal) {
        BMBuffNum = 1;
      }
      if (BMBuffNum < 1) {
        BMBuffNum = GLmaxVal;
      }

      if (checkbox.checked) {
        document.getElementById("myInput").value = currentIndex + 1;
        document.getElementById("numberArea").textContent = dataArray[0];
        document.getElementById("quanArea").textContent = " " + maxVal;
        document.getElementById("lineCount").textContent =
          " " + dataArray.length;
      } else {
        document.getElementById("myInput").value = BMBuffNum;
        document.getElementById("numberArea").textContent = currentIndex + 1;
        document.getElementById("quanArea").textContent =
          " " + dataArray.length;
        document.getElementById("lineCount").textContent = " " + maxVal;
      }
      let GlobVal = BMBuffNum - 1;
      document.getElementById("myHeader").textContent = GLlines[GlobVal];
      let GLValMinus = GlobVal - 1;
      let GLValPlus = GlobVal + 1;
      if (GLValMinus < 0) {
        GLValMinus = GLmaxVal - 1;
        befWord.textContent = GLlines[GLValMinus];
      } else {
        befWord.textContent = GLlines[GLValMinus];
      }
      if (GLValPlus > GLmaxVal - 1) {
        GLValPlus = 0;
        aftWord.textContent = GLlines[GLValPlus];
      } else {
        aftWord.textContent = GLlines[GLValPlus];
      }
      BMExclusion();
    });
  plcHld();
  globalValue = 0;
}
//////////////////////////////////////// ВЫВОД ЗНАЧЕНИЯ ////////////////////////////////////////
// ПРОВЕРКА
// function testhidden() {
//   if (container1.classList.contains("hidden")) {
//     temp__val.textContent = "ЕСТЬ!";
//   } else {
//     temp__val.textContent = "НЕТ*";
//   }
// }
// ПРОВЕРКА
function plcHld() {
  var video = document.getElementById("myVideo");
  video.pause(); // 1. Остановить видео
  video.setAttribute("poster", "assets/placeholder.jpg");
  video.load(); // 4. Перезагрузить элемент, чтобы показать постер
}

button.addEventListener("click", function () {
  // 3. Записываем значение в переменную
  if (checkbox.checked) {
    // inputValue = BMBuffNum;
    inputValue = dataArray[input.value - 1];
    // temp__val.textContent = dataArray[currentIndex] + " " + BMBuffNum;
  } else {
    inputValue = input.value;
  }

  const playlist = "lesson" + globalData + "/video/" + inputValue + ".webm";
  // Загружаем переменную с именем файла в videoPlayer.
  document.getElementById("myVideo").value = playlist;
  let videoPlayer = document.getElementById("myVideo");
  videoPlayer.src = document.getElementById("myVideo").value;
  videoPlayer.play(); // Метод .play() запускает воспроизведение [2]
});

function playVideo() {}

// Возвращены функции поля INPUT действовавшие ранее, без использования функции outputVal()
