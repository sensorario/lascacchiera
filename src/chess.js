import square from "@moduli/square.js";
import fenParser from "@moduli/fen.js";
import positions from "./positions.js"

const state = {
  selectedPosition: null,
  randomPosition: null,
  results: [],
  fen: positions[0].fen,
};

const chessContainer = document.querySelector(".chess");
const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
const rows = [8, 7, 6, 5, 4, 3, 2, 1];

const generateRandomPosition = () => {
  const randomColumn =
    columns[Math.floor(Math.random() * columns.length)];
  const randomRow = rows[Math.floor(Math.random() * rows.length)];
  const randomPosition = `${randomColumn}${randomRow}`;
  state.randomPosition = randomPosition;
  document.querySelector(".random-position").innerHTML = randomPosition;
};

generateRandomPosition();

const check = () => {
  if (state.selectedPosition == state.randomPosition) {
    state.results.push("😊");
    generateRandomPosition();
  } else {
    state.results.push("😢");
  }

  document.querySelector(".results").innerHTML =
    state.results.join("");
};

const clickHandler = (event) => {
  let selectedPosition = event.target.dataset.position;
  if (!selectedPosition) {
    selectedPosition =
      event.target.parentNode.getAttribute("data-position");
  }
  state.selectedPosition = selectedPosition;
  document.querySelector(".selected-position").innerHTML =
    selectedPosition;

  check();
};

const createChessboard = () => {
  for (let row of rows) {
    for (let col of columns) {
      const casella = square()

      const piece = document.createElement("span");
      piece.classList.add("piece");

      const initialPosition = fenParser()
        .board(state.fen)
        .find(
          (p) => p.position === `${col}${row}`
        );

      if (initialPosition) {
        piece.innerHTML = initialPosition.text;
      }


      casella.appendChild(piece);

      if (row === 1) {
        const letter = document.createElement("span");
        letter.classList.add("letter");
        letter.innerHTML = col;
        casella.appendChild(letter);
      }

      if (col === "a") {
        const number = document.createElement("span");
        number.classList.add("number");
        number.innerHTML = row;
        casella.appendChild(number);
      }


      casella.classList.add(
        (columns.indexOf(col) + row) % 2 === 0 ? "white" : "black",
      );
      casella.dataset.position = `${col}${row}`;
      casella.addEventListener("click", clickHandler);

      chessContainer.appendChild(casella);
    }
  }
};

createChessboard();

const createOpeningsDropdown = () => {
  const openingsContainer = document.querySelector(".openings");
  const select = document.createElement("select");

  positions.forEach((position, index) => {
    const option = document.createElement("option");
    option.value = position.fen;
    option.textContent = position.name;
    select.appendChild(option);
  });

  select.addEventListener("change", (event) => {
    const selectedFen = event.target.value;
    state.fen = selectedFen;
    chessContainer.innerHTML = "";
    createChessboard();
  });

  openingsContainer.appendChild(select);
};

createOpeningsDropdown();