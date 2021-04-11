# Sankey budget

Ce repo a pour objet de visualiser un budget de collectivité territoriale comme un diagrame Sankey


## Tech

This repo is based on [Jekyll](jekyllrb.com/), so content can be written in markdown or HTML

A JavaScript bundler with [svelte](https://svelte.dev/) is set up

Continuous deployment is setup via Github Actions. The continuous deployement builds with `npm run build` then does a `git push origin online`, then triggers a github page build of the `online` branch

## Local dev

```sh
npm install
bundle install

npm run dev
```


## Expectations and licence

I expect to be credited for the work on this repo

Everything written by me and contributors to this repo is licenced under **CC0 1.0 (Public Domain)**


#### Dependencies

Bootstrap reboot is **MIT**-licenced
Svelte and rollup config are **MIT**-licence
