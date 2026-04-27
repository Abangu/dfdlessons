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
  if (input.value.length > 1 && input.value[0] === "-") {
    input.value = input.value.replace(/^-+/, "");
  }
}

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
