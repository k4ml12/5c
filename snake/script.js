let startButton = document.getElementById("start-button");
let hackActive = document.getElementById("hack-active");
let loadingBar = document.getElementById("loading-bar");
let loadingStage = document.getElementById("loading");
let board = document.getElementById("snake-area");
let winStage = document.getElementById("hack-win");
let looseStage = document.getElementById("hack-loose");

startHack();

function startHack() {
  hackActive.classList.add("inactive");
  winStage.classList.add("inactive");
  looseStage.classList.add("inactive");
  loadingStage.classList.add("inactive");
  startButton.classList.remove("inactive");

  startButton.addEventListener("click", loadingFunction);

  function loadingFunction() {
    let i = 0;
    loadingStage.classList.remove("inactive");
    startButton.classList.add("inactive");

    if (i == 0) {
      i = 1;

      var width = 100;
      var id = setInterval(frame, 20);
      function frame() {
        if (width === 0) {
          clearInterval(id);
          i = 0;
          snakeGameActive();
          loadingStage.classList.add("inactive");
        } else {
          width--;
          loadingBar.style.width = width + "%";
        }
      }
    }
  }

  function snakeGameActive() {
    hackActive.classList.remove("inactive");

    const snakeElements = [];
    let food;
    let snakeDirection = translateNumberToDirection(getRandomInt(0, 4));
    let gameOver = false;

    createBoard();
    respSnake();
    function respSnake() {
      let xPosition = getRandomInt(9, 11);
      let yPosition = getRandomInt(9, 11);

      console.log(xPosition, yPosition);
      console.log(snakeDirection);

      for (let i = 0; i < 3; i++) {
        if (snakeDirection === "up") yPosition--;
        if (snakeDirection === "down") yPosition++;
        if (snakeDirection === "right") xPosition++;
        if (snakeDirection === "left") xPosition--;

        const snakeElement = getBoardElement(xPosition, yPosition);
        snakeElements.unshift(snakeElement);
        snakeElement.classList.add("snake");
      }

      setTimeout(() => {
        moveSnake();
      }, 500);

      controlSnake();
      createFood();
    }

    function createFood() {
      let xPosition;
      let yPosition;

      do {
        xPosition = getRandomInt(1, 16);
        yPosition = getRandomInt(1, 16);
      } while (
        snakeElements.some(
          ({ dataset }) => dataset.x == xPosition && dataset.y == yPosition
        )
      );
      food = getBoardElement(xPosition, yPosition);

      food.classList.add("food");
    }

    function moveSnake() {
      let gameInterval = setInterval(function () {
        let nextY = snakeElements[0]["dataset"]["y"];
        let nextX = snakeElements[0]["dataset"]["x"];

        if (snakeDirection === "up") nextY--;
        if (snakeDirection === "down") nextY++;
        if (snakeDirection === "right") nextX++;
        if (snakeDirection === "left") nextX--;

        if (isGameOver(nextX, nextY)) {
          clearInterval(gameInterval);
          console.log("przegrales sobad");
          resultFunction(0);
        } else if (snakeElements.length === 13) {
          clearInterval(gameInterval);
          console.log("wygrales pogchamp");
          resultFunction(1);
        } else {
          let nextSnakeElement = getBoardElement(nextX, nextY);
          snakeElements.unshift(nextSnakeElement);
          nextSnakeElement.classList.add("snake");

          if (nextSnakeElement !== food) {
            snakeElements.pop().classList.remove("snake");
          } else {
            food.classList.remove("food");
            createFood();
          }
        }
      }, 75);
    }

    function getBoardElement(x, y) {
      return document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    }

    function controlSnake() {
      window.addEventListener("keydown", function (e) {
        if (e.keyCode === 37 && snakeDirection !== "right") {
          snakeDirection = "left";
        }
        if (e.keyCode === 38 && snakeDirection !== "down") {
          snakeDirection = "up";
        }
        if (e.keyCode === 39 && snakeDirection !== "left") {
          snakeDirection = "right";
        }
        if (e.keyCode === 40 && snakeDirection !== "up") {
          snakeDirection = "down";
        }
      });
    }

    function isGameOver(x, y) {
      if (
        x < 1 ||
        x > 16 ||
        y < 1 ||
        y > 16 ||
        snakeElements.some(({ dataset }) => dataset.x == x && dataset.y == y)
      )
        return true;
      else false;
    }

    function createBoard() {
      board.className = "board";

      console.log(board);

      for (let j = 1; j <= 16; j++) {
        for (let i = 1; i <= 16; i++) {
          const div = document.createElement("div");
          div.className = "board-element";
          div.dataset.y = j;
          div.dataset.x = i;

          board.appendChild(div);
        }
      }
    }

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function translateNumberToDirection(number) {
      if (number === 0) return "up";
      if (number === 1) return "right";
      if (number === 2) return "down";
      if (number === 3) return "left";
    }
  }

  function resultFunction(result) {
    let wresultBar = document.getElementById("wresult-bar");
    let lresultBar = document.getElementById("lresult-bar");

    if (result === 0) {
      looseStage.classList.remove("inactive");
      createBar(lresultBar);
    } else if (result === 1) {
      winStage.classList.remove("inactive");
      createBar(wresultBar);
    }
    hackActive.classList.add("inactive");
  }

  function createBar(name) {
    let j = 0;
    if (j == 0) {
      j = 1;
      var width = 100;
      var id = setInterval(frame, 20);
      function frame() {
        if (width === 0) {
          clearInterval(id);
          j = 0;
          window.setInterval(location.reload(true));
        } else {
          width--;
          name.style.width = width + "%";
        }
      }
    }
  }
}
