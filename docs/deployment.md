# 🌐 Deployment

## Build

```bash
npm run build     # tsc -b (typecheck) then vite build -> dist/
npm run preview   # serve the production build locally
```

The build fails if types don't pass — a broken build never ships.

## Hosting

This is a static SPA (`dist/`). Serve it from a CDN-backed static host:

- [Vercel](https://vercel.com/) · [Netlify](https://www.netlify.com/) ·
  [Cloudflare Pages](https://pages.cloudflare.com/) ·
  [AWS S3 + CloudFront](https://aws.amazon.com/cloudfront/)

Because it's a client-side-routed SPA, configure the host to **fall back to
`index.html`** for unknown paths (so deep links work).

## Environment

- Set `VITE_*` variables in the host's environment for the production build.
- Set `VITE_ENABLE_API_MOCKING=false` in production — MSW is for dev/test only.
- Point `VITE_API_URL` at the real backend.
- Remember client env vars are **public**; never ship a secret in one.

## CI checklist

Run before deploying (a single command):

```bash
npm run typecheck && npm run lint && npm run format:check && npm run test
npm run test:e2e    # if the host/CI can run Playwright
npm run build
```
