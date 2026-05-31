# 🔐 Security

Client-side measures complement — never replace — server-side enforcement.

## Authentication

This template ships **without** auth so it stays generic. When a project needs
it, follow this shape (and ask before adding the dependency):

- Store the session token in an **`HttpOnly` cookie** set by the server, not in
  `localStorage`/`sessionStorage` (which are exposed to XSS).
- Treat the current user as global app state: a small store or context, loaded
  once at startup. The app is "authenticated" when a user object is present.
- Add a `ProtectedRoute` wrapper in `src/lib/auth` and use it in
  `src/app/router.tsx` for guarded route subtrees.
- Let the api-client interceptor handle `401` centrally (redirect to login).

## Authorization

- **RBAC** — gate features by role (`USER`, `ADMIN`, ...). A small `<Authorization
allowedRoles={[...]}>` component or `useAuthorization` hook in `src/lib`.
- **PBAC** — for per-resource rules (e.g. only the author may delete), check a
  policy against the resource and current user.

Keep the user/roles model in `src/types`, and the auth/authorization helpers in
`src/lib` so any feature can use them without cross-feature imports.

## Input handling & XSS

- Never render untrusted HTML. If you must, sanitize first (e.g. DOMPurify) and
  only then set it — never pass raw user input to `dangerouslySetInnerHTML`.
- Validate **all** external input with Zod at the boundary (API responses, form
  data, URL params).
- Keep secrets server-side. Only `VITE_`-prefixed vars reach the client and they
  are public — never put a real secret in one.

See the [OWASP client-side top 10](https://owasp.org/www-project-top-10-client-side-security-risks/).
