# Twenty One

A colorful, bilingual 21-card trick. Keep a card in mind, select its row three times, and see it revealed. Includes a random classic playing deck and 21 illustrated fantasy friends, English and Arabic with a complete RTL layout, keyboard controls, optional synthesized sound, and reduced-motion support.

**[Play online · العب الآن](https://asalhi.github.io/CardsTrick21/)**

## Run locally

Requires Node.js. No dependencies or build step.

```sh
npm run dev
```

Open http://127.0.0.1:4173. `dist/` is the complete portable static website.

## Verify

```sh
npm test
```

Tests cover all 21 target positions, all outer-row ordering combinations, deck uniqueness, immutable dealing and collection, and shuffle edge cases.

## How it works

Cards are dealt one at a time across three horizontal rows. The selected row is collected in the middle each time. A card's zero-based position becomes `7 + floor(position / 3)`. After three selections, every starting position converges to index 10. Language changes preserve the deck and round; changing worlds or restarting begins a fresh game.

The fantasy sprite atlas was created for this project with image generation. All game processing happens in the browser; no accounts or backend are required by the game. Language preference is saved locally.

## GitHub Pages

The GitHub Actions workflow in `.github/workflows/pages.yml` checks JavaScript, runs the game tests, and deploys `dist/` to GitHub Pages whenever `main` changes. The website uses relative asset paths so it works under a repository URL.
