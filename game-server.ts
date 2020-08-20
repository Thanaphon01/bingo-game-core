import express from 'express'
import cors from 'cors'



export class GameServer {

  calledNumbers = new Array();
  metrixResult = new Array()
  rows = 5
  playerNums = 2
  constructor() {
    this.main()
    // this.bingoMock()
  }

  private metrix() {
    let letters = new Array(5);
    // new array to each location
    for (let i = 0; i < 5; i++) {
      letters[i] = new Array(5);
    }
    return letters
  }

  private shuffle(array: any) {
    var tmp, current, top = array.length;
    if (top) while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
    return array;
  }

  bingoSheetPlayer() {
    let bingoSheet: number[][] = [[], [], [], [], []]
    let rowB: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    let rowI: number[] = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    let rowN: number[] = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
    let rowG: number[] = [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48]
    let rowO: number[] = [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60]
    for (let m = 0; m < bingoSheet.length; m++) {
      bingoSheet[m] = [...bingoSheet[m], rowB.splice(~~(Math.random() * (rowB.length)), 1)[0]]      
      bingoSheet[m] = [...bingoSheet[m], rowI.splice(~~(Math.random() * (rowI.length)), 1)[0]]
      bingoSheet[m] = [...bingoSheet[m], m === 2 ? 0 : rowN.splice(~~(Math.random() * (rowN.length)), 1)[0]]
      bingoSheet[m] = [...bingoSheet[m], rowG.splice(~~(Math.random() * (rowG.length)), 1)[0]]
      bingoSheet[m] = [...bingoSheet[m], rowO.splice(~~(Math.random() * (rowO.length)), 1)[0]]
    }
    return bingoSheet
  }
  
  private async startCountdown(seconds: number) {
    let counter = seconds;
    const interval = setInterval(() => {
      console.log(counter);
      if (counter == 1 ) {
        clearInterval(interval);
        console.log('Start Game Bingo ...!');     
      }
      counter--;
    }, 1000);
  }

  private playerSheet() {
    let seconds = 5
    let count = 0
    // const countdown =  await this.startCountdown(seconds)
    let player = []
    let winner = false
    for(let m = 0; m < this.playerNums; m++) {
       let bingoSheet = this.bingoSheetPlayer()
       player.push({
         "player": m,
         "bingoSheet": bingoSheet,
         "result": 0
       }) 
    }
    return player
  }
  playGames(randomNumbers:number[]) {

  }
  private async main() {
    let randomNumber = []
    let playerSheet = this.playerSheet()
    let randomAllNumbers = this.randomUniqNumbers(60)
    randomAllNumbers.unshift(0)
    let round = 0
    let hasWinner = false
    
    // let id = setInterval(() => {
    //   // let bingoCount = this.getBingoCount(playerSheet[0].bingoSheet,random)
    //   round++
    // }, 2000);
    
    while (!hasWinner) {
      // Delay random secound
      await new Promise(resolve => setTimeout(resolve, 2000));
      let winnerCount = 0
      randomNumber.push(randomAllNumbers[round])
      console.log("Number of random : ", randomNumber);
      for(let m = 0; m < this.playerNums; m++) {
        console.log("Player : ",playerSheet[m].bingoSheet);
        let {bingoCount, markedNumbers} = this.getBingoCount(playerSheet[m].bingoSheet, randomNumber)
        playerSheet[m].result = bingoCount
        if(bingoCount > 0) {
          winnerCount++;
          console.log(playerSheet[m]);
        }
        console.log("Winner player : ", m);
        console.log("bingocount and mark :",bingoCount,markedNumbers);
      }
      if(winnerCount > 0) {
        hasWinner = true       
      } else {
        round++;
      }
    }
    // console.log(playerSheet);
    
    

    // let found_index = arr.includes('false')
    // console.log(found_index);
    // let arr = [
    //   [ 4, 17, 34, 44, 57 ],
    //   [ 10, 20, 35, 48, 59 ],
    //   [ 11, 23, 0, 38, 55 ],
    //   [ 3, 15, 33, 42, 53 ],
    //   [ 5, 16, 36, 47, 52 ]
    // ] 
    // let bingoCount = this.getBingoCount(arr,[0,4,17,34,44,57,20,48,15,42])
  }

  randomUniqNumbers(number:number) {
    let arr =  Array.from(Array(number), (_, i) => i + 1)
    arr = this.shuffleNumbers(arr)
    return arr
  }

