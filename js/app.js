 // Находим canvas в документе
 var canvas = document.getElementById('game');
 // Указываем каким образом рисуем в canvas
 var context = canvas.getContext('2d');
 // Размер одной клетки - 16 пикселей
 var grid = 16;
 // Скорость змейки
 var count = 0
 // Модель змейки
 var snake = {
   // Старт змейки
   x: 160
   , y: 160
   , // Со старта змейка двигается вниз
   dx: 0
   , dy: grid
   , // Хвост
   cells: []
   , // Длина змейки
   maxCells: 2
 };
 // Кубик, который должна собирать змейка
 var cube = {
   // Начальные координаты кубика
   x: 320
   , y: 320
 };
 function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  function weblab() {
    // Делает игру в 15 кадров
    requestAnimationFrame(weblab);
    // Код выполнится один раз для замедления кадров
    if (++count < 15) {
      return;
    }
    // Обнуляем скорость
    count = 0;
    // Очищаем поле
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Двигаем змейку
    snake.x += snake.dx;
    snake.y += snake.dy;
    // Край поля по горизонтали ---> продолжаем с противоположной строны
    if (snake.x < 0) {
      snake.x = canvas.width - grid;
    }
    else if (snake.x >= canvas.width) {
      snake.x = 0;
    }
    // Край поля по вертикали ---> продолжаем с противоположной строны
    if (snake.y < 0) {
      snake.y = canvas.height - grid;
    }
    else if (snake.y >= canvas.height) {
      snake.y = 0;
    }
    // Добавляем координаты головы в начало массива
    snake.cells.unshift({
      x: snake.x
      , y: snake.y
    });
    // Удаляем последний элемент из массива змейки, она двигается и освобождает клетки после себя
    if (snake.cells.length > snake.maxCells) {
      snake.cells.pop();
    }
    // Наш кубик
    context.fillStyle = 'black';
    context.fillRect(cube.x, cube.y, grid - 1, grid - 1);
    // Одно движение змейки — один новый квадрат
    context.fillStyle = 'black';
    // Обрабатываем каждый элемент змейки
    snake.cells.forEach(function (cell, index) {
      // Cоздаем эффект клеточек
      context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
      // Когда змейка съела кубик
      if (cell.x === cube.x && cell.y === cube.y) {
        // Увеличиваем длину змейки
        snake.maxCells++;
        // Рисуем новый кубик
        // Игровое поле разбито на ячейки — 25 в каждую сторону
        cube.x = getRandomInt(0, 25) * grid;
        cube.y = getRandomInt(0, 25) * grid;
      }
      // Проверка было столкновение или нет
      // Для этого перебираем весь массив и проверяем, есть ли в нем две клетки с одинаковыми координатами
      for (var i = index + 1; i < snake.cells.length; i++) {
        // Если есть - игра начинается заново
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
          // Стартовые параметры основным переменным
          snake.x = 160;
          snake.y = 160;
          snake.cells = [];
          snake.maxCells = 2;
          snake.dx = 0;
          snake.dy = grid;
          // Ставим кубик в случайное место
          cube.x = getRandomInt(0, 25) * grid;
          cube.y = getRandomInt(0, 25) * grid;
        }
      }
    });
  }
  // Какие нажимаются клавиши и реагируем на них
  document.addEventListener('keydown', function (e) {
    // Проверка: если змейка движется, вверх, то нажатие вниз или вверх ничего не поменяет — змейка вверх
    // Стрелка влево, если нажата стрелка влево, и при этом змейка не движется по горизонтали
    if (e.which === 37 && snake.dx === 0) {
      // то придаем ей движение по горизонтали, влево, а вертикальное — останавливаем, тоже самое и для остальных кнопках
      snake.dx = -grid;
      snake.dy = 0;
    }
    // Стрелка вверх
    else if (e.which === 38 && snake.dy === 0) {
      snake.dy = -grid;
      snake.dx = 0;
    }
    // Стрелка вправо
    else if (e.which === 39 && snake.dx === 0) {
      snake.dx = grid;
      snake.dy = 0;
    }
    // Стрелка вниз
    else if (e.which === 40 && snake.dy === 0) {
      snake.dy = grid;
      snake.dx = 0;
    }
  });
  requestAnimationFrame(weblab);