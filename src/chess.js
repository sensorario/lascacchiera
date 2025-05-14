import { setupGeneratePngButton } from "./utils/generatePng.js";
import fenParser from "./fen.js";
import positions from "./positions.js";

const state = {
  selectedPosition: null,
  randomPosition: null,
  results: [],
  fen: positions[1].fen,
};

const printSVGChessBoard = () => {
  const svgNamespace = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNamespace, "svg");
  svg.setAttribute("width", "640");
  svg.setAttribute("height", "640");

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const rect = document.createElementNS(svgNamespace, "rect");
      rect.setAttribute("x", col * 80);
      rect.setAttribute("y", row * 80);
      rect.setAttribute("width", "80");
      rect.setAttribute("height", "80");
      rect.setAttribute("fill", (col + row) % 2 === 0 ? "#d2b48c" : "#f5deb3");

      const position = `${String.fromCharCode(97 + col)}${8 - row}`;
      rect.setAttribute("data-position", position);

      svg.appendChild(rect);
    }
  }

  const newChessContainer = document.querySelector("#new-chess");
  if (newChessContainer) {
    newChessContainer.appendChild(svg);
  } else {
    console.error("Container #new-chess not found.");
  }
};

const placePiecesFromFEN = (fen) => {
  const pieces = fenParser().board(fen);
  pieces.forEach((piece) => {
    const square = document.querySelector(
      `[data-position='${piece.position}']`,
    );
    if (square) {
      const svgNamespace = "http://www.w3.org/2000/svg";
      const text = document.createElementNS(svgNamespace, "text");
      const x = parseInt(square.getAttribute("x")) + 40;
      const y = parseInt(square.getAttribute("y")) + 40;

      text.setAttribute("x", x);
      text.setAttribute("y", y);
      text.setAttribute("dominant-baseline", "middle");
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("font-size", "64");
      const isUppercase = piece.piece === piece.piece.toUpperCase();
      text.setAttribute("fill", isUppercase ? "#ffffff" : "#000000");
      text.setAttribute("stroke", isUppercase ? "#000000" : "#ffffff");
      text.setAttribute("stroke-width", "1");
      text.textContent = piece.text;

      square.parentNode.appendChild(text);
      console.log(square);
    }
  });
};

const printPositionButtons = () => {
  const selectors = "#position-buttons";
  const positionButtons = document.querySelector(selectors);

  positions.forEach((position) => {
    const tagName = "button";
    const button = document.createElement(tagName);
    button.innerHTML = position.name;
    button.dataset.fen = position.fen;
    button.addEventListener("click", (event) => {
      renderBoard(event.target.dataset.fen);
    });
    positionButtons.appendChild(button);
  });
};

const renderBoard = (fen) => {
  removeAllPieces();
  placePiecesFromFEN(fen);
};

const renderPage = (fen) => {
  printSVGChessBoard();
  placePiecesFromFEN(fen);
  setupGeneratePngButton();
  printPositionButtons();
};

const removeAllPieces = () => {
  const texts = document.querySelectorAll("#new-chess text");
  texts.forEach((text) => text.remove());
};

document.addEventListener("DOMContentLoaded", () => renderPage(state.fen));
