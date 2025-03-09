import { fenParser } from "./fen";

describe("fenBuilder", () => {
    it("generate empty array whenever board is empty", () => {
        const f = fenParser();
        const board = f.board('8/8/8/8/8/8/8/8');
        expect(board).toStrictEqual([]);
    });
            
    it("generate array with pieces placed in right position", () => {
        const inputs = [];

        inputs.push({
            fenBoard: '8/8/8/8/4P3/8/8/8',
            lascacchieraBoard: [
                { position: 'e4', piece: 'P', text: '♟' }
            ]
        },{
            fenBoard: '8/8/8/8/3P4/8/8/8',
            lascacchieraBoard: [
                { position: 'd4', piece: 'P', text: '♟' }
            ]
        },{
            fenBoard: '8/8/1r6/8/3P4/8/8/8',
            lascacchieraBoard: [
                { position: 'b6', piece: 'r', text: '♖' },
                { position: 'd4', piece: 'P', text: '♟' }
            ]
        },{
            fenBoard: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
            lascacchieraBoard: [
                { position: 'a8', piece: 'r', text: '♖' },
                { position: 'b8', piece: 'n', text: '♘' },
                { position: 'c8', piece: 'b', text: '♗' },
                { position: 'd8', piece: 'q', text: '♕' },
                { position: 'e8', piece: 'k', text: '♔' },
                { position: 'f8', piece: 'b', text: '♗' },
                { position: 'g8', piece: 'n', text: '♘' },
                { position: 'h8', piece: 'r', text: '♖' },
                { position: 'a7', piece: 'p', text: '♙' },
                { position: 'b7', piece: 'p', text: '♙' },
                { position: 'c7', piece: 'p', text: '♙' },
                { position: 'd7', piece: 'p', text: '♙' },
                { position: 'e7', piece: 'p', text: '♙' },
                { position: 'f7', piece: 'p', text: '♙' },
                { position: 'g7', piece: 'p', text: '♙' },
                { position: 'h7', piece: 'p', text: '♙' },
                { position: 'a2', piece: 'P', text: '♟' },
                { position: 'b2', piece: 'P', text: '♟' },
                { position: 'c2', piece: 'P', text: '♟' },
                { position: 'd2', piece: 'P', text: '♟' },
                { position: 'e2', piece: 'P', text: '♟' },
                { position: 'f2', piece: 'P', text: '♟' },
                { position: 'g2', piece: 'P', text: '♟' },
                { position: 'h2', piece: 'P', text: '♟' },
                { position: 'a1', piece: 'R', text: '♜' },
                { position: 'b1', piece: 'N', text: '♞' },
                { position: 'c1', piece: 'B', text: '♝' },
                { position: 'd1', piece: 'Q', text: '♛' },
                { position: 'e1', piece: 'K', text: '♚' },
                { position: 'f1', piece: 'B', text: '♝' },
                { position: 'g1', piece: 'N', text: '♞' },
                { position: 'h1', piece: 'R', text: '♜' },
            ]
        });

        inputs.forEach(data => {
            const f = fenParser();
            const board = f.board(data.fenBoard);
            expect(board).toStrictEqual(data.lascacchieraBoard);
        });
    });

});
