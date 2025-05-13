import square from "@moduli/square.js";
import fenParser from "@moduli/fen.js";
import positions from "./positions.js";

const state = {
  selectedPosition: null,
  randomPosition: null,
  results: [],
  fen: positions[0].fen,
};

const createElement = (tag, classList, innerHTML) => {
  const element = document.createElement(tag);
  classList.forEach((cls) => {
    element.classList.add(cls);
  });
  element.innerHTML = innerHTML;
  return element;
};

const chessContainer = document.querySelector(".chess");
const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
const rows = [8, 7, 6, 5, 4, 3, 2, 1];

const generateRandomPosition = () => {
  const randomColumn = columns[Math.floor(Math.random() * columns.length)];
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

  document.querySelector(".results").innerHTML = state.results.join("");
};

const clickHandler = (event) => {
  let selectedPosition = event.target.dataset.position;
  if (!selectedPosition) {
    selectedPosition = event.target.parentNode.getAttribute("data-position");
  }
  state.selectedPosition = selectedPosition;
  document.querySelector(".selected-position").innerHTML = selectedPosition;

  check();
};

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
    console.log(state.fen);
    chessContainer.innerHTML = "";
    createChessboardSVG();

    document.querySelector("#image-button").addEventListener("click", () => {
      const svg = document.querySelector(".chess svg");
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const img = new Image();

        const svgBlob = new Blob([svgData], {
          type: "image/svg+xml;charset=utf-8",
        });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          URL.revokeObjectURL(url);

          const imgURL = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = imgURL;
          link.download = "chessboard.png";
          link.click();
        };

        img.src = url;
      }
    });
  });

  openingsContainer.appendChild(select);
};

const createChessboardSVG = () => {
  const svgNamespace = "http://www.w3.org/2000/svg";
  const chessboardSize = 8; // Assuming an 8x8 chessboard
  const squareSize = 80; // Size of each square in pixels
  const svg = document.createElementNS(svgNamespace, "svg");

  svg.setAttribute("width", squareSize * chessboardSize);
  svg.setAttribute("height", squareSize * chessboardSize);

  for (let row of rows) {
    for (let col of columns) {
      const x = columns.indexOf(col) * squareSize;
      const y = (row - 1) * squareSize;

      // Create the square
      const square = document.createElementNS(svgNamespace, "rect");
      square.setAttribute("x", x);
      square.setAttribute("y", y);
      square.setAttribute("width", squareSize);
      square.setAttribute("height", squareSize);
      square.setAttribute(
        "fill",
        (columns.indexOf(col) + row) % 2 === 0 ? "#8b4513" : "#f5deb3",
      );
      square.dataset.position = `${col}${row}`;
      square.addEventListener("click", clickHandler);

      svg.appendChild(square);

      // Add the piece if present
      const pieceFound = fenParser()
        .board(state.fen)
        .find((p) => p.position === `${col}${row}`);

      console.log(pieceFound);

      if (pieceFound) {
        const isUppercase = pieceFound.piece == pieceFound.piece.toUpperCase();

        const piece = document.createElementNS(svgNamespace, "text");
        piece.setAttribute("x", x + squareSize / 2);
        piece.setAttribute("y", y + squareSize / 2);
        piece.setAttribute("dominant-baseline", "middle");
        piece.setAttribute("text-anchor", "middle");
        piece.setAttribute("font-size", squareSize);
        piece.setAttribute("fill", isUppercase ? "black" : "white");
        piece.textContent = pieceFound.text;

        // Add a border effect by duplicating the text with a stroke
        const pieceBorder = document.createElementNS(svgNamespace, "text");
        pieceBorder.setAttribute("x", x + squareSize / 2);
        pieceBorder.setAttribute("y", y + squareSize / 2);
        pieceBorder.setAttribute("dominant-baseline", "middle");
        pieceBorder.setAttribute("text-anchor", "middle");
        pieceBorder.setAttribute("font-size", squareSize);
        piece.setAttribute("stroke", isUppercase ? "black" : "white");
        pieceBorder.setAttribute("stroke-width", "3");
        pieceBorder.setAttribute("fill", "none");
        pieceBorder.textContent = pieceFound.text;

        svg.appendChild(pieceBorder);
        svg.appendChild(piece);
      }

      // Add column letters and row numbers
      if (row === 1) {
        const letter = document.createElementNS(svgNamespace, "text");
        letter.setAttribute("x", x + squareSize / 2);
        letter.setAttribute("y", chessboardSize * squareSize + 15);
        letter.setAttribute("text-anchor", "middle");
        letter.setAttribute("font-size", 12);
        letter.textContent = col;

        svg.appendChild(letter);
      }

      if (col === "a") {
        const number = document.createElementNS(svgNamespace, "text");
        number.setAttribute("x", -15);
        number.setAttribute("y", y + squareSize / 2);
        number.setAttribute("dominant-baseline", "middle");
        number.setAttribute("text-anchor", "end");
        number.setAttribute("font-size", 12);
        number.textContent = row;

        svg.appendChild(number);
      }
    }
  }

  chessContainer.appendChild(svg);
};

createOpeningsDropdown();
createChessboardSVG();
