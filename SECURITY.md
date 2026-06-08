# Security Policy

## Reporting a Vulnerability

**Please do not open a public issue for security vulnerabilities.**

Report privately via GitHub's
[**Report a vulnerability**](https://github.com/nsollazzo/poi-ui/security/advisories/new)
form (Security → Advisories). This opens a private channel with the maintainer.

Please include:

- A description of the issue and its impact
- Steps to reproduce (or a proof of concept)
- Affected version(s)
- Any suggested fix or mitigation

You can expect an acknowledgement within **72 hours**. Once a fix is ready we will
publish a patched release and credit you in the advisory (unless you prefer to
remain anonymous).

## Supported Versions

This is a pre-1.0 library; only the **latest published `0.x` release** receives
security fixes. Pin a version and upgrade promptly when a patch ships.

| Version        | Supported          |
| -------------- | ------------------ |
| latest `0.x`   | :white_check_mark: |
| older releases | :x:                |

## Scope

`@nsollazzo/poi-ui` is a zero-runtime-dependency Svelte component library: it ships
compiled components and CSS, runs no install scripts, and makes no network calls.
The most relevant risks are supply-chain integrity (build/publish pipeline) and
issues in the published output. Releases are published from CI with
[npm provenance](https://docs.npmjs.com/generating-provenance-statements); you can
verify a published version with `npm audit signatures`.
