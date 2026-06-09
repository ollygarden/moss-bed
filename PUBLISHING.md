# Publishing moss-bed

`moss-bed` is the public npm package for the OllyGarden React UI component library. It's consumed by Petal (the OllyGarden Cloud frontend), other org products, and [Figma Make](https://www.figma.com/make/).

## Quick publish

```bash
# 1. Bump the version in package.json (semver: patch / minor / major)
# 2. Build + publish
bun run build
npm publish
```

`prepublishOnly` runs `bun run build` automatically before `npm publish`, so the manual `bun run build` is belt-and-suspenders. `publishConfig.access: public` keeps the package public on every publish.

## Dry run

Always check the file list before publishing:

```bash
bun run build
npm publish --dry-run
```

This shows exactly which files will be uploaded, the tarball size, and the version. Anything unexpected → stop and audit `files` in `package.json` and `.npmignore`.

## What gets published

| Source                                  | Published path                  | Purpose                       |
| --------------------------------------- | ------------------------------- | ----------------------------- |
| `src/components/ui/*` (compiled)        | `dist/components/ui/*/index.js` | Individual component bundles  |
| `src/components/ui/index.ts` (compiled) | `dist/index.js`                 | Root barrel export            |
| `src/tailwind-preset.ts` (compiled)     | `dist/tailwind-preset.js`       | Tailwind preset for consumers |
| `src/moss-bed-variables.css`            | `dist/moss-bed-variables.css`   | CSS variables (design tokens) |
| `src/**/*.d.ts` (generated)             | `dist/types/**/*.d.ts`          | TypeScript declarations       |
| `package.json`                          | `package.json`                  | Manifest                      |
| `README.md`                             | `README.md`                     | npm page docs                 |

Tests, stories, Storybook config, and dev tooling are excluded via the `files` field in `package.json`.

## Versioning

`moss-bed` is pre-1.0. Breaking changes are allowed on minor bumps.

- **Patch** (`0.3.1` → `0.3.2`) — bug fixes, internal refactors, no API change
- **Minor** (`0.3.x` → `0.4.0`) — new components, new props, deprecations, **and breaking changes**
- **Major** (`0.x.y` → `1.0.0`) — API stabilization milestone

## Adding or removing a public component

1. Export / un-export from `src/components/ui/index.ts` (the barrel is the library's public surface).
2. If the component has a hard peer dep (like `react-router-dom` for `Link`), exclude it from the barrel and give it a dedicated subpath in `package.json` `exports`. Match the pattern used by `./link`, and add a matching entry in `vite.config.ts` `build.lib.entry` so the file actually gets emitted to `dist/`.
3. Add a row to the component catalog in `README.md`.
4. Bump the version (minor if new component or breaking, patch otherwise).
5. `bun run build && npm publish`.

## Checking the published package

```bash
npm view moss-bed                 # latest version + metadata
npm view moss-bed versions --json # all published versions
npm pack moss-bed                 # download tarball to inspect locally
tar -tzf moss-bed-*.tgz | less
```

## CI / automation (planned)

Publishes are currently manual from a maintainer's machine with `npm login` against the package owner account (`catalinasy`). Planned CI flow:

1. PR-triggered: `bun run typecheck && bun run lint && bun run test:run && bun run build`
2. Release-triggered: same checks, then `npm publish` with `NPM_TOKEN` from repo secrets, only on tags `v*` from `main`.
3. Storybook auto-deploy to GitHub Pages on every push to `main` and PR preview deploy on PRs.

## Figma Make specifics

Figma Make consumes moss-bed as a standard public npm package. The README checked into this repo is what shows up on npmjs.org and what Make's AI reads for context — keep the component catalog in sync when components are added or removed.
