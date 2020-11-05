import express from 'express'
import cors from 'cors'



export class GameServer {
  calledNumbers = new Array()
  metrixResult = new Array()
  rows = 5
  playersNums = 4  // Count Player in room
  countDown = 5
  delay = 2000
  players = new Array()
  deck = Array.from(Array(52).keys()).sort((a: number, b: number) => Math.random() - 0.5)
  constructor() {
    // this.main()
    // this.playGames()
    // this.bingoMock()
    this.home()
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

  private home() {
    let players
    let banker
    players = {
      type: 'PLAYER',
      score: 0,
      cards: [
        this.deck.splice(~~(Math.random() * this.deck.length), 1)[0],
        this.deck.splice(~~(Math.random() * this.deck.length), 1)[0]
      ]
    }
    banker = {
      type: 'BANKER',
      score: 0,
      cards: [
        this.deck.splice(~~(Math.random() * this.deck.length), 1)[0],
        this.deck.splice(~~(Math.random() * this.deck.length), 1)[0]
      ]
    }
    players.score =  this.isScores(players.cards)
    players.score =  this.isScores(banker.cards)
    players.score = 0
    banker.score = 8
    this.isCoreLogic(players, banker)
  }

  isCoreLogic(players: any, banker: any) {
    console.log(players, banker);
    if (players.score < 6 && (players.cards.length === 2 && banker.score <= 7)) players.cards = [...players.cards, this.deck.splice(~~(Math.random() * this.deck.length), 1)[0]]
    if (players.score >= 6 && players.score <= 7) banker.cards = [...banker.cards, this.deck.splice(~~(Math.random() * this.deck.length), 1)[0]]
    if (players.cards.length === 3 && banker.cards.length === 2) {
      if (players.cards.length === 3) players.score =  this.isScores3Cards(players.cards)
      if (banker.score === 3 && (players.score === 1 || players.score === 2 ||  players.score === 3 ||  players.score === 4 ||  players.score === 5 ||  players.score === 6 ||  players.score === 7 ||  players.score === 9 ||  players.score === 0)) {
        banker.cards = [...banker.cards, this.deck.splice(~~(Math.random() * this.deck.length), 1)[0]]
      } else if ((banker.score === 4 && (players.score === 1 || players.score === 8 || players.score === 9 || players.score === 0))) {
        banker.cards = [...banker.cards, this.deck.splice(~~(Math.random() * this.deck.length), 1)[0]]
      } else if ((banker.score === 5 && (players.score === 4 || players.score === 5 || players.score === 6 || players.score === 7))) {
        banker.cards = [...banker.cards, this.deck.splice(~~(Math.random() * this.deck.length), 1)[0]]
      } else if ((banker.score === 6 && (players.score === 6 || players.score === 7))) {
        banker.cards = [...banker.cards, this.deck.splice(~~(Math.random() * this.deck.length), 1)[0]]
      } else if (banker.score < 3) {
        banker.cards = [...banker.cards, this.deck.splice(~~(Math.random() * this.deck.length), 1)[0]]
      }
      if (banker.cards.length === 3) banker.score = this.isScores3Cards(banker.cards)
    }
    console.log(this.deck.length);
    console.log("players,banker",players, banker);
  }

  isScores(cards: number[]) {
    let score: number = ((((cards[0] % 13) + 1) > 9 ? 0 : ((cards[0] % 13) + 1)) + (((cards[1] % 13) + 1) > 9 ? 0 : ((cards[1] % 13) + 1))) % 10
    return score
  }
  isScores3Cards(cards: number[]) {
    let score: number = ((((cards[0] % 13) + 1) > 9 ? 0 : ((cards[0] % 13) + 1)) + (((cards[1] % 13) + 1) > 9 ? 0 : ((cards[1] % 13) + 1)) + (((cards[2] % 13) + 1) > 9 ? 0 : ((cards[2] % 13) + 1))) % 10
    return score
  }


  calculator(cards: number[]) {
    let card1score: number = ~~(cards[0] % 13) + 1
    let card2score: number = ~~(cards[1] % 13) + 1
    let aScore: number = card1score >= 10 ? 0 : card1score
    let bScore: number = card2score >= 10 ? 0 : card2score
    let score: number = (aScore + bScore) % 10

    let result: any = {
      cards: cards,
      multiple: 0,
      score: cards.reduce((p: any, c: any) => ((p + (((c % 13) + 1) > 9 ? 0 : ((c % 13) + 1))) % 10), 0),
    }
    return result
  }

  // private shuffleNewCards(player: Player) {
  //   if (player.cards.length) {
  //     this.deck = [...this.deck, ...player.cards]
  //   }
  //   player.cards = [
  //     this.deck.splice(~~(Math.random() * this.deck.length), 1)[0],
  //     this.deck.splice(~~(Math.random() * this.deck.length), 1)[0]
  //   ]
  // }

  // private shuffleNew3rdCard(player: Player, card3: number) {
  //   if (player.cards.length) {
  //     this.deck = [...this.deck, card3]
  //   }
  //   return this.deck.splice(~~(Math.random() * this.deck.length), 1)[0]
  // }

  calculate(cards: number[]) {
    let _player = {
      cards: cards,
      multiple: 0,
      score: cards.reduce((p: any, c: any) => ((p + (((c % 13) + 1) > 9 ? 0 : ((c % 13) + 1))) % 10), 0),
    }
    if (_player.cards.length === 2) {
      if ((~~(_player.cards[0] / 13) === ~~(_player.cards[1] / 13)) || ((_player.cards[0] % 13) === (_player.cards[1] % 13))) {
        _player.multiple = 2
      } else {
        _player.multiple = 1
      }
      if (_player.score === 9) {
        _player.score = 49
      } else if (_player.score === 8) {
        _player.score = 48
      }
    } else if (_player.cards.length > 2) {
      let $cards = ([..._player.cards]).sort((a, b) => (a - b))
      let $cardstype = _player.cards.map((v: number) => (v % 13)).sort((a: number, b: number) => (a - b))
      if (($cards[0] % 13) === ($cards[1] % 13) && ($cards[1] % 13) === ($cards[2] % 13) && ($cards[0] % 13) === ($cards[2] % 13)) {
        if ((($cards[0] % 13) + 1) === 3) {
          _player.score = 47
        } else if ((($cards[0] % 13) + 1) < 3) {
          _player.score = 35 + ($cardstype[0] % 13)
        } else if ((($cards[0] % 13) + 1) > 3) {
          _player.score = 34 + ($cardstype[0] % 13)
        }
        _player.multiple = 5
      } else if (
        (($cardstype[0] + 1 === $cardstype[1]) &&
          ($cardstype[0] + 2 === $cardstype[2]) &&
          ($cardstype[1] + 1 === $cardstype[2]))
      ) {
        if (~~($cards[0] / 13) === ~~($cards[1] / 13) && ~~($cards[0] / 13) === ~~($cards[2] / 13) && ~~($cards[1] / 13) === ~~($cards[2] / 13)) {
          _player.score = 24 + ($cardstype[0] % 13)
          _player.multiple = 5
        } else {
          _player.score = 11 + ($cardstype[0] % 13)
          _player.multiple = 3
        }
      } else if ($cardstype[0] === 0 && $cardstype[1] === 11 && $cardstype[2] === 12) {
        if (~~($cards[0] / 13) === ~~($cards[1] / 13) && ~~($cards[0] / 13) === ~~($cards[2] / 13) && ~~($cards[1] / 13) === ~~($cards[2] / 13)) {
          _player.score = 34
          _player.multiple = 5
        } else {
          _player.score = 22
          _player.multiple = 3
        }
      } else if ([11, 12, 13].includes(($cards[0] % 13) + 1) && [11, 12, 13].includes(($cards[1] % 13) + 1) && [11, 12, 13].includes(($cards[2] % 13) + 1)) {
        _player.score = 10
        _player.multiple = 3
      } else {
        if (~~($cards[0] / 13) === ~~($cards[1] / 13) && ~~($cards[0] / 13) === ~~($cards[2] / 13) && ~~($cards[1] / 13) === ~~($cards[2] / 13)) {
          _player.multiple = 3
        } else if (~~($cards[0] / 13) === ~~($cards[1] / 13) && ~~($cards[0] / 13) === ~~($cards[2] / 13) && ~~($cards[1] / 13) === ~~($cards[2] / 13)) {
          _player.multiple = 3
        } else if ((_player.cards[0] % 13) === (_player.cards[1] % 13) && (_player.cards[1] % 13) === (_player.cards[2] % 13) && (_player.cards[0] % 13) === (_player.cards[2] % 13)) {
          _player.multiple = 3
        } else {
          _player.multiple = 1
        }
      }
    }
    return _player
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

  private async generateSession() {
    let number = Math.random() // 0.9394456857981651
    number.toString(36); // '0.xtis06h6'
    let id = number.toString(36).substr(2, 9); // 'xtis06h6'
    return id
  }
  private async playersSheet() {
    let seconds = 5
    let count = 0
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
        "markedNumbers": [],
        "markWinHorizontal": [0],
        "markWinVertical": [0],
        "markWinDiagonalLR": [0],
        "markWinDiagonalRL": [0],
        "markWinCorrner": [0]
      })
      console.log("Start bingo sheet: ",this.players[m].players,this.players[m].wallet);
    }
    console.log("Player :::: ",this.players);
    return this.players
  }
  private async playGames() {
    console.log("Starting Bingo ... ");
    let aa1 = -1
    let vv = []
    let aa = Array.from(Array(60).keys()).map((v: number, i: number) => i + 1)
    console.log(aa.length);
     for(let i =1; i<= 60;i++) {
      // vv.push(~~(Math.random() * aa.length - 1))
      // aa.splice(~~(Math.random() * aa.length), 1)[0]
      // console.log(aa);
      vv.push(aa.splice(~~(Math.random() * aa.length  ), 1)[0])
     }
     console.log(vv);
    // for(let i =0; i<= 60;i++) {
    //   // aa.splice(~~(Math.random() * aa.length ), 1)[0]
    //     aa1 = aa.splice(~~(Math.random() * aa.length), 1)[0]
    //     let select  = [...aa, aa1]
    //     console.log(select);
    //     if(select.includes(0)) console.log("True");
    // }


    // let intervalId = await setInterval(() => {
    //     this.countDown = this.countDown - 1;
    //     console.log(this.countDown)
    //     if(this.countDown === 1) {
    //       this.main()
    //       clearInterval(intervalId)
    //     }
    //   }, 1000)
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
        this.players[m].markedNumbers = markedNumbers

        if(bingoCount > 0) {
          winnerCount++;
        }
      }
      if(winnerCount > 0) {
        hasWinner = true
      } else {
        round++;
      }
    }
    this.calculatorState()
  }

  // Find Players Max Winlines
  async calculatorMaxLines() {
    let findMaxWinLine = []
    for(let m = 0; m < this.playersNums; m++) {
        findMaxWinLine.push(this.players[m].winCountlines)
    }
    let waitCallLucky = await this.calculatorLucky()
    let result = Math.max.apply(Math,findMaxWinLine)
    if(waitCallLucky) {
      // console.log("findfindMaxWinLine1 ",result);
      return result * 2
    } else {
      // console.log("findfindMaxWinLine2 ",result);
      return result
    }
  }
  // Find Players If have Lucky number in sheets
  async calculatorLucky() {
    for(let m = 0; m < this.playersNums; m++) {
        for(let j = 0 ; j< (Object.values(this.players[m].winlines).length); j++ ) {
          if(Object.values(this.players[m][this.players[m].winlines[j]]).includes(this.players[m].luckynumber)) {
              return Object.values(this.players[m][this.players[m].winlines[j]]).includes(this.players[m].luckynumber)
          }
          else return false
      }
    }
  }

  // Find Sum Winlines
  async countWinsline() {
    let sumWinlinesCount = 0
    for(let m = 0; m < this.playersNums; m++) {
      if(this.players[m].winCountlines === 1){
        sumWinlinesCount += this.players[m].winCountlines
      }
      if(this.players[m].winCountlines === 2){
        sumWinlinesCount += this.players[m].winCountlines
      }
      if(this.players[m].winCountlines === 3){
        sumWinlinesCount += this.players[m].winCountlines
      }
    }
    let sumcountlinewin =  sumWinlinesCount
    return sumcountlinewin
  }

  // Find Sum Players If lose
  async countLosesLine() {
    let sumLoselinesCount = 0
    let findMaxWinLine = await this.calculatorMaxLines()
    for(let m = 0; m < this.playersNums; m++) {
      if(this.players[m].winCountlines === 0){
        sumLoselinesCount++
      }
    }
    let sumCountPlayerLose =  sumLoselinesCount
    return sumCountPlayerLose
  }
  async callSumLosePlayer() {
    let countLosesLines = this.countLosesLine()
  }
  // State calculator balance
  async calculatorState() {
    let lucky = 2
    let findMaxWinLine = await this.calculatorMaxLines()
    let sumtWinslines = await this.countWinsline()
    let countLosesLines = await this.countLosesLine()

    for(let m = 0; m < this.playersNums; m++) {
      if(this.players[m].winCountlines === 0) {
          let balance = this.players[m].wallet.balance - (this.players[m].wallet.buyIn * findMaxWinLine)
          this.players[m].wallet.balance = balance
      }
      if(this.players[m].winCountlines === 1) {
        let waitCallLucky = await this.calculatorLucky()
        if(waitCallLucky) {
          console.log("1",this.players[m].wallet.buyIn * findMaxWinLine);
          console.log("2",this.players[m].winCountlines * lucky);
          console.log("3",sumtWinslines);
          console.log("4", countLosesLines);
          console.log("5", (this.players[m].wallet.buyIn * findMaxWinLine) * countLosesLines );
          let bet =  (((this.players[m].wallet.buyIn * findMaxWinLine) * countLosesLines ) * this.players[m].winCountlines ) / sumtWinslines
          console.log("Bet  :", bet);
          let balance = this.players[m].wallet.balance + bet
          this.players[m].wallet.balance = balance
        } else {
          console.log("11",this.players[m].wallet.buyIn * countLosesLines, this.players[m].players);
          console.log("22",this.players[m].winCountlines + "/" +  sumtWinslines);
          console.log("33",sumtWinslines);
          console.log("44",countLosesLines);
          console.log("55", (this.players[m].wallet.buyIn * findMaxWinLine) * countLosesLines );
          let bet =  (((this.players[m].wallet.buyIn * findMaxWinLine) * countLosesLines ) * this.players[m].winCountlines ) / sumtWinslines
          console.log("Bet  :", bet);
          let balance = this.players[m].wallet.balance + bet
          this.players[m].wallet.balance = balance
        }
      }
      if(this.players[m].winCountlines === 2) {
        let waitCallLucky = await this.calculatorLucky()
        if(waitCallLucky) {
          console.log("1",this.players[m].wallet.buyIn * findMaxWinLine);
          console.log("2",this.players[m].winCountlines * lucky);
          console.log("3",sumtWinslines);
          console.log("4", countLosesLines);
          console.log("5", (this.players[m].wallet.buyIn * findMaxWinLine) * countLosesLines );
          let bet = (((this.players[m].wallet.buyIn * findMaxWinLine) * countLosesLines ) * this.players[m].winCountlines ) / sumtWinslines
          console.log("Bet  :", bet);
          let balance = this.players[m].wallet.balance + bet
          this.players[m].wallet.balance = balance
        } else {
          console.log("11",this.players[m].wallet.buyIn * countLosesLines, this.players[m].players);
          console.log("22",this.players[m].winCountlines + "/" +  sumtWinslines);
          console.log("33",sumtWinslines);
          console.log("44",countLosesLines);
          console.log("55", (this.players[m].wallet.buyIn * findMaxWinLine) * countLosesLines );
          let bet =  (((this.players[m].wallet.buyIn * findMaxWinLine) * countLosesLines ) * this.players[m].winCountlines ) / sumtWinslines
          console.log("Bet  :", bet);
          let balance = this.players[m].wallet.balance + bet
          this.players[m].wallet.balance = balance
        }
      }
      if(this.players[m].winCountlines === 3) {
        let waitCallLucky = await this.calculatorLucky()
        if(waitCallLucky) {
          console.log("1",this.players[m].wallet.buyIn * findMaxWinLine);
          console.log("2",this.players[m].winCountlines + "/" +  sumtWinslines);
          console.log("3",sumtWinslines);
          console.log("4", countLosesLines);
          console.log("5", (this.players[m].wallet.buyIn * findMaxWinLine) * countLosesLines );
          let bet = (((this.players[m].wallet.buyIn * findMaxWinLine) * countLosesLines ) * this.players[m].winCountlines ) / sumtWinslines
          console.log("Bet  :", bet);
          let balance = this.players[m].wallet.balance + bet
          this.players[m].wallet.balance = balance
        } else {
          console.log("11",this.players[m].wallet.buyIn * countLosesLines, this.players[m].players);
          console.log("22",this.players[m].winCountlines + "/" +  sumtWinslines);
          console.log("33",sumtWinslines);
          console.log("44",countLosesLines);
          console.log("55", (this.players[m].wallet.buyIn * findMaxWinLine) * countLosesLines );
          let bet =  (((this.players[m].wallet.buyIn * findMaxWinLine) * countLosesLines ) * this.players[m].winCountlines ) / sumtWinslines
          console.log("Bet  :", bet);
          let balance = this.players[m].wallet.balance + bet
          this.players[m].wallet.balance = balance
        }
      }
    }
    console.log("End Round... ", this.players);
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

  getBingoCount(table:any,numbers:any) {
    let bingoCount = 0
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
        markWinVertical = markVertical
        winlines.push("markWinVertical")
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
        markWinDiagonalLR = markDiagonalLeftRight
        winlines.push("markWinDiagonalLR")
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
        markWinDiagonalRL = markDiagonalRightLeft
        winlines.push("markWinDiagonalRL")
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
        markWinCorrner = markCorrner
        winlines.push("markWinCorrner")
      }
    }
    markedNumbers = markedNumbers.filter((value,index,self) => self.indexOf(value) === index)
    return  {bingoCount, markedNumbers, markWinHorizontal, markWinVertical, markWinDiagonalLR, markWinDiagonalRL, markWinCorrner, winlines};
  }

  // isCallState(players: any, banker: any) {
  //   console.log(players,banker);
  //   if (players.score < 6 || (players.score === 5 && players.cards.length === 2 && banker.score < 6 )) {
  //     players.cards = [...players.cards, this.deck.splice(~~(Math.random() * this.deck.length), 1)[0]]
  //   }
  //   if (players.cards.length === 3 && banker.cards.length === 2) {
  //     players.score =  this.isScores3Cards(players.cards)
  //     if (banker.score === 3 && players.score !== 8) {
  //       banker.cards = [...banker.cards, this.deck.splice(~~(Math.random() * this.deck.length), 1)[0]]
  //     } else if ((banker.score === 4 && players.score === 1 || 8 || 9 || 0)) {
  //       banker.cards = [...banker.cards, this.deck.splice(~~(Math.random() * this.deck.length), 1)[0]]
  //     } else if ((banker.score === 5 && players.score === 4 || 5 || 6 || 7)) {
  //       banker.cards = [...banker.cards, this.deck.splice(~~(Math.random() * this.deck.length), 1)[0]]
  //     } else if ((banker.score === 6 && players.score === 6 || 7)) {
  //       banker.cards = [...banker.cards, this.deck.splice(~~(Math.random() * this.deck.length), 1)[0]]
  //     }
  //     banker.score = this.isScores3Cards(banker.cards)
  //   }
  //   console.log("players,banker",players,banker);
  // }

}

