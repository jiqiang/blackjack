import Player from "./player.ts";

const ranks: string[] = "A,2,3,4,5,6,7,8,9,10,J,Q,K".split(",");
const suits: string[] = "♣,♦,♥,♠".split(",");

export class Card {
  public Suit: string;
  public Rank: string;
  constructor(suit: string, rank: string) {
    this.Suit = suit;
    this.Rank = rank;
  }
}

export class Deck {
  public Cards: Card[] = [];
  constructor() {
    suits.forEach(suit => {
      ranks.forEach(rank => {
        this.Cards.push(new Card(suit, rank));
      });
    });
  }
}

export class Shoe {
  private Cards: Card[] = [];
  private index: number = 0;

  constructor(numOfDecks: 1|2|3|4|5|6|7|8) {
    for (let i = 0; i < numOfDecks; i++) {
      this.Cards = this.Cards.concat((new Deck()).Cards);
    }
  }

  public GetCards(): Card[] {
    return this.Cards;
  }

  public ShuffleCards(numOfShuffles: 1|2|3): void {
    for (let i = 0; i < numOfShuffles; i++) {
      this.shuffle();
    }
  }

  public GetCard(): Card {
    const card = this.Cards[this.index];
    this.index++;
    return card;
  }

  /**
   * Fisher-Yates shuffle
   */
  private shuffle(): void {
    let numOfCards: number = this.Cards.length;
    let card: Card;
    let randomIndex: number;

    // While there remain elements to shuffle…
    while (numOfCards) {
      // Pick a remaining element…
      randomIndex = Math.floor(Math.random() * numOfCards--);

      // And swap it with the current element.
      card = this.Cards[numOfCards];
      this.Cards[numOfCards] = this.Cards[randomIndex];
      this.Cards[randomIndex] = card;
    }
  }
}

export class Game {
  private shoe: Shoe;
  private dealer: Player;
  private player: Player;

  constructor() {
    this.shoe = new Shoe(1);
    this.shoe.ShuffleCards(1);

    this.dealer = new Player('dealer');
  }

  public AddPlayer(player: Player): void {
    this.player = player;
  }

  public Debug(): void {
    console.log(this.shoe.GetCards());
    console.log(this.dealer);
    console.log(this.player);
  }

  /**
   * Calculates hand values
   *
   * @param cards - Player received cards
   */
  public CalculateHandValues(cards: Card[]) {
    let sumWithoutAces: number = 0;
    let numOfAces: number = 0;

    cards.forEach(card => {
      switch (card.Rank) {
        case "A":
          numOfAces++;
          break;
        case "J":
        case "Q":
        case "K":
          sumWithoutAces += 10;
          break;
        default:
          sumWithoutAces += parseInt(card.Rank, 10);
      }
    });

    if (numOfAces === 0) {
      return sumWithoutAces;
    }

    const sumWithSmallAces = sumWithoutAces + numOfAces;

    if (21 - sumWithSmallAces < 10) {
      return sumWithSmallAces;
    }

    return sumWithSmallAces + 10;
  }
}

const glenn = new Player("Glenn");
const game = new Game();
game.AddPlayer(glenn);

game.Debug();