  shuffleNumbers(array:number[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
  callNumber() {

  }

  checkBingo() {
    // this.checkVerticalBingo()
    // this.checkHerizontalBingo()
    // this.checkDiagonalBingo()
  }
  
  getBingoCount(table:any,numbers:any) {
    let bingoCount = 0
    let bingoWins = false
    let markedNumbers = []
    // Case Horizontal
    for(let m = 0; m < this.rows; m++) { 
      let markCount = 0
      for(let n = 0; n < this.rows; n++) {
        let isMark = numbers.includes(table[m][n])
        if(isMark) {
          markedNumbers.push(table[m][n])
          markCount++;
        }
      }
      if(markCount === this.rows) {
        bingoCount++;
        bingoWins = true
      }
    }
    // Case Vertical
    for(let m = 0; m < this.rows; m++) { 
      let markCount = 0
      for(let n = 0; n < this.rows; n++) {
        let isMark = numbers.includes(table[n][m])
        if(isMark) {
          markedNumbers.push(table[n][m])
          markCount++;
        }
      }
      if(markCount === this.rows) {
        bingoCount++;
        bingoWins = true
      }
    }
    // Case Diagonal left -> right
    let markCount = 0
    for(let m = 0; m < this.rows; m++) { 
      let isMark = numbers.includes(table[m][m])
      if(isMark) {
          markedNumbers.push(table[m][m])
          markCount++;
        }
      if(markCount === this.rows) {
        bingoCount++;
        bingoWins = true
      }
    }
     // Case Diagonal right -> left
    markCount = 0
    for(let m = this.rows-1; m >= 0; m--) { 
       let isMark = numbers.includes(table[this.rows - 1 - m][m])
       if(isMark) {
           markedNumbers.push(table[this.rows - 1 - m][m])
           markCount++;
       }
       if(markCount === this.rows) {
        bingoCount++;
        bingoWins = true
       }
     }
    // Case Corners 
    for(let m = 0; m < this.rows - 3; m++) { 
    let markCount = 0
      if(numbers.includes(table[m][m])) {
        markedNumbers.push(table[m][m])
        markCount++;
      }
      if(numbers.includes(table[m][this.rows - 1 - m])) {
        markedNumbers.push(table[m][this.rows - 1 - m])
        markCount++;
      }
      if(numbers.includes(table[this.rows - 1 - m][m])) {
        markedNumbers.push(table[this.rows - 1 - m][m])
        markCount++;
      }
      if(numbers.includes(table[this.rows - 1 - m][this.rows - 1 - m])) {
        markedNumbers.push(table[this.rows - 1 - m][this.rows - 1 - m])
        markCount++;
      }
      if(markCount === 4) {
        bingoCount++;
        bingoWins = true
      }
    }
    markedNumbers = markedNumbers.filter((value,index,self) => self.indexOf(value) === index)
    return  {bingoCount,markedNumbers};
  }
  // bingoCount(table:any,numbers:any) {
  //   // Case Horizontal
  //   for(let m = 0; m < this.rows; m++) { 
  //     let markCount = 0
  //     for(let n = 0; n < this.rows; n++) {
  //       let isMark = numbers.includes(table[m][n])
  //       if(isMark) {
  //         markCount++;
  //       }
  //     }
  //     if(markCount === this.rows) {
  //       return true
  //     }
  //   }
  //   // Case Vertical
  //   for(let m = 0; m < this.rows; m++) { 
  //     let markCount = 0
  //     for(let n = 0; n < this.rows; n++) {
  //       let isMark = numbers.includes(table[n][m])
  //       if(isMark) {
  //         markCount++;
  //       }
  //     }
  //     if(markCount === this.rows) {
  //       return true
  //     }
  //   }
  //   // Case Diagonal left -> right
  //   let markCount = 0
  //   for(let m = 0; m < this.rows; m++) { 
  //     let isMark = numbers.includes(table[m][m])
  //     if(isMark) {
  //         markCount++;
  //       }
  //     if(markCount === this.rows) {
  //       return true
  //     }
  //   }
  //    // Case Diagonal right -> left
  //   markCount = 0
  //   for(let m = this.rows-1; m >= 0; m--) { 
  //      let isMark = numbers.includes(table[this.rows - 1 - m][m])
  //      if(isMark) {
  //          markCount++;
  //        }
  //      if(markCount === this.rows) {
  //        return true
  //      }
  //    }
  //   // Case Corners 
  //   for(let m = 0; m < this.rows - 3; m++) { 
  //   let markCount = 0
  //     if(numbers.includes(table[m][m])) {
  //       markCount++;
  //     }
  //     if(numbers.includes(table[m][this.rows - 1 - m])) {
  //       markCount++;
  //     }
  //     if(numbers.includes(table[this.rows - 1 - m][m])) {
  //       markCount++;
  //     }
  //     if(numbers.includes(table[this.rows - 1 - m][this.rows - 1 - m])) {
  //       markCount++;
  //     }
  //     if(markCount === 4) {
  //       return true
  //     }
  //   }
  //   return false
  // }
}