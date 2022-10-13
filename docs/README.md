# Vault Docs

This repository has the sources of the [Piiano Vault documentation website](https://piiano.com/docs).

It acts as a mirror for the private `docs` project used internally by Piiano.

### Contribution

Any contribution is welcome.

#### Forms of contribution:

* Open an issue about a mistake/inaccuracy in a document.
* Open an issue about a missing documentation.
* Open a PR adding new/corrected content.

PR's to this repo will be reviewed by the Vault core team and added to the private Vault monorepo.

Once a PR is merged to the Vault monorepo it will eventually get to this repo by the repo mirroring.

### Local Development

The Vault docs site is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

Install dependencies:

```bash
yarn && ./prepare.sh
```

Starts a local development server and opens up a browser window:

```bash
yarn start
```

Most changes are reflected live without having to restart the server.
