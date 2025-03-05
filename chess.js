const state = {
    selectedPosition: null,
    randomPosition: null,
    results: [],
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
      state.results.join(" - ");
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
        const square = document.createElement("div");

        const initialPositions = [
          { position: "a2", piece: "♙" },
          { position: "b2", piece: "♙" },
          { position: "c2", piece: "♙" },
          { position: "d2", piece: "♙" },
          { position: "e2", piece: "♙" },
          { position: "f2", piece: "♙" },
          { position: "g2", piece: "♙" },
          { position: "h2", piece: "♙" }, // White pawns
          { position: "a7", piece: "♟" },
          { position: "b7", piece: "♟" },
          { position: "c7", piece: "♟" },
          { position: "d7", piece: "♟" },
          { position: "e7", piece: "♟" },
          { position: "f7", piece: "♟" },
          { position: "g7", piece: "♟" },
          { position: "h7", piece: "♟" }, // Black pawns
          { position: "a1", piece: "♖" },
          { position: "h1", piece: "♖" }, // White rooks
          { position: "a8", piece: "♜" },
          { position: "h8", piece: "♜" }, // Black rooks
          { position: "b1", piece: "♘" },
          { position: "g1", piece: "♘" }, // White knights
          { position: "b8", piece: "♞" },
          { position: "g8", piece: "♞" }, // Black knights
          { position: "c1", piece: "♗" },
          { position: "f1", piece: "♗" }, // White bishops
          { position: "c8", piece: "♝" },
          { position: "f8", piece: "♝" }, // Black bishops
          { position: "d1", piece: "♕" },
          { position: "e1", piece: "♔" }, // White queen and king
          { position: "d8", piece: "♛" },
          { position: "e8", piece: "♚" }, // Black queen and king
        ];

        const piece = document.createElement("span");
        piece.classList.add("piece");

        const initialPosition = initialPositions.find(
          (p) => p.position === `${col}${row}`
        );
        if (initialPosition) {
          piece.innerHTML = initialPosition.piece;
        }

        
        square.appendChild(piece);

        if (row === 1 ) {
          const letter = document.createElement("span");
          letter.classList.add("letter");
          letter.innerHTML = col;
          square.appendChild(letter);
        }

        if (col === "a") {
          const number = document.createElement("span");
          number.classList.add("number");
          number.innerHTML = row;
          square.appendChild(number);
        }
        

        square.classList.add("square");
        square.classList.add(
          (columns.indexOf(col) + row) % 2 === 0 ? "white" : "black",
        );
        square.dataset.position = `${col}${row}`;
        square.addEventListener("click", clickHandler);

        chessContainer.appendChild(square);
      }
    }
  };

  createChessboard();