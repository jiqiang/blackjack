const ranks: string[] = "A,2,3,4,5,6,7,8,9,10,J,Q,K".split(",");
const suits: string[] = "♣,♦,♥,♠".split(",");

export class Player {
  private name: string;
  private cards: Card[];

  public GetName(): string {
    return this.name;
  }

  public GetCards(): Card[] {
    return this.cards;
  }

  public ReceiveCard(card: Card) {
    this.cards.push(card);
  }

  public ResetCards(): void {
    this.cards = [];
  }

  constructor(name: string) {
    this.name = name;
    this.cards = [];
  }
}

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
  private playerID: number = 0;
  private shoe: Shoe;
  private players: Map<number, Player>;

  constructor() {
    this.shoe = new Shoe(1);
    this.shoe.ShuffleCards(1);
    this.players = new Map();
  }

  private getPlayerID(): number {
    return this.playerID;
  }

  public AddPlayer(name: string): number {
    const playerID = this.getPlayerID();
    this.playerID++;
    this.players.set(playerID, new Player(name));
    return playerID;
  }

  public IssueCard(playerID: number): boolean {
    const card = this.shoe.GetCard();
    const player = this.players.get(playerID);
    if (!player) {
      return false;
    }
    player.ReceiveCard(card);
    return true;
  }

  public GetPlayerHandValues(playerID: number): number {
    const player = this.players.get(playerID);
    return this.CalculateHandValues(player.GetCards());
  }

  public Display(): void {
    // const shoeCards: string[] = [];
    // this.shoe.GetCards().forEach(card => {
    //   shoeCards.push(`${card.Suit}${card.Rank}`);
    // })

    // console.log(shoeCards.join(" "));

    for (const [playerID, player] of this.players) {
      const playerCardsArray: string[] = [];
      const playerCards: Card[] = player.GetCards();
      playerCards.forEach(card => {
        playerCardsArray.push(`${card.Suit}${card.Rank}`);
      });
      const playerPoints: number = this.CalculateHandValues(playerCards);
      console.log(`${player.GetName()}(${playerID}): ${playerCardsArray.join(" ")} [${playerPoints}]`);
    }
  }

  /**
   * Calculates hand values
   *
   * @param cards - Player received cards
   */
  private CalculateHandValues(cards: Card[]) {
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

const game = new Game();
const dealerID = game.AddPlayer('Dealer');
const playerID = game.AddPlayer('Glenn');

let playerStand = false;
let dealerStand = false;

while (true) {
  if (game.GetPlayerHandValues(dealerID) >= 17) {
    dealerStand = true;
  } else {
    game.IssueCard(dealerID);
  }

  if (game.GetPlayerHandValues(playerID) >= 17) {
    playerStand = true;
  } else {
    game.IssueCard(playerID);
  }

  if (dealerStand && playerStand) {
    break;
  }
}

game.Display();