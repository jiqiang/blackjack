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
  
  constructor(numOfDecks: 2|4|6|8) {
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

const shoe = new Shoe(2);
shoe.ShuffleCards(2);
console.log(shoe.GetCards());
