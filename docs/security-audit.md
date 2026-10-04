# Security Audit

**Project:** Joshua Craven Fullstack Portfolio

**Audit date:** October 4, 2026

**Scope:** Backend authentication, authorization, validation, configuration, error handling, and production response headers.

## Security Checklist

| #  | Security Check              | Status                                                   | Evidence                                                                                                                                                                                                                                                                                                                                                                           |
| -- | --------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1  | Password hashing            | PASS — code reviewed                                     | `server/src/controllers/authController.js` uses `bcrypt.hash(password, 12)`.                                                                                                                                                                                                                                                                                                       |
| 2  | JWT authentication          | PASS — code reviewed                                     | `server/src/middleware/requireAuth.js` verifies JWTs, loads the user, checks account status, and validates token version.                                                                                                                                                                                                                                                          |
| 3  | Admin authorization         | PASS — code reviewed                                     | `server/src/routes/projectRoutes.js` protects create, update, and delete routes with `requireAuth` and `requireRole('admin')`.                                                                                                                                                                                                                                                     |
| 4  | Request validation          | PASS — code reviewed                                     | Zod validation middleware is applied to registration, login, and project create/update requests.                                                                                                                                                                                                                                                                                   |
| 5  | HTTP security headers       | PASS — code reviewed and production headers observed     | `server/src/server.js` applies `helmet()` before registering routes. Production responses included Helmet security headers.                                                                                                                                                                                                                                                        |
| 6  | MongoDB filter sanitization | PASS — code reviewed                                     | `server/src/server.js` configures `mongoose.set('sanitizeFilter', true)`.                                                                                                                                                                                                                                                                                                          |
| 7  | Login rate limiting         | PASS — runtime tested                                    | `server/src/middleware/rateLimiter.js` sets a limit of five attempts per 15 minutes. Testing confirmed that a request after the limit was exhausted returned HTTP 429. Response headers included `RateLimit-Limit`, `RateLimit-Remaining`, and `RateLimit-Reset`.                                                                                                                  |
| 8  | CORS configuration          | PASS — production headers and browser enforcement tested | `server/src/server.js` configures CORS using `CLIENT_URL`. The deployed Vercel origin received the expected `Access-Control-Allow-Origin` header. A request from an unauthorized origin did not receive permission for that origin. Browser testing from `http://localhost:8080` confirmed that JavaScript from the unauthorized origin was blocked from reading the API response. |
| 9  | Environment secrets         | PASS — ignore rules and example reviewed                 | `server/.env` is ignored by Git, while `server/.env.example` is not ignored. The reviewed example contains placeholder values rather than actual credentials.                                                                                                                                                                                                                      |
| 10 | Error handling              | PASS — code reviewed                                     | `server/src/middleware/errorHandler.js` handles duplicate-key, validation, and invalid-ID errors and returns a generic response for unexpected server errors.                                                                                                                                                                                                                      |

## Findings

### Verified from Code Review

* Passwords are hashed before storage.
* Login errors use a generic invalid-credentials message.
* JWTs are configured to expire after one hour.
* User responses omit `passwordHash` through the user model's JSON transformation.
* Registration does not accept a user-supplied role.
* Project create, update, and delete routes require an authenticated admin.
* Zod validation middleware validates supported request bodies.
* Helmet and Mongoose filter sanitization are configured.
* Git ignore rules exclude the real server environment file.
* The login rate limiter is configured for five attempts per 15-minute window.

### Verified Through Runtime Testing

* [x] Login rate limiting: a request after the limit was exhausted returned HTTP 429.
* [x] Rate-limit response headers were observed.
* [x] Production API health endpoint returned HTTP 200.
* [x] The deployed Vercel frontend origin received the expected CORS response header.
* [x] A request with an unauthorized origin did not receive an `Access-Control-Allow-Origin` value matching that unauthorized origin.
* [x] Production API responses included security headers.
* [x] Browser-level CORS enforcement was verified by attempting to access the production API from an unauthorized origin at `http://localhost:8080`. The browser blocked JavaScript from reading the API response.
* [x] Unauthenticated project mutations return HTTP 401.
* [x] Authenticated non-admin project mutations return HTTP 403.
* [x] Invalid request bodies return HTTP 400.
* [x] The project ID counter and seed script were reviewed.
* [x] Git history was checked for tracked secrets.

## Environment Configuration

The reviewed `server/.env.example` contains the following configuration keys:

* `PORT`
* `MONGODB_URI`
* `JWT_SECRET`
* `CLIENT_URL`
* `NODE_ENV`
* `ADMIN_EMAIL`
* `ADMIN_PASSWORD`

The example uses placeholder values. The local example specifies `CLIENT_URL=http://localhost:5173`, which is appropriate for local development. The deployed Render service was separately checked and its `CLIENT_URL` matches the deployed Vercel frontend URL.

Actual credentials must remain in environment configuration and must not be committed to Git.

## Limitations and Follow-Up

This audit records code-review findings, configuration checks, and observed runtime results. A PASS based on code review does not mean that the behavior has been independently tested in every environment.

The rate limiter was tested against the local API. Production CORS response headers were tested against the deployed API using `curl.exe`. Browser-level CORS enforcement was independently verified using a local test page served from `http://localhost:8080`. The browser blocked the unauthorized origin from reading the API response while the API itself returned HTTP 200.

The Git ignore rules and environment example were reviewed, and the Git history was checked for tracked secrets.

All tests within the current audit scope have been completed and documented. Future security changes or new deployment environments should be evaluated separately.

## Audit Conclusion

The reviewed backend includes core security controls for authentication, authorization, request validation, HTTP security headers, MongoDB filter sanitization, rate limiting, environment configuration, and error handling.

The login rate limiter passed runtime verification, production CORS response headers were checked for both the deployed frontend origin and an unauthorized origin, and browser-level CORS enforcement was independently verified. Authorization, validation, project ID counter, seed-script, and Git-history checks were also completed.

The security audit is **fully verified based on the documented code-review, configuration, and runtime tests**. No outstanding tests remain from the current audit scope.
