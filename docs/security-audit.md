
# Security Audit

**Project:** Joshua Craven Fullstack Portfolio  
**Audit date:** October 3, 2026  
**Scope:** Backend authentication, authorization, validation, configuration, and error handling.

## Security Checklist

| # | Security Check | Status | Evidence |
|---|---|---|---|
| 1 | Password hashing | PASS — code reviewed | `server/src/controllers/authController.js` uses `bcrypt.hash(password, 12)`. |
| 2 | JWT authentication | PASS — code reviewed | `server/src/middleware/requireAuth.js` verifies JWTs, loads the user, checks account status, and validates token version. |
| 3 | Admin authorization | PASS — code reviewed | `server/src/routes/projectRoutes.js` protects create, update, and delete routes with `requireAuth` and `requireRole('admin')`. |
| 4 | Request validation | PASS — code reviewed | Zod validation middleware is applied to registration, login, and project create/update requests. |
| 5 | HTTP security headers | PASS — code reviewed | `server/src/app.js` applies `helmet()` before registering routes. |
| 6 | MongoDB filter sanitization | PASS — code reviewed | `server/src/app.js` configures `mongoose.set('sanitizeFilter', true)`. |
| 7 | Login rate limiting | CONFIGURED — runtime test pending | `server/src/middleware/rateLimiter.js` sets a limit of five attempts per 15 minutes. Verify that a sixth attempt receives HTTP 429. |
| 8 | CORS configuration | CONFIGURED — production test pending | `server/src/app.js` configures CORS using `CLIENT_URL`. Verify that the deployed frontend is allowed and an unauthorized origin is rejected by the browser. |
| 9 | Environment secrets | PASS — ignore rules verified | `server/.env` is ignored by Git, while `server/.env.example` is not ignored. Example values must remain placeholders. |
| 10 | Error handling | PASS — code reviewed | `server/src/middleware/errorHandler.js` handles duplicate-key, validation, and invalid-ID errors and returns a generic response for unexpected server errors. |

## Findings

### Verified from Code Review

- Passwords are hashed before storage.
- Login errors use a generic invalid-credentials message.
- JWTs are configured to expire after one hour.
- User responses omit `passwordHash` through the user model's JSON transformation.
- Registration does not accept a user-supplied role.
- Project create, update, and delete routes require an authenticated admin.
- Zod validation middleware validates supported request bodies.
- Helmet and Mongoose filter sanitization are configured.
- Git ignore rules exclude the real server environment file.

### Tests Still to Complete

- [ ] Submit six login attempts within the rate-limit window and verify the sixth receives HTTP 429.
- [ ] Test production CORS from the deployed frontend and with an unauthorized origin.
- [ ] Verify unauthenticated project mutations return HTTP 401.
- [ ] Verify authenticated non-admin project mutations return HTTP 403.
- [ ] Verify invalid request bodies return HTTP 400.
- [ ] Confirm `.env.example` contains placeholders only and no real credentials.
- [ ] Review the project ID counter and seed script.
- [ ] Verify no secrets are tracked in Git history.

## Limitations and Follow-Up

This audit records code-review findings and configuration checks. A PASS based on code review does not mean the behavior has been independently tested in a live environment.

Any pending test should be marked complete only after its result has been observed and recorded. Document any failed checks and the corrective action taken.

## Audit Conclusion

The reviewed backend code includes several core security controls for authentication, authorization, input validation, and error handling. Runtime testing and the remaining checklist items must be completed before the audit can be considered final.