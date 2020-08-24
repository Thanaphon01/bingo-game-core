import express from 'express'
import cors from 'cors'



export class GameServer {
  calledNumbers = new Array()
  metrixResult = new Array()
  rows = 5
  players = new Array()
  playersNums = 2  // Count Player in room
  countDown = 2
  delay = 2000

  constructor() {
    // this.main()
    this.playGames()
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

  bingoSheetplayers() {
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
  
  private async generateSession() {
    let number = Math.random() // 0.9394456857981651
    number.toString(36); // '0.xtis06h6'
    let id = number.toString(36).substr(2, 9); // 'xtis06h6'
    return id
  }
  private async playersSheet() {
    let seconds = 5
    let count = 0
    // const countdown =  await this.startCountdown(seconds)
    let winner = false
    let prefix = 100

    for(let m = 0; m < this.playersNums; m++) {
       let ranBalance = Math.floor(Math.random() * 1000) + 600
       let date: Date = new Date();  
       let bingoSheet = this.bingoSheetplayers()
       let sessionId = await this.generateSession()
       let luckynumber = Math.floor(Math.random() * 60) + 1

       this.players.push({
         "players": sessionId,
         "bingosheet": bingoSheet,
         "luckynumber": luckynumber,
         "winCountlines": 0,
         "wallet": {
            "balance": ranBalance,
            "buyIn": prefix,
            "lastUpdate": date
        },
        "markWinHorizontal": [],
        "markWinVertical": [],
        "markWinDiagonalLR": [],
        "markWinDiagonalRL": [],
        "markWinCorrner": []
      }) 
      console.log("Start bingo sheet: ",this.players[m].players,this.players[m].wallet);
    }
    return this.players
  }
  private async playGames() {
    console.log("Starting Bingo ... ");
    let intervalId = await setInterval(() => {
        this.countDown = this.countDown - 1;
        console.log(this.countDown)
        if(this.countDown === 1) {
          this.main()
          clearInterval(intervalId)
        } 
      }, 1000)
  }
  private async main() {
    this.playersSheet()
    let randomNumber = []
    let randomAllNumbers =  this.randomUniqNumbers(60)
    randomAllNumbers.unshift(0)
    let round = 0
    let hasWinner = false
    
    while (!hasWinner) {
      // Delay random secound
      await new Promise(resolve => setTimeout(resolve, this.delay));
      let winnerCount = 0
      randomNumber.push(randomAllNumbers[round])
      console.log("Number of random : ", randomNumber);
      for(let m = 0; m < this.playersNums; m++) {
        console.log("players : ",this.players[m].bingosheet);
        let {bingoCount, markedNumbers,markWinHorizontal, markWinVertical, markWinDiagonalLR, markWinDiagonalRL, markWinCorrner, winlines} = this.getBingoCount(this.players[m].bingosheet,randomNumber)        
        this.players[m].winCountlines = bingoCount
        this.players[m].winlines = winlines
        this.players[m].markWinHorizontal = markWinHorizontal
        this.players[m].markWinVertical = markWinVertical
        this.players[m].markWinDiagonalLR = markWinDiagonalLR
        this.players[m].markWinDiagonalRL = markWinDiagonalRL
        this.players[m].markWinCorrner = markWinCorrner

        if(bingoCount > 0) {
          winnerCount++;
          console.log("Winner players :",this.players[m]);
        }
        console.log("players ID: ", this.players[m].players);
        console.log("bingocount and mark :",bingoCount,markedNumbers);                
      }
      if(winnerCount > 0) {
        hasWinner = true       
      } else {
        round++;
      }
    }
    this.calculatorState()
  }
  async calculatorLucky() {
    for(let m = 0; m < this.playersNums; m++) {
        for(let j = 0 ; j< (Object.values(this.players[m].winlines).length); j++ ) {
          console.log(Object.values(this.players[m][this.players[m].winlines[j]]));
          if(Object.values(this.players[m][this.players[m].winlines[j]]).includes(this.players[m].luckynumber)) {
            // console.log(">>>>>>",Object.values(this.players[m][this.players[m].winlines[j]]).includes(this.players[m].luckynumber));
           return Object.values(this.players[m][this.players[m].winlines[j]]).includes(this.players[m].luckynumber)
          } 
      }
    }
  }
  async calculatorState() {
      let lucky = 2
      for (const user of this.players) {
        console.log(user); 
        if(user.winCountlines === 3) {
          let found_index = this.players.findIndex(item => item.winCountlines === 3)
          if(found_index !== -1) {
            let waitCallLucky = await this.calculatorLucky()
            let bet =  user.wallet.buyIn * 3
            if(waitCallLucky) {
              let balance = user.wallet.balance + (bet * lucky)
              this.players[found_index].wallet.balance = balance 
            } else {
              let balance = user.wallet.balance + bet
              this.players[found_index].wallet.balance = balance
            }   
          }
        }
        else if(user.winCountlines === 2) {
          let found_index = this.players.findIndex(item => item.winCountlines === 2)
          if(found_index !== -1) {
            let waitCallLucky = await this.calculatorLucky()
            let bet =  user.wallet.buyIn * 1.5
            if(waitCallLucky) {
              let balance = user.wallet.balance + (bet * lucky)
              this.players[found_index].wallet.balance = balance 
            } else {
              let balance = user.wallet.balance + bet
              this.players[found_index].wallet.balance = balance
            }
          }
        }
        else if(user.winCountlines === 1) {
          let found_index = this.players.findIndex(item => item.winCountlines === 1)
          if(found_index !== -1) {
            let waitCallLucky = await this.calculatorLucky()
            let bet =  user.wallet.buyIn * 1
            if(waitCallLucky) {
              let balance = user.wallet.balance + (bet * lucky)
              this.players[found_index].wallet.balance = balance 
            } else {
              let balance = user.wallet.balance + bet
              this.players[found_index].wallet.balance = balance
            }
          }
        } 
        else if(user.winCountlines === 0) {
          let balance = user.wallet.balance - user.wallet.buyIn
          let found_index = this.players.findIndex(item => item.winCountlines === 0)
          if(found_index !== -1) {
              this.players[found_index].wallet.balance = balance
            }
        }      
      }
      console.log("Succes", this.players);
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

  checkBingo() {
    // this.checkVerticalBingo()
    // this.checkHerizontalBingo()
    // this.checkDiagonalBingo()
  }
  
  getBingoCount(table:any,numbers:any) {
    let bingoCount = 0
    let bingoWins = false
    let markedNumbers = []
    let markWinHorizontal = []
    let markWinVertical = []
    let markWinDiagonalLR = []
    let markWinDiagonalRL = []
    let markWinCorrner = []
    let winlines = []
    // Case Horizontal
    for(let m = 0; m < this.rows; m++) {       
      let markHorizontal = []
      let markCount = 0
      for(let n = 0; n < this.rows; n++) {     
        let isMark = numbers.includes(table[m][n])  
        if(isMark) {          
          markedNumbers.push(table[m][n])
          markHorizontal.push(table[m][n])
          markCount++;
        }
      }
      if(markCount === this.rows) {                
        bingoCount++;
        bingoWins = true
        console.log("Hori>>>>>>");
        markWinHorizontal = markHorizontal  
        winlines.push("markWinHorizontal")      
      }
    }
    // Case Vertical
    for(let m = 0; m < this.rows; m++) { 
      let markVertical = []
      let markCount = 0
      for(let n = 0; n < this.rows; n++) {
        let isMark = numbers.includes(table[n][m])
        if(isMark) {
          markedNumbers.push(table[n][m])
          markVertical.push(table[n][m])
          markCount++;
        }
      }
      if(markCount === this.rows) {
        bingoCount++;
        bingoWins = true
        markWinVertical = markVertical
        winlines.push("markWinVertical")  
        console.log("vertical>>>>>>>>>>");
      }
    }
    // Case Diagonal left -> right
    let markCount = 0
    let markDiagonalLeftRight = []
    for(let m = 0; m < this.rows; m++) { 
      let isMark = numbers.includes(table[m][m])
      if(isMark) {
          markedNumbers.push(table[m][m])
          markDiagonalLeftRight.push(table[m][m])
          markCount++;
        }
      if(markCount === this.rows) {
        bingoCount++;
        bingoWins = true
        markWinDiagonalLR = markDiagonalLeftRight
        winlines.push("markWinDiagonalLR")  
        console.log("diagonalLR>>>>>");
        
      }
    }
     // Case Diagonal right -> left
    markCount = 0
    let markDiagonalRightLeft = []
    for(let m = this.rows-1; m >= 0; m--) { 
       let isMark = numbers.includes(table[this.rows - 1 - m][m])
       if(isMark) {
           markedNumbers.push(table[this.rows - 1 - m][m])
           markDiagonalRightLeft.push(table[this.rows - 1 - m][m])
           markCount++;
       }
       if(markCount === this.rows) {
        bingoCount++;
        bingoWins = true
        markWinDiagonalRL = markDiagonalRightLeft
        winlines.push("markWinDiagonalRL")  
        console.log("diagonalRL>>>>>");
       }
     }
    // Case Corners 
    for(let m = 0; m < this.rows - 3; m++) { 
      let markCorrner = []
      let markCount = 0
      if(numbers.includes(table[m][m])) {
        markedNumbers.push(table[m][m])
        markCorrner.push(table[m][m])
        markCount++;
      }
      if(numbers.includes(table[m][this.rows - 1 - m])) {
        markedNumbers.push(table[m][this.rows - 1 - m])
        markCorrner.push(table[m][this.rows - 1 - m])
        markCount++;
      }
      if(numbers.includes(table[this.rows - 1 - m][m])) {
        markedNumbers.push(table[this.rows - 1 - m][m])
        markCorrner.push(table[this.rows - 1 - m][m])
        markCount++;
      }
      if(numbers.includes(table[this.rows - 1 - m][this.rows - 1 - m])) {
        markedNumbers.push(table[this.rows - 1 - m][this.rows - 1 - m])
        markCorrner.push(table[this.rows - 1 - m][this.rows - 1 - m])
        markCount++;
      }
      if(markCount === 4) {
        bingoCount++;
        bingoWins = true
        markWinCorrner = markCorrner
        winlines.push("markWinCorrner")
        console.log("Corner>>>>>");
      }
    }    

    markedNumbers = markedNumbers.filter((value,index,self) => self.indexOf(value) === index)        
    return  {bingoCount, markedNumbers, markWinHorizontal, markWinVertical, markWinDiagonalLR, markWinDiagonalRL, markWinCorrner, winlines};
  }
}