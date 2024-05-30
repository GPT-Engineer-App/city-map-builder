# city-map-builder

Build a web app that simulate and draw simplified city maps.

Each maps should be refreshed and generated randomly by pressing a button.

Each maps should have the 3 following types of items disposed randomly on the map:
- Houses
- Stores
- Roads

Houses and stores should be represented by pictograms

To generate roads, the app should first draw a close-to-invisible grid in the background of the map, with vertical and horizontal lines. Each road segments should correspond to a gris segment. Each road segment should always be connected to at least one other road segment. Road segments must be draw as close as possible to homes and stores, and should allow to travel from one house to another, for one house to one store, from one store to another and from one store to a house.

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React and Chakra UI.

- Vite
- React
- Chakra UI

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/city-map-builder.git
cd city-map-builder
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
