"use strict";

var input = document.getElementById('input'),// Кнопка ввода / вывода
  number = document.querySelectorAll('.numbers div'),// цифровые кнопки
  operator = document.querySelectorAll('.operators div'),// Кнопки оператора
  result = document.getElementById('result'), // Равно кнопку
  clear = document.getElementById('clear'),// Ясно, кнопка
  resultDisplayed = false;// Флаг, чтобы следить за тем, что отображается выходной
калькулятор
// Добавление обработчиков Кликните цифровых кнопок
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function(e) {

    // Сохранение текущей строки ввода и последнего символа в переменных - используется позже
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // Если не отображается результат, просто продолжайте добавлять
    if (resultDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      // Если результат отображается в данный момент, и пользователь нажал оператор
       // Мы должны держать на добавление к строке для следующей операции
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      // Если результат отображается в данный момент, и пользователь нажал номер 
	   // нам нужно очистить строку ввода и добавить новый вход, чтобы начать новую операцию
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }

  });
}

// Добавление обработчиков Кликните цифровых кнопок
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function(e) {

    // Сохранение текущей строки ввода и последнего символа в переменных - используется позже
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // Если последний символ, введенный оператор, замените его на данный момент нажата одна
    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
      var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0) {
      // Если первая нажатая клавиша является оператором, ничего не делают
      console.log("enter a number first");
    } else {
      // Иначе просто добавить оператор прижата к входу
      input.innerHTML += e.target.innerHTML;
    }

  });
}

// По нажатию кнопки "равно" из
result.addEventListener("click", function() {

  // Это строка, которую мы будем обрабатывать, например. -10+26+33-56*34/23
  var inputString = input.innerHTML;

  // Формирование массива чисел. например, для выше строки будет: цифры = ["10", "26", "33", "56", "34", "23"]
  var numbers = inputString.split(/\+|\-|\×|\÷/g);

  // Формирование массива операторов. для выше строки будет: операторы = ["+", "+", "-", "*", "/"]
  // Сначала мы заменим все числа и точка с пустой строкой, а затем разделить
  var operators = inputString.replace(/[0-9]|\./g, "").split("");

  console.log(inputString);
  console.log(operators);
  console.log(numbers);
  console.log("----------------------------");

  // Теперь мы зацикливание через массив и делать одну операцию в это время.
   // Сначала разделить, а затем умножить, а затем вычитание, а затем сложение
   // Как мы движемся мы чередующихс исходные числа и операторы массива
   // Последний элемент, оставшийся в массиве будет выходной

  var divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  var multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {
   // Использование parseFloat необходимо, в противном случае это приведет к конкатенации :)
    numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0]; // Отображение вывода

  resultDisplayed = true; // Флаг поворота, если отображается результат
});


// Очистка входа на прессе ясно
clear.addEventListener("click", function() {
  input.innerHTML = "";
})