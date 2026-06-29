# Contributing to positronick-ui

Thanks for your interest in contributing! positronick-ui is an open-source Svelte 5 component library by Nicholas Sollazzo (https://nsollazzo.com).

## Getting started

```sh
pnpm install          # installs deps + git hooks + Playwright browsers
pnpm dev              # kitchen-sink demo
pnpm storybook        # component workshop
```

## Development workflow

We use **test-driven development**. For any component or behaviour change:

1. Write a failing test first (`src/lib/**/*.svelte.test.ts` for component/browser tests, `*.test.ts` for plain unit tests).
2. Implement until it passes.
3. Refactor, add/extend a Storybook story, and add a demo entry.

Tests encode **intent**, not just behaviour — e.g. "Samaritan emphasis must have no glow", asserted against real computed styles in a browser (Playwright via `vitest-browser-svelte`).

### Quality gates (run before pushing)

```sh
pnpm lint             # prettier + eslint
pnpm check            # svelte-check
pnpm test:coverage    # all tests + coverage
pnpm prepack          # build the publishable package into dist/
pnpm check:package    # validate the package with publint
```

CI runs these on every PR; the same gates must be green.

## Design principles

- **Two themes, one component set.** Components read only **semantic tokens**; never hard-code a color. Theme differences live in the token layer (`src/lib/styles/`), not in component logic.
- **Accessibility is not optional.** WCAG AA contrast in both themes, real semantics, visible focus rings, and every animation gated behind `prefers-reduced-motion`.
- **No runtime dependencies.** Pure Svelte 5 + scoped styles + CSS custom properties. No CSS frameworks, no jQuery.

## Commits & changesets

- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) (enforced by commitlint). Examples: `feat: add StatusRow`, `fix: correct Samaritan focus ring`, `docs: ...`, `chore: ...`.
- For any user-facing change, add a changeset:

  ```sh
  pnpm changeset
  ```

  Pick the bump (patch/minor/major) and describe the change.

## Releasing (maintainers)

Releases are **tag-driven**: pushing a `vX.Y.Z` tag triggers [`release.yml`](./.github/workflows/release.yml), which publishes `@positronick/ui` to npm (via OIDC trusted publishing, with provenance) and cuts a GitHub Release. To cut one:

```sh
pnpm changeset version   # consume .changeset/*.md → bump package.json + CHANGELOG.md
git commit -am "chore: release vX.Y.Z"
git tag vX.Y.Z
git push --follow-tags
```

`pnpm changeset version` decides `X.Y.Z` from the queued changesets. No "Version Packages" PR is involved.

## Code of Conduct

This project follows the [Contributor Covenant](./CODE_OF_CONDUCT.md). By participating you agree to uphold it.
