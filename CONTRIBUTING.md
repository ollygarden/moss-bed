# Contributing to moss-bed

Thank you for your interest in contributing! Community contributions are
welcome.

## Community expectations

Participation is governed by OllyGarden's
[Code of Conduct](https://github.com/ollygarden/.github/blob/main/CODE_OF_CONDUCT.md).
Report suspected vulnerabilities privately through the repository's
[security policy](https://github.com/ollygarden/moss-bed/security/policy), not in
a public issue. Project roles and decisions follow OllyGarden's
[governance policy](https://github.com/ollygarden/.github/blob/main/GOVERNANCE.md).

Contributions authored with AI coding agents are welcome and held to the same
standards as other changes. A human contributor must review and take
responsibility for the result, disclose material agent involvement in the pull
request, and be able to respond to feedback.

## Getting started

1. Search existing issues and pull requests for related work. Open an issue
   before investing in a large, breaking, or design-system-wide change.
2. Fork and clone the repository, then create a focused branch from `main`.
3. Read [AGENTS.md](AGENTS.md) and the relevant component stories and tests.
4. Make and validate the change with Bun.
5. Open a focused pull request with a summary, test plan, and screenshots or
   Storybook evidence for visual changes.

Use [Conventional Commits](https://www.conventionalcommits.org/), for example
`fix(button): preserve focus styling while loading`.

## Validation

```sh
bun install --frozen-lockfile
bun run format:check
bun run lint
bun run typecheck
bun run test:run
bun run build
bun run build-storybook
```

## Pull request expectations

- Keep the pull request focused on one component, foundation, or release concern.
- Explain public API, peer dependency, token, accessibility, or consumer impact.
- Update tests, stories, the README catalog, exports, and publishing metadata
  together when the public surface changes.
- Do not commit generated build output, npm credentials, customer data, or
  proprietary product assets.
- Resolve review threads and keep the branch current before requesting merge.

Maintainers review changes for accessibility, visual consistency, compatibility,
scope, and maintainability. Before a first pull request can be merged,
contributors must sign OllyGarden's
[Contributor License Agreement](https://github.com/ollygarden/.github/blob/main/CLA.md);
the CLA bot provides instructions on the pull request.
