import express from 'express'
import cors from 'cors'

export class GameBCR {
  deck = Array.from(Array(52).keys()).sort((a: number, b: number) => Math.random() - 0.5)

  constructor() {
    this.main()
  }

  private main() {
    let players = {
        type: '',
        score: 0,
        cards: [0,0]
    }
    let banker = {
        type: '',
        score: 0,
        cards: [0,0]
    }
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
    banker.score =  this.isScores(banker.cards)
    // For Mock
    // players.score = 0
    // banker.score = 8
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
}

