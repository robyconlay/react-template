# e2e/ — end-to-end tests

Playwright specs (`*.spec.ts`). Playwright boots the dev server itself (see
`playwright.config.ts`) with MSW mocking on, then drives the app like a user.

```bash
npx playwright install   # once
npm run test:e2e
```

Add an e2e check for each critical user flow. See `docs/testing.md`.
