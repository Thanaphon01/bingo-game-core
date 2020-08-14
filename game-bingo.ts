import express from 'express'
import cors from 'cors'



export class GameBingo {
    usedNumbers = new Array(25)
    calledNumbers = new Array()

    constructor() {
        // this.metrix()
        // this.checkVerticalBingo()
        this.callNumbers()
        // this.checkHorizontalBingo()
        // this.checkDiagonalBingo()
    }
    private async metrix() {
        for (let i = 0; i < 25; i++) { 
            if(i === 12) continue;
            this.setSquareMetrix(i)            
        } 
    }
    private async setSquareMetrix(indexSquare: any) {
        let arrMetrix = new Array(0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4,0,1,2,3,4);        
        let numberLength = 30      
        let randomNumber = arrMetrix[indexSquare] 
        while (this.usedNumbers[randomNumber] == true) {
            randomNumber = arrMetrix[indexSquare] + await this.generateUniqNumber(numberLength)[indexSquare];
        }
        this.usedNumbers[randomNumber] = true;    
        console.log(randomNumber);
    }
    private generateUniqNumber(botnum:number) {
        var arr = [];
        while(arr.length < botnum) {
            var r = ~~Math.floor(Math.random() * 30) + 1;  
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        return arr
    }
    private async callNumbers() {
        // Mock Case Bingo
        // this.calledNumbers = [
        //         3,  34, 16, 33, 9,  
        //         2,  22, 5,  10, 12, 
        //         31, 19, 'Free', 35, 20,  
        //         1,  23, 25, 7,  13, 
        //         29, 21, 17, 18, 24, 
        // ]
        this.checkBingo()
        for(let i=0;i<35;i++) {
            var rand = Math.floor(Math.random() * 35) + 1; // random number between 1 and 30
            if (this.calledNumbers.includes(rand)) {
                var rand = Math.floor(Math.random() * 35) + 1;
            } else  {
                this.calledNumbers.push(rand);
            }            
        }
        console.log("Number Of Random : ",this.calledNumbers);
        this.checkBingo()
        this.metrixDemo()
    }
    private async checkBingo() {
        this.checkVerticalBingo()
        this.checkDiagonalBingo()
        this.checkHorizontalBingo()
    }
    private async checkVerticalBingo() {
        for (let i = 0; i < 5; i++) {
            let sq1 = i
            let sq2 = i + 5
            let sq3 = i + 10
            let sq4 = i + 15
            let sq5 = i + 20
            this.checkLinesBingo(sq1,sq2,sq3,sq4,sq5)
            console.log("Vertical ", sq1, sq2, sq3, sq4, sq5);
        }
    }
    private async checkLinesBingo(sq1:number, sq2: number, sq3: any, sq4: number, sq5: number) {   
        // Mocknumber
        // sq1 = 3, sq2 = 2, sq3 = 31, sq4 = 1, sq5 = 31
         if (this.calledNumbers.includes(sq1) && 
            this.calledNumbers.includes(sq2) && 
            sq3 == 'Free' && 
            this.calledNumbers.includes(sq4) && 
            this.calledNumbers.includes(sq5)) {
            console.log("Bingo 1 ", sq1, sq2, sq3, sq4, sq5);
        }
        else if (this.calledNumbers.includes(sq1) &&
            this.calledNumbers.includes(sq2) &&
            this.calledNumbers.includes(sq3) &&
            this.calledNumbers.includes(sq4) &&
            this.calledNumbers.includes(sq5)) {
            console.log("Bingo 2 ", sq1, sq2, sq3, sq4, sq5);
        }
    }
    private async metrixDemo() {
        let  letters = new Array(5);
        for (let i = 0; i < 5; i++) { 
            letters[i] = new Array(5);
        } 
        let index =0
        for(let i = 0; i < 5; i++) {
            for(let j = 0; j<5; j++) {
                letters[i][j] = this.calledNumbers[index]
                letters[2][2] = 'FREE'
                index++;
            }
        }
        console.table(letters);
    }
    private async checkDiagonalBingo() {
        let sq1 =0,sq2 =0,sq3 = 0,sq4 = 0,sq5 = 0
        for (var i = 0; i < 2; i++) {
            switch(i) {
                case 0:
                    sq1 = 0;
                    sq2 = 6;
                    sq3 = 12;
                    sq4 = 18;
                    sq5 = 24;
                    break;
                case 1:
                    sq1 = 4;
                    sq2 = 8;
                    sq3 = 12;
                    sq4 = 16;
                    sq5 = 20;
                    break;
            }
            console.log("Diagonal ", sq1, sq2, sq3, sq4, sq5);         
        }
        this.checkLinesBingo(sq1,sq2,sq3,sq4,sq5)
    }
    private checkHorizontalBingo() {
        let j = 0;
        let sq1 =0,sq2 =0,sq3 = 0,sq4 = 0,sq5 = 0
        for (var i = 0; i < 5; i++) {
            switch(i) {
                case 0: 
                    sq1 = i;
                    sq2 = i + 1
                    sq3 = i + 2
                    sq4 = i + 3
                    sq5 = i + 4
                    break;
                case 1: 
                    sq1 = i + 4
                    sq2 = i + 5
                    sq3 = i + 6
                    sq4 = i + 7
                    sq5 = i + 8
                    break;
                case 2: 
                    sq1 = i + 8
                    sq2 = i + 9
                    sq3 = i + 10
                    sq4 = i + 11
                    sq5 = i + 12
                    break;
                case 3: 
                    sq1 = i + 12
                    sq2 = i + 13
                    sq3 = i + 14
                    sq4 = i + 15
                    sq5 = i + 16
                    break;
                case 4: 
                    sq1 = i + 16
                    sq2 = i + 17
                    sq3 = i + 18
                    sq4 = i + 19
                    sq5 = i + 20
                    break;
            }
            console.log("Horizontal ", sq1, sq2, sq3, sq4, sq5);
        }
    }
}