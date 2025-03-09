const dictionary = () => {
    const blackPawn = '♙';
    const blackRook = '♖';
    const blackKnight = '♘';
    const blackBishop = '♗';
    const blackQueen = '♕';
    const blackKing = '♔';

    const whitePawn = '♟';
    const whiteRook = '♜';
    const whiteKnight = '♞';
    const whiteBishop = '♝';
    const whiteQueen = '♛';
    const whiteKing = '♚';

    const pieces = {
        p: blackPawn,
        r: blackRook,
        n: blackKnight,
        b: blackBishop,
        q: blackQueen,
        k: blackKing,

        P: whitePawn,
        R: whiteRook,
        N: whiteKnight,
        B: whiteBishop,
        Q: whiteQueen,
        K: whiteKing,
    };
    return pieces;
};

export default dictionary;