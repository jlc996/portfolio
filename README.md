# Joshua Craven \| Fullstack Developer Portfolio

A fullstack developer portfolio built to showcase my projects, technical
skills, experience, certifications, and contact information. The
application combines a React frontend with an Express REST API and
MongoDB persistence, including authentication and an admin dashboard for
managing portfolio projects.

## Live Portfolio

**Vercel:** https://joshua-craven-portfolio.vercel.app/

**Render:** https://fullstack-portfolio-api-txrn.onrender.com/

**GitHub:** https://github.com/jlc996/portfolio

## Features

-   Responsive portfolio interface built with React and Vite
-   Client-side navigation with React Router
-   Project listing and individual project detail pages
-   REST API built with Node.js and Express
-   MongoDB database integration through Mongoose
-   JWT-based authentication
-   Role-based authorization for admin-only actions
-   Protected admin dashboard
-   Create, read, update, and delete (CRUD) operations for projects
-   Request validation with Zod
-   Password hashing with bcrypt
-   Security middleware with Helmet and login rate limiting
-   Light and dark theme support
-   Contact form integration
-   Separate frontend and backend deployments

## Technology Stack

### Frontend

-   React
-   Vite
-   JavaScript (ES6+)
-   React Router DOM
-   CSS
-   React Context API

### Backend

-   Node.js
-   Express
-   MongoDB Atlas
-   Mongoose
-   JSON Web Tokens (JWT)
-   bcrypt
-   Zod
-   Helmet
-   express-rate-limit
-   CORS

### Tools and Hosting

-   Git and GitHub
-   npm
-   Visual Studio Code
-   Vercel for the frontend
-   Render for the backend
-   MongoDB Atlas for the database
-   Postman for API testing

## Project Structure

``` text
portfolio/
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── docs/
├── server/
│   ├── scripts/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── validation/
│   └── package.json
├── .gitignore
├── README.md
└── vercel.json
```

Some files may be added or renamed as the project evolves.

## Application Routes

  Route               Purpose
  ------------------- ---------------------------------------------
  `/`                 Home page
  `/projects`         Browse portfolio projects
  `/projects/:id`     View an individual project
  `/experience`       View experience and qualifications
  `/contact`          Contact page
  `/login`            Sign in to the portfolio
  `/admin`            Redirect to the project administration page
  `/admin/projects`   Protected project management dashboard

Administrative pages and write operations require an authenticated
administrator account.

## API Overview

The backend exposes a REST API. The local API base URL is typically
`http://localhost:5000`; the deployed base URL is configured through
environment variables.

  ---------------------------------------------------------------------------
  Method            Endpoint              Purpose           Access
  ----------------- --------------------- ----------------- -----------------
  `GET`             `/api/health`         Check that the    Public
                                          API is running    

  `GET`             `/api/projects`       List projects     Public

  `GET`             `/api/projects/:id`   Get a project by  Public
                                          its ID            

  `POST`            `/api/projects`       Create a project  Admin

  `PATCH`           `/api/projects/:id`   Update a project  Admin

  `DELETE`          `/api/projects/:id`   Delete a project  Admin

  `POST`            `/api/auth/login`     Sign in and       Public
                                          receive an        
                                          authentication    
                                          token             
  ---------------------------------------------------------------------------

Protected API requests use a bearer token in the `Authorization` header:

``` http
Authorization: Bearer YOUR_JWT_TOKEN
```

The backend may return standard HTTP status codes such as `200`, `201`,
`400`, `401`, `403`, and `404`, depending on the result of a request.

## Getting Started

### Prerequisites

Install the following before running the project locally:

-   Node.js and npm
-   A MongoDB database, such as a MongoDB Atlas cluster
-   Git
-   An API client such as Postman (optional, for testing endpoints)

### 1. Clone the repository

Clone the fullstack portfolio repository from its GitHub page, then
enter the project directory:

``` bash
git clone https://github.com/jlc996/portfolio.git
cd portfolio
```

### 2. Install frontend dependencies

``` bash
cd client
npm install
```

Create a `client/.env` file for local frontend environment variables:

``` dotenv
VITE_API_URL=http://localhost:5000
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
```

`VITE_API_URL` tells the frontend where to find the backend API. The
Web3Forms key is only needed if the contact form uses that service. Vite
exposes variables prefixed with `VITE_` to frontend code, so do not put
server secrets in this file.

Start the frontend development server:

``` bash
npm run dev
```

Vite normally serves the local frontend at `http://localhost:5173`.

### 3. Install backend dependencies

Open a separate terminal from the repository root:

``` bash
cd server
npm install
```

Create a `server/.env` file with the backend configuration:

``` dotenv
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

Use your own values. Do not commit `.env` files, database credentials,
JWT secrets, or administrator passwords to GitHub.

### 4. Start the backend

Use the start script defined in `server/package.json`. If a development
script is configured, run:

``` bash
npm run dev
```

If the project does not define a `dev` script, check the entry-point
filename in `server/package.json` and start the server using the
appropriate Node command. The API should be available at
`http://localhost:5000` when configured with the example `PORT`.

Check the health endpoint in a browser or Postman:

``` text
GET http://localhost:5000/api/health
```

The endpoint should return a message indicating that the Portfolio API
is running.

### 5. Seed initial data (if configured)

The project includes a server seed script for creating sample projects
and an administrator account. From the `server` directory, run the seed
command configured in `server/package.json`:

``` bash
npm run seed
```

Only run the seed script when appropriate for your database. Confirm
what the script changes before running it against a database containing
data you want to keep. Use secure credentials for the administrator
account.

## Environment Variables

### Frontend (`client/.env`)

  -----------------------------------------------------------------------
  Variable                            Purpose
  ----------------------------------- -----------------------------------
  `VITE_API_URL`                      Base URL of the backend API

  `VITE_WEB3FORMS_ACCESS_KEY`         Contact form access key, if
                                      Web3Forms is enabled
  -----------------------------------------------------------------------

### Backend (`server/.env`)

  -----------------------------------------------------------------------
  Variable                            Purpose
  ----------------------------------- -----------------------------------
  `PORT`                              Port the Express server listens on

  `MONGODB_URI`                       MongoDB connection string

  `JWT_SECRET`                        Secret used to sign and verify JWTs

  `CLIENT_URL`                        Allowed frontend origin for CORS

  `NODE_ENV`                          Runtime environment, such as
                                      `development` or `production`

  `ADMIN_EMAIL`                       Administrator email used by the
                                      seed process, if supported

  `ADMIN_PASSWORD`                    Administrator password used by the
                                      seed process, if supported
  -----------------------------------------------------------------------

The exact variables consumed by each script depend on the
implementation. Keep local `.env` files out of version control and
configure production values in the hosting provider's
environment-variable settings.

## Deployment

### Frontend --- Vercel

The frontend is deployed to Vercel.

1.  Import the repository into Vercel.
2.  Set the project root directory to `client`.
3.  Use the build command `npm run build`.
4.  Set the output directory to `dist`.
5.  Configure `VITE_API_URL` to the deployed backend API base URL.
6.  If the contact form requires it, configure
    `VITE_WEB3FORMS_ACCESS_KEY`.
7.  Redeploy after changing environment variables.

### Backend --- Render

The backend is deployed to Render.

1.  Create a web service connected to the repository.
2.  Configure the service's root directory and start command to match
    the backend layout and `server/package.json`.
3.  Add the backend environment variables listed above.
4. Set `CLIENT_URL` to the deployed frontend origin:
       `https://joshua-craven-portfolio.vercel.app`.
5.  Confirm that the Render service can connect to MongoDB Atlas.
6.  Test the `/api/health` endpoint after deployment.

### Database --- MongoDB Atlas

The application uses MongoDB for persistent project and user data.

-   Store the connection string in `MONGODB_URI`.
-   Configure Atlas network access to allow connections from the backend
    hosting environment.
-   Use a database user with only the permissions required by the
    application.
-   Never place database credentials in frontend variables or commit
    them to the repository.

## Security Notes

-   Passwords should be stored as hashes, not as plaintext.
-   JWTs should be signed with a strong, private `JWT_SECRET`.
-   Admin-only API routes must enforce authentication and role
    authorization on the server.
-   Validate incoming project data before writing to the database.
-   Keep dependencies and runtime versions up to date.
-   Do not expose server secrets through frontend environment variables.
-   Use HTTPS for deployed services.
-   Do not commit `.env` files or real credentials.

## Testing

The API can be tested with Postman or another HTTP client.

Suggested checks:

1.  Request `GET /api/health`.
2.  Request `GET /api/projects` without signing in.
3.  Sign in through `POST /api/auth/login`.
4.  Use the returned token as a bearer token for admin-only project
    requests.
5.  Create a temporary project, update it, and delete it.
6.  Confirm that public project pages reflect the changes.
7.  Test protected pages while logged out and while signed in as a
    non-admin account, if such an account is available.

Use a test database or temporary records for destructive tests.

## Future Improvements

Potential areas for continued development include:

-   Automated frontend and backend tests
-   API documentation
-   Improved accessibility audits
-   More detailed loading, empty, and error states
-   Additional project filtering and search
-   Monitoring and structured server logging

## AI Use Disclaimer

AI tools may be used as development aids for brainstorming, debugging,
explaining code, and improving documentation. The application code,
testing, integration, and final project decisions are reviewed and
completed as part of the development process.

## Author

**Joshua Craven**

-   Portfolio: https://joshua-craven-portfolio.vercel.app/
-   GitHub: https://github.com/jlc996

## License

This project is intended for educational and portfolio purposes. Contact
the author before reusing substantial portions of the project.
