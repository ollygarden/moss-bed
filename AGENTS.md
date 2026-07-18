# Repository guidance

## Purpose

Moss-bed is OllyGarden's public React UI component library and dark-first design
system. It is published as the `moss-bed` npm package for Petal, other products,
external collaborators, and design-tool integrations such as Figma Make.

## Working in this repository

Use Bun and commit `bun.lock` when dependency changes are intentional. Match CI
before opening or updating a pull request:

```sh
bun install --frozen-lockfile
bun run format:check
bun run lint
bun run typecheck
bun run test:run
bun run build
bun run build-storybook
```

Use `bun run storybook` for local visual development. Run `bun run format` only
on files in scope; avoid mixing repository-wide formatting into focused changes.

## Repository layout

- `src/components/ui/` contains components, stories, variants, and colocated
  tests. `src/components/ui/index.ts` is the root package barrel.
- `src/foundations/` documents design foundations in Storybook.
- `src/moss-bed-variables.css` defines the published design tokens.
- `src/tailwind-preset.ts` is the published Tailwind preset.
- `src/test/` contains shared Vitest and Testing Library setup.
- `.storybook/` configures the canonical visual documentation and smoke build.
- `vite.config.ts`, `tsconfig.lib.json`, and `package.json` define the published
  JavaScript, type declarations, CSS, peer dependencies, and subpath exports.
- [PUBLISHING.md](PUBLISHING.md) documents the manual release workflow.

## Component and design-system guardrails

- Treat the root barrel, `package.json` `exports`, component props, variant
  names, CSS variables, and Tailwind token names as public API. Describe
  compatibility effects and follow the documented pre-1.0 versioning policy.
- Keep components product-agnostic. Moss-bed is the source of truth; do not copy
  Petal domain logic, application state, API calls, or product-specific text into
  the library.
- Build accessible behavior on semantic HTML and Radix primitives. Preserve
  keyboard navigation, focus visibility, labels, roles, and disabled/loading
  semantics. WCAG 2.1 AA is the baseline.
- Add or update a Storybook story for public visual states and a focused Vitest
  test for interaction or behavior changes. Storybook must build without relying
  on a consuming application.
- Keep the current dark-first token contract aligned across
  `src/moss-bed-variables.css`, the Tailwind preset, Storybook, and README. Do not
  claim light-theme support until a distinct light token set exists.
- Export root-safe components from `src/components/ui/index.ts`. Components with
  hard optional peers need a dedicated subpath; synchronize `package.json`
  `exports`, Vite library entries, type output, README, and peer metadata.
- Keep runtime peer dependencies external to the bundle. When adding a package,
  decide deliberately whether it belongs in `peerDependencies`, optional peer
  metadata, `devDependencies`, and Vite's external list.
- Keep icons synchronized with the SVG registry and `IconName` type. Use
  `currentColor` where consumers control color and include an accessible name for
  icon-only controls.
- Do not commit `dist/` or `storybook-static/`. Inspect the built package and
  `npm publish --dry-run` before publishing.

## Releases

Publishing is a maintainer operation. The package is public and pre-1.0: patches
must remain compatible, while minor releases may include documented breaking
changes. Follow [PUBLISHING.md](PUBLISHING.md), bump `package.json` deliberately,
and audit the exact tarball contents before `npm publish`.

## Pull requests

Follow [CONTRIBUTING.md](CONTRIBUTING.md). Identify public API and consumer
effects, include visual or test evidence where appropriate, and list the exact
validation performed.
