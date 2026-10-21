import test from 'node:test';
import assert from 'node:assert/strict';
import { dealRows, collectRows, makePlayingDeck, shuffle } from '../dist/game.mjs';

const twentyOne = () => Array.from({ length: 21 }, (_, index) => index);

function assertSameCards(actual, expected) {
  assert.equal(actual.length, expected.length);
  assert.deepEqual(new Set(actual), new Set(expected));
}

test('dealing produces three horizontal rows in round-robin order', () => {
  const deck = Object.freeze(twentyOne());
  const rows = dealRows(deck);

  assert.deepEqual(rows, [
    [0, 3, 6, 9, 12, 15, 18],
    [1, 4, 7, 10, 13, 16, 19],
    [2, 5, 8, 11, 14, 17, 20],
  ]);
  assert.deepEqual(deck, twentyOne());
  assertSameCards(rows.flat(), deck);
});

test('collecting any selected row puts its seven cards in the middle without changing a row', () => {
  const rows = Object.freeze(dealRows(twentyOne()).map(row => Object.freeze(row)));

  for (let selectedRow = 0; selectedRow < 3; selectedRow += 1) {
    const others = [0, 1, 2].filter(index => index !== selectedRow);
    const collected = collectRows(rows, selectedRow);

    assert.deepEqual(collected, [
      ...rows[others[0]], ...rows[selectedRow], ...rows[others[1]],
    ]);
    assert.deepEqual(collected.slice(7, 14), rows[selectedRow]);
    assertSameCards(collected, twentyOne());
  }
});

test('all 21 possible secret cards reach the eleventh position after exactly three turns', () => {
  for (const target of twentyOne()) {
    let deck = twentyOne();

    for (let turn = 0; turn < 3; turn += 1) {
      const oldPosition = deck.indexOf(target);
      const rows = dealRows(deck);
      const selectedRow = rows.findIndex(row => row.includes(target));

      assert.equal(selectedRow, oldPosition % 3);
      assert.equal(rows[selectedRow].filter(card => card === target).length, 1);
      assertSameCards(rows.flat(), twentyOne());

      deck = collectRows(rows, selectedRow);

      assert.equal(deck.indexOf(target), 7 + Math.floor(oldPosition / 3));
      assertSameCards(deck, twentyOne());
    }

    assert.equal(deck[10], target, `secret card ${target} was not revealed`);
  }
});

test('either ordering of the two other rows works independently on every turn', () => {
  // Eight masks cover both outer-row orders on each of the three turns.
  for (const target of twentyOne()) {
    for (let mask = 0; mask < 8; mask += 1) {
      let deck = twentyOne();

      for (let turn = 0; turn < 3; turn += 1) {
        const rows = dealRows(deck);
        const selectedRow = rows.findIndex(row => row.includes(target));
        const others = [0, 1, 2].filter(index => index !== selectedRow);
        if (mask & (1 << turn)) others.reverse();
        deck = [...rows[others[0]], ...rows[selectedRow], ...rows[others[1]]];
      }

      assert.equal(deck[10], target, `secret card ${target}, outer-row order ${mask}`);
    }
  }
});

test('a shuffled selection of 21 distinct playing cards has the same three-turn guarantee', () => {
  const initialDeck = shuffle(makePlayingDeck(), () => 0.37).slice(0, 21);
  assert.equal(new Set(initialDeck.map(card => card.id)).size, 21);

  for (const target of initialDeck) {
    let deck = [...initialDeck];
    for (let turn = 0; turn < 3; turn += 1) {
      const rows = dealRows(deck);
      const selectedRow = rows.findIndex(row => row.some(card => card.id === target.id));
      deck = collectRows(rows, selectedRow);
    }
    assert.equal(deck[10].id, target.id);
  }
});

test('the playing deck contains every rank and suit combination exactly once', () => {
  const deck = makePlayingDeck();
  const ranks = new Set(deck.map(card => card.rank));
  const suits = new Set(deck.map(card => card.suit));

  assert.equal(deck.length, 52);
  assert.equal(new Set(deck.map(card => card.id)).size, 52);
  assert.deepEqual(ranks, new Set(['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']));
  assert.deepEqual(suits, new Set(['spades', 'hearts', 'clubs', 'diamonds']));

  for (const card of deck) {
    assert.ok(card.id !== undefined && card.id !== null && card.id !== '');
    assert.ok(card.rank !== undefined && card.rank !== null && card.rank !== '');
    assert.ok(card.suit !== undefined && card.suit !== null && card.suit !== '');
  }
  for (const rank of ranks) {
    assert.equal(deck.filter(card => card.rank === rank).length, 4);
    for (const suit of suits) {
      assert.equal(deck.filter(card => card.rank === rank && card.suit === suit).length, 1);
    }
  }
  for (const suit of suits) {
    assert.equal(deck.filter(card => card.suit === suit).length, 13);
  }
});

test('new playing decks do not share a mutable array', () => {
  const first = makePlayingDeck();
  const second = makePlayingDeck();
  assert.notEqual(first, second);
  first.pop();
  assert.equal(second.length, 52);
});

test('shuffle preserves every item, leaves the input alone, and handles edge RNG values', () => {
  const source = Object.freeze(makePlayingDeck().map(card => Object.freeze(card)));
  const originalIds = source.map(card => card.id);

  for (const randomValue of [0, 0.5, 0.9999]) {
    let calls = 0;
    const result = shuffle(source, () => { calls += 1; return randomValue; });

    assert.notEqual(result, source);
    assert.ok(calls > 0, 'the provided RNG should control shuffling');
    assertSameCards(result, source);
    assert.equal(new Set(result.map(card => card.id)).size, 52);
    assert.deepEqual(source.map(card => card.id), originalIds);
    assert.deepEqual(result, shuffle(source, () => randomValue));
  }
});

test('shuffle returns new arrays for empty and singleton inputs', () => {
  for (const source of [[], ['only card']]) {
    Object.freeze(source);
    const result = shuffle(source, () => 0.9999);
    assert.notEqual(result, source);
    assert.deepEqual(result, source);
  }
});
