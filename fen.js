export const fen = () => {
    const b = [];

    const t = piece => {
        const blackPawn = '♙';
        const whitePawn = '♟';
        const whiteRook = '♜';

        const pieces = {
            P: whitePawn,
            p: blackPawn,        
            R: whiteRook,    
        };

        return pieces[piece];
    };

    const board = (fenString) => {
        let colNumber = 8;
        let rowLetter = 97;
        for (let i = 0; i < fenString.length; i++) {
            const char = fenString[i];
            if (char === '/') {
                colNumber--;
                rowLetter = 97;
                continue;
            } else {
                const content = parseInt(char);
                if (isNaN(content)) {
                    b.push({
                        position: String.fromCharCode(rowLetter) + colNumber,
                        piece: char,
                        text: t(char)
                     });
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
