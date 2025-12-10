Title: fix(render): middleware imports, CORS and deploy improvements + docs

Summary

This PR bundles a set of small, low-risk changes to make PREXCOL deployable and reliable on Render, plus a set of documentation and reorganization artifacts to help onboarding and operations.

What changed

- Fix middleware import path in `src/backend/settings.py` to use `user_middleware.ActiveUserMiddleware` (prevents ImportError in some environments).
- Update `render.yaml`:
  - Run `migrate --noinput` before `collectstatic` in `buildCommand` to ensure DB tables exist before static build steps.
  - Set `gunicorn` explicit parameters in `startCommand` (`--workers`, `--worker-class`, `--bind`) for predictable concurrency.
  - Add recommended env vars: `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`, `CSRF_TRUSTED_ORIGINS`.
- Add documentation and reorganization plan under `docs/` and root-level indexes:
  - `docs/arquitectura/*` (architecture & standards)
  - `docs/deployment/RENDER_AUDIT_Y_CORRECCIONES.md` (audit + checklist)
  - `docs/PLAN_REORGANIZACION_MAESTRO.md` (file reorg plan)
  - `INDEX_MAESTRO_DOCUMENTACION.md`, `RESUMEN_2_MINUTOS.md`, `CIERRE_TRABAJO_FINAL.md`, `DASHBOARD_VISUAL_ENTREGABLES.md`
- Add CI: `.github/workflows/post_deploy_smoke.yml` to run post-merge smoke tests against the deployed URL.

Why

These changes are small, reversible, and address deployment reliability (migrations, middleware import correctness, CORS), and provide documentation required for operation and handoff. The smoke-tests workflow provides continuous, automated verification after merges to `main`.

Verification

- Local verification performed:
  - Backend runs and responds at `http://localhost:8000/`.
  - Frontend dev served at `http://localhost:5175/` and can reach backend.
  - Created test users and verified login returns JWT (`cliente1@example.com` / `cliente123`).
- Post-merge checklist (to run on Render):
  - Ensure `DEPLOY_URL` or `ALLOWED_HOSTS` is configured on Render.
  - Confirm `DATABASE_URL` present and migrations applied by build logs.
  - Confirm smoke tests pass (GH Actions will run if secrets configured).

Rollback

- Revert this PR if any issue appears, redeploy previous commit in Render, and if necessary restore DB from backup.

Notes

- Secrets required for GH Actions smoke-tests: `DEPLOY_URL`, `SMOKE_TEST_USER_EMAIL`, `SMOKE_TEST_USER_PASSWORD` (optional).

---

(End of PR body)
