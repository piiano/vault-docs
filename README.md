# Vault Docs

This repository contains the sources of the [Piiano Vault documentation website](https://piiano.com/docs).

It mirrors the private `docs` project used internally by Piiano.

### Contribution

All contributions are welcome.

#### Forms of contribution

* Open an issue about a mistake or inaccuracy in a document.
* Open an issue about missing documentation.
* Open a PR adding new or corrected content.

The Vault team reviews PRs to this repo and adds them to the private `docs` project. Mirroring then reflects those PR changes to this repo.

### Local development

The Vault docs site uses [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

Install dependencies:

```bash
yarn && ./prepare.sh
```

Start a local development server:

```bash
yarn start
```

Open a browser window at http://localhost:3000/docs to view your changes. Most changes are reflected live without having to restart the server.
