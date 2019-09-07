/**
 * Fisher-Yates shuffle
 *
 * @param array - An array to be shuffled
 */
export function shuffle<T>(array: T[]) {
  let m: number = array.length;
  let t: T;
  let i: number;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
}

/**
 * Calculates hand values
 *
 * @param cards - Player received cards
 */
export function calculateHandValues(cards: string[]) {
  let sumWithoutAces: number = 0;
  let numOfAces: number = 0;

  cards.forEach(card => {
    switch (card) {
      case "A":
        numOfAces++;
        break;
      case "J":
      case "Q":
      case "K":
        sumWithoutAces += 10;
        break;
      default:
        sumWithoutAces += parseInt(card, 10);
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

// const deck = 'A,2,3,4,5,6,7,8,9,10,J,Q,K'.split(',');

// shuffle(deck);

// console.log(deck);
