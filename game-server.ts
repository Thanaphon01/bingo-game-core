import express from 'express'
import cors from 'cors'



export class GameServer {
    
    calledNumbers = new Array();

    constructor() {
        this.main()
    }
    
    private metrix() {
        let  letters = new Array(5);
        // new array to each location
        for (let i = 0; i < 5; i++) { 
            letters[i] = new Array(5);
        } 
        return letters
    }

    private shuffle(array: any) {
        var tmp, current, top = array.length;
        if(top) while(--top) {
          current = Math.floor(Math.random() * (top + 1));          
          tmp = array[current];
          array[current] = array[top];
          array[top] = tmp;
        }
        return array;
    }

    uniqNumber(botnum:number) {
        var arr = [];
        while(arr.length < botnum) {
            var r = ~~Math.floor(Math.random() * 30) + 1;  
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        return arr
    }

    private main() {
        let metrixArr = this.metrix()
        let numberLength = 30      
        let randomNumbers = this.uniqNumber(numberLength)   
        let index = 0

        for(let i = 0; i < 5; i++) {
            for(let j = 0; j<5; j++) {
                metrixArr[i][j] = randomNumbers[index]
                metrixArr[2][2] = 'FREE'
                index++;
            }
        }
        console.table(metrixArr);
        let resultCallnum = this.callNumber()
        this.checkVerticalBingo()
    }
    
    private callNumber() {
        var rand = Math.floor(Math.random() * 30) + 1; // random number between 1 and 30
        console.log("random number ",rand);
        return rand
    }

    checkVerticalBingo() {
        let metrixArr = this.metrix()
        // let index = 0
        // for(let i = 0; i < 5; i++) {
        //     for(let j = 0; j<5; j++) {
        //         console.log(metrixArr[i][j]);
        //         metrixArr[2][2] = 'FREE'
        //         index++;
        //     }
        // }        
    }
    
}