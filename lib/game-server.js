"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameServer = void 0;
class GameServer {
    constructor() {
        this.calledNumbers = new Array();
        this.metrixResult = new Array();
        this.main();
    }
    metrix() {
        let letters = new Array(5);
        // new array to each location
        for (let i = 0; i < 5; i++) {
            letters[i] = new Array(5);
        }
        return letters;
    }
    shuffle(array) {
        var tmp, current, top = array.length;
        if (top)
            while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
        return array;
    }
    bingoSheet() {
        let bingoSheet = [[], [], [], [], []];
        let rowB = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let rowI = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
        let rowN = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
        let rowG = [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48];
        let rowO = [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];
        for (let m = 0; m < bingoSheet.length; m++) {
            bingoSheet[m] = [...bingoSheet[m], rowB.splice(~~(Math.random() * (rowB.length)), 1)[0]];
            bingoSheet[m] = [...bingoSheet[m], rowI.splice(~~(Math.random() * (rowI.length)), 1)[0]];
            bingoSheet[m] = [...bingoSheet[m], m === 2 ? 0 : rowN.splice(~~(Math.random() * (rowN.length)), 1)[0]];
            bingoSheet[m] = [...bingoSheet[m], rowG.splice(~~(Math.random() * (rowG.length)), 1)[0]];
            bingoSheet[m] = [...bingoSheet[m], rowO.splice(~~(Math.random() * (rowO.length)), 1)[0]];
        }
        return bingoSheet;
    }
    main() {
        for (let m = 0; m < 2; m++) {
            let bingoSheet = this.bingoSheet();
        }
        // let index = 0
        // for(let m = 0; m < 5; m++) {
        //     for(let n = 0; n<5; n++) {
        //         metrixArr[m][n] = randomNumbers[index]                                
        //         metrixArr[2][2] = 'FREE'
        //         index++;
        //     }
        // }
        this.checkBingo();
    }
    callNumber() {
        var rand = Math.floor(Math.random() * 60) + 1; // random number between 1 and 30
        console.log("random number ", rand);
        return rand;
    }
    checkBingo() {
        this.checkVerticalBingo();
    }
    checkVerticalBingo() {
        let bingoSheet = this.bingoSheet();
        console.log(bingoSheet);
        console.log(bingoSheet[0][0] % );
        for (let m = 0; m < 5; m++) {
            let vq1 = bingoSheet[0];
            let vq2 = bingoSheet[1];
            let vq3 = bingoSheet[2];
            let vq4 = bingoSheet[3];
            let vq5 = bingoSheet[4];
            console.log();
        }
    }
    checkLines() {
    }
}
exports.GameServer = GameServer;
