export function shuffle(items, rng = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function dealRows(deck) {
  return [0, 1, 2].map(row => deck.filter((_, index) => index % 3 === row));
}

export function collectRows(rows, selectedRow) {
  const others = [0, 1, 2].filter(row => row !== selectedRow);
  return [...rows[others[0]], ...rows[selectedRow], ...rows[others[1]]];
}

export function makePlayingDeck() {
  return ['spades', 'hearts', 'clubs', 'diamonds'].flatMap(suit =>
    ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'].map(rank => ({id: `${rank}-${suit}`, rank, suit}))
  );
}
