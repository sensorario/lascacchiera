import { fen } from "./fen";

describe("fenBuilder", () => {
    it("gnerate empty array whenever board is empty", () => {
        const f = fen();
        const board = f.board('8/8/8/8/8/8/8/8');
        expect(board).toStrictEqual([]);
    });
    
    it("gnerate array with pieces placed in right position", () => {
        const inputs = []
        inputs.push({
            fenBoard: '8/8/8/8/4p3/8/8/8',
            lascacchieraBoard: [
                { position: 'e4', piece: 'p', text: '♙' }
            ]
        },{
            fenBoard: '8/8/8/8/3p4/8/8/8',
            lascacchieraBoard: [
                { position: 'd4', piece: 'p', text: '♙' }
            ]
        },{
            fenBoard: '8/8/1R6/8/3p4/8/8/8',
            lascacchieraBoard: [
                { position: 'b6', piece: 'R', text: '♜' },
                { position: 'd4', piece: 'p', text: '♙' }
            ]
        });

        inputs.forEach(data => {
            const f = fen();
            const board = f.board(data.fenBoard);
            expect(board).toStrictEqual(data.lascacchieraBoard);
        });
    });
});
