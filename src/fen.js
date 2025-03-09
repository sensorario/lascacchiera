import dictionary from "@moduli/dictionary.js";

const fenParser = () => {
    const b = [];

    const board = (fenString) => {
        let colNumber = 8;
        let rowLetter = 97;

        for (let i = 0; i < fenString.length; i++) {
            const piece = fenString[i];
            if (piece === '/') {
                colNumber--;
                rowLetter = 97;
            } else {
                const content = parseInt(piece);
                if (isNaN(content)) {
                    b.push({
                        position: String.fromCharCode(rowLetter) + colNumber,
                        piece,
                        text: dictionary()[piece]
                    });
                    rowLetter++;
                } else {
                    let emptySquares = content;
                    rowLetter += emptySquares;
                }
            }
        }

        return b;
    };

    return {
        board
    };
};

export default fenParser;