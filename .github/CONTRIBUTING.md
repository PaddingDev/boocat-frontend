# Contribute Guide

- node LTS
- pnpm 7.x (`corepack enable`)

Install dependencies

```sh
pnpm i
```

Then [boot backend](https://github.com/kevinzonda/bookie)

Create `.env` and type the endpoint (if you dont change backend port, it's `7071`).

```
endpoint = http://127.0.0.1:7071
```

Finally run `pnpm dev`. Now that everything is ready, do what you want to do.

## Coding and Commit Style

We use [@kecrily/eslint-config](https://github.com/kecrily/eslint-config) and [Conventional Commits](https://www.conventionalcommits.org)

Before submit commit, you should run `pnpm lint` to check coding style is fine.

And your commit message also needs to follow Conventional Commits.
