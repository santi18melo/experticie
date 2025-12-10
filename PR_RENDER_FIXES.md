# PR: Render fixes + Docs

## Summary
This PR bundles the changes needed to deploy PREXCOL safely on Render and the new documentation created as part of the reorganization work.

## Changes included
- Fix middleware import path in `src/backend/settings.py` (use `user_middleware.ActiveUserMiddleware`).
- Add `migrate --noinput` before `collectstatic` in `render.yaml` build command.
- Set `gunicorn` workers, worker class and bind address in `render.yaml` start command.
- Add `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS` env vars in `render.yaml`.
- Add and commit documentation: `docs/arquitectura/*`, `docs/PLAN_REORGANIZACION_MAESTRO.md`, `INDEX_MAESTRO_DOCUMENTACION.md`, `CIERRE_TRABAJO_FINAL.md`, `DASHBOARD_VISUAL_ENTREGABLES.md`, etc.

## Why
- Middleware import fix prevents ImportError on boot in Render environment.
- Running migrations before `collectstatic` prevents missing table issues during build.
- Explicit gunicorn settings provide predictable concurrency.
- CORS/CSRF changes ensure frontend at `https://prexcol.onrender.com` can communicate with backend.

## Verification checklist (run after merge)
- [ ] Render build completes without errors.
- [ ] Backend process stays up and responds on `https://<render-service-url>/`.
- [ ] API root returns 200.
- [ ] Frontend deployed and can log in (test `cliente1@example.com` / `cliente123`).
- [ ] Confirm `ALLOWED_HOSTS` is set from environment on Render.
- [ ] Confirm `DATABASE_URL` is present and migrations were applied.

## Rollback plan
If an issue appears after the merge:
1. Revert the PR on GitHub (create revert commit).
2. On Render, redeploy previous successful commit.
3. If DB schema changes were applied and are incompatible, revert schema changes and restore DB from backup.

## Notes
- All changes are reversible and low-risk.
- See `docs/deployment/RENDER_AUDIT_Y_CORRECCIONES.md` for full audit and details.

---

Created by automation on 2025-12-10.