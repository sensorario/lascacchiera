import fenParser from "./fen.js";
import positions from "./positions.js";

const state = {
  selectedPosition: null,
  randomPosition: null,
  results: [],
  fen: positions[0].fen,
};

const funzione = () => {
  const svgNamespace = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNamespace, "svg");
  svg.setAttribute("width", "320");
  svg.setAttribute("height", "320");

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const rect = document.createElementNS(svgNamespace, "rect");
      rect.setAttribute("x", col * 40);
      rect.setAttribute("y", row * 40);
      rect.setAttribute("width", "40");
      rect.setAttribute("height", "40");
      rect.setAttribute("fill", (col + row) % 2 === 0 ? "black" : "white");

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

funzione();
