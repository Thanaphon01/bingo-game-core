"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameBingo = void 0;
class GameBingo {
    constructor() {
        this.usedNumbers = new Array(60);
        this.calledNumbers = new Array();
        this.metrix();
        // this.checkVerticalBingo()
        // this.callNumbers()
        // this.checkHorizontalBingo()
        // this.checkDiagonalBingo()
        // this.generateUniqNumber()
    }
    metrix() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < 25; i++) {
                if (i === 12)
                    continue;
                this.setSquareMetrix(i);
            }
        });
    }
    // set Metrix 5*5 run index 0-4
    setSquareMetrix(indexSquare) {
        return __awaiter(this, void 0, void 0, function* () {
            let arrMetrix = new Array(0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4);
            console.log(arrMetrix);
            let randomNumber = arrMetrix[indexSquare];
            while (this.usedNumbers[randomNumber] == true) {
                randomNumber = (arrMetrix[indexSquare]) * 10 + (yield this.generateUniqNumber());
                let currentSquare = randomNumber;
            }
            this.usedNumbers[randomNumber] = true;
        });
    }
    // random uniq Number
    generateUniqNumber() {
        return Math.floor((Math.random() * 10) + 1);
    }
    resetMetrixNumber() {
        for (var i = 0; i < this.usedNumbers.length; i++) {
            this.usedNumbers[i] = false;
        }
    }
    // funtion main random number Banker
    callNumbers() {
        return __awaiter(this, void 0, void 0, function* () {
            // Mock Case Bingo
            // this.calledNumbers = [
            //         3,  34, 16, 33, 9,  
            //         2,  22, 5,  10, 12, 
            //         31, 19, 'Free', 35, 20,  
            //         1,  23, 25, 7,  13, 
            //         29, 21, 17, 18, 24, 
            // ]
            for (let i = 0; i < 30; i++) {
                var rand = Math.floor(Math.random() * 60) + 1; // random number between 1 and 60
                if (this.calledNumbers.includes(rand)) {
                    var rand = Math.floor(Math.random() * 60) + 1;
                }
                else {
                    this.calledNumbers.push(rand);
                    if (rand >= 1 && rand <= 15)
                        'B' + rand;
                    else if (rand >= 16 && rand <= 30)
                        'I' + rand;
                    else if (rand >= 31 && rand <= 45)
                        'N' + rand;
                    else if (rand >= 46 && rand <= 60)
                        'G' + rand;
                    else
                        'O' + rand;
                }
                console.log("Number Of Random : ", this.calledNumbers);
            }
            this.checkBingo();
            // this.metrixDemo()
        });
    }
    // metrix check bingo line 
    checkBingo() {
        return __awaiter(this, void 0, void 0, function* () {
            // this.checkVerticalBingo()
            // this.checkDiagonalBingo()
            // this.checkHorizontalBingo()
        });
    }
    // metrix check Vertical line
    checkVerticalBingo() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < 5; i++) {
                let sq1 = i;
                let sq2 = i + 5;
                let sq3 = i + 10;
                let sq4 = i + 15;
                let sq5 = i + 20;
                this.checkLinesBingo(sq1, sq2, sq3, sq4, sq5);
                // console.log("Vertical ", sq1, sq2, sq3, sq4, sq5);
            }
        });
    }
    checkLinesBingo(sq1, sq2, sq3, sq4, sq5) {
        return __awaiter(this, void 0, void 0, function* () {
            // Mocknumber        
            // check bingo line free 
            sq1 = 0, sq2 = 5, sq3 = 10, sq4 = 15, sq5 = 20;
            let rs1 = 3, rs2 = 2, rs3 = 31, rs4 = 1, rs5 = 29;
            if (this.calledNumbers.includes(sq1) &&
                this.calledNumbers.includes(sq2) &&
                sq3 == 12 &&
                this.calledNumbers.includes(sq4) &&
                this.calledNumbers.includes(sq5)) {
                console.log("Bingo You win 1", sq1, sq2, sq3, sq4, sq5);
            }
            // check bingo line normal
            else if ((this.calledNumbers.includes(rs1) && sq1 == 0) &&
                (this.calledNumbers.includes(rs2) && sq2 == 5) &&
                (this.calledNumbers.includes(rs3) && sq3 == 10) &&
                (this.calledNumbers.includes(rs4) && sq4 == 15) &&
                (this.calledNumbers.includes(rs5) && sq5 == 20)) {
                console.log("Bingo You win 2", sq1, sq2, sq3, sq4, sq5);
                console.log(this.calledNumbers[sq1], this.calledNumbers[sq2], this.calledNumbers[sq3], this.calledNumbers[sq4], this.calledNumbers[sq5]);
            }
        });
    }
    // metrix show demo table from funtion callNumber
    metrixDemo() {
        return __awaiter(this, void 0, void 0, function* () {
            let letters = new Array(5);
            for (let i = 0; i < 5; i++) {
                letters[i] = new Array(5);
            }
            let index = 0;
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    letters[i][j] = this.calledNumbers[index];
                    letters[2][2] = 'FREE';
                    index++;
                }
            }
            console.table(letters);
        });
    }
    // metrix check Diagonal bingo line
    checkDiagonalBingo() {
        return __awaiter(this, void 0, void 0, function* () {
            let sq1 = 0, sq2 = 0, sq3 = "", sq4 = 0, sq5 = 0;
            for (var i = 0; i < 2; i++) {
                switch (i) {
                    case 0:
                        sq1 = 0;
                        sq2 = 6;
                        sq3 = "Free";
                        sq4 = 18;
                        sq5 = 24;
                        break;
                    case 1:
                        sq1 = 4;
                        sq2 = 8;
                        sq3 = "Free";
                        sq4 = 16;
                        sq5 = 20;
                        break;
                }
                console.log("Diagonal ", sq1, sq2, sq3, sq4, sq5);
            }
            this.checkLinesBingo(sq1, sq2, sq3, sq4, sq5);
        });
    }
    // metrix check Horizontal line
    checkHorizontalBingo() {
        let j = 0;
        let sq1 = 0, sq2 = 0, sq3 = 0, sq4 = 0, sq5 = 0;
        for (var i = 0; i < 5; i++) {
            switch (i) {
                case 0:
                    sq1 = i;
                    sq2 = i + 1;
                    sq3 = i + 2;
                    sq4 = i + 3;
                    sq5 = i + 4;
                    break;
                case 1:
                    sq1 = i + 4;
                    sq2 = i + 5;
                    sq3 = i + 6;
                    sq4 = i + 7;
                    sq5 = i + 8;
                    break;
                case 2:
                    sq1 = i + 8;
                    sq2 = i + 9;
                    sq3 = i + 10;
                    sq4 = i + 11;
                    sq5 = i + 12;
                    break;
                case 3:
                    sq1 = i + 12;
                    sq2 = i + 13;
                    sq3 = i + 14;
                    sq4 = i + 15;
                    sq5 = i + 16;
                    break;
                case 4:
                    sq1 = i + 16;
                    sq2 = i + 17;
                    sq3 = i + 18;
                    sq4 = i + 19;
                    sq5 = i + 20;
                    break;
            }
            console.log("Horizontal ", sq1, sq2, sq3, sq4, sq5);
        }
    }
}
exports.GameBingo = GameBingo;
