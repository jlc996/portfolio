# Frontend Developer Portfolio

## Project Overview

This project is a modern **Frontend Developer Portfolio** built with **React and Vite**.

The portfolio is designed as a responsive **Single Page Application (SPA)** that showcases my development skills, projects, professional experience, certifications, technical stack, and contact information.

The application demonstrates modern frontend development practices including:

* Component-based React architecture
* React Router navigation
* Reusable UI components
* React Context API for theme management
* CSS Modules for component-level styling
* Dynamic GitHub repository data
* Custom React hooks
* Responsive layouts
* Organized asset management
* Modular and maintainable CSS
* Web3Forms contact form integration
* Production deployment with Vercel

---

# Live Demo

## Vercel Deployment

🔗 https://joshua-craven-portfolio-gray-seven.vercel.app/

## GitHub Repository

🔗 https://github.com/jlc996/frontend-portfolio

---

# Technologies Used

## Frontend

* React
* Vite
* JavaScript (ES6+)
* HTML5
* CSS3
* CSS Modules
* React Router DOM
* Responsive Web Design

## Development Tools

* Visual Studio Code
* Git
* GitHub
* npm
* Vite Development Server
* Chrome DevTools
* Vercel

## APIs and Services

* GitHub REST API
* Web3Forms

## React Features

* React Context API
* React Hooks
* Custom Hooks
* Dynamic Component Rendering
* Reusable Components
* Conditional Rendering
* Component Composition

---

# Features

## Responsive Portfolio Website

The portfolio is designed to work across:

* Desktop computers
* Laptops
* Tablets
* Mobile devices

Responsive CSS layouts are used throughout the application to provide a consistent experience across different screen sizes.

---

# Single Page Application

The portfolio uses **React Router DOM** for client-side navigation.

Available routes:

```text
/
├── Home
│
├── /projects
│   ├── Project Showcase
│   └── /projects/:id
│       └── Project Details
│
├── /experience
│   └── Experience, Certifications, Skills
│
└── /contact
    └── Contact Form
```

---

# Portfolio Sections

## Home Page

The Home page introduces the developer and provides an overview of the portfolio.

It includes:

* Developer profile
* Professional summary
* Hero section
* Technical highlights
* Metrics
* Technology stack
* Live project demonstrations
* Portfolio introduction

Home page content is supported by centralized data stored in:

```text
src/data/homeData.js
```

---

## Projects Page

The Projects section dynamically retrieves public repositories from the GitHub REST API.

Features include:

* Dynamic project cards
* GitHub repository integration
* Project search
* Search by project name
* Search by description
* Search by programming language
* Search by GitHub topics
* Project detail pages
* GitHub repository links
* Live demo links when available
* Repository statistics
* Loading state
* Error handling

Projects are rendered through reusable React components.

---

## Project Details

Each GitHub repository can have its own project details page.

Project information can include:

* Project name
* Project description
* GitHub topics
* Primary programming language
* Stars
* Forks
* Open issues
* Repository visibility
* Repository size
* Default branch
* License
* Repository creation date
* Last updated date
* GitHub repository link
* Live demo link when available

Project information is retrieved dynamically from GitHub.

---

## Experience Page

The Experience section presents the developer's professional development journey.

It includes:

* Professional experience
* Development journey
* Technical skills
* Certifications
* Completion certificates
* Technical achievements
* Development highlights
* Development timeline

Experience content is separated from presentation logic and stored in:

```text
src/data/experienceData.js
```

The page uses reusable section and card components for each category.

---

## Contact Page

The Contact page provides a professional contact form.

The form includes:

* Name
* Email
* Message
* Client-side validation
* Validation feedback
* Submission status
* Error handling
* Loading state

### Web3Forms Integration

The contact form uses **Web3Forms** to process submissions without requiring a custom backend server.

The Web3Forms access key is provided through a Vite environment variable:

```text
VITE_WEB3FORMS_ACCESS_KEY
```

The access key is not hard-coded into the source code.

---

# Project Architecture

The project follows a modular React architecture that separates pages, reusable components, application state, data, hooks, assets, and styling.

```text
frontend-portfolio/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │   ├── logo.png
│   │   │
│   │   ├── badges/
│   │   │   ├── css-badge.png
│   │   │   ├── html-badge.png
│   │   │   └── javascript-badge.png
│   │   │
│   │   ├── certificates/
│   │   │   ├── html-css-cert.png
│   │   │   └── javascript-cert.png
│   │   │
│   │   └── profile/
│   │       └── profile.png
│   │
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── ThemeToggle.jsx
│   │   │
│   │   ├── contact/
│   │   │   └── ContactForm.jsx
│   │   │
│   │   ├── experience/
│   │   │   ├── CertificationCard.jsx
│   │   │   ├── CertificationSection.jsx
│   │   │   ├── CompletionCertificateCard.jsx
│   │   │   ├── CompletionCertificateSection.jsx
│   │   │   ├── HighlightCard.jsx
│   │   │   ├── HighlightSection.jsx
│   │   │   ├── SkillCard.jsx
│   │   │   ├── SkillsSection.jsx
│   │   │   └── Timeline.jsx
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.jsx
│   │   │   ├── LiveDemo.jsx
│   │   │   ├── MetricCard.jsx
│   │   │   ├── Metrics.jsx
│   │   │   ├── TechCard.jsx
│   │   │   └── TechStack.jsx
│   │   │
│   │   └── projects/
│   │       ├── ErrorMessage.jsx
│   │       ├── LoadingSpinner.jsx
│   │       ├── ProjectCard.jsx
│   │       ├── ProjectTopics.jsx
│   │       ├── SearchBar.jsx
│   │       │
│   │       └── projectDetails/
│   │           ├── ProjectActions.jsx
│   │           ├── ProjectHeader.jsx
│   │           └── ProjectInfoCard.jsx
│   │
│   ├── context/
│   │   └── ThemeContext.jsx
│   │
│   ├── data/
│   │   ├── experienceData.js
│   │   └── homeData.js
│   │
│   ├── hooks/
│   │   └── useFetch.js
│   │
│   ├── pages/
│   │   ├── Contact.jsx
│   │   ├── Experience.jsx
│   │   ├── Home.jsx
│   │   ├── ProjectDetails.jsx
│   │   └── Projects.jsx
│   │
│   ├── styles/
│   │   ├── App.css
│   │   ├── Footer.css
│   │   ├── Navbar.css
│   │   ├── Theme.css
│   │   │
│   │   ├── contact/
│   │   │   └── ContactForm.module.css
│   │   │
│   │   ├── experience/
│   │   │   ├── CertificationCard.module.css
│   │   │   ├── CertificationSection.module.css
│   │   │   ├── CompletionCertificateCard.module.css
│   │   │   ├── CompletionCertificateSection.module.css
│   │   │   ├── HighlightCard.module.css
│   │   │   ├── HighlightSection.module.css
│   │   │   ├── SkillCard.module.css
│   │   │   ├── SkillsSection.module.css
│   │   │   └── Timeline.module.css
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.module.css
│   │   │   ├── LiveDemo.module.css
│   │   │   ├── MetricCard.module.css
│   │   │   ├── Metrics.module.css
│   │   │   ├── TechCard.module.css
│   │   │   └── TechStack.module.css
│   │   │
│   │   ├── pages/
│   │   │   ├── Contact.module.css
│   │   │   ├── Experience.module.css
│   │   │   ├── Home.module.css
│   │   │   ├── ProjectDetails.module.css
│   │   │   └── Projects.module.css
│   │   │
│   │   └── projects/
│   │       ├── ProjectCard.module.css
│   │       ├── ProjectTopics.module.css
│   │       ├── SearchBar.module.css
│   │       │
│   │       └── projectDetails/
│   │           ├── ProjectActions.module.css
│   │           ├── ProjectHeader.module.css
│   │           └── ProjectInfoCard.module.css
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── oxlintrc.json
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

# React Component Architecture

The application follows a reusable, component-based architecture.

Pages are responsible for composing larger sections, while reusable components handle individual pieces of functionality and presentation.

General structure:

```text
Page
 │
 ├── Section Component
 │      │
 │      └── Card Component
 │
 └── Supporting Components
```

This structure keeps components focused and allows individual sections to be maintained independently.

---

## Home Component Architecture

```text
Home.jsx
 │
 ├── Hero.jsx
 │
 ├── LiveDemo.jsx
 │
 ├── Metrics.jsx
 │      └── MetricCard.jsx
 │
 └── TechStack.jsx
        └── TechCard.jsx
```

Home content is supported by:

```text
src/data/homeData.js
```

---

## Projects Component Architecture

```text
Projects.jsx
 │
 ├── SearchBar.jsx
 │
 ├── LoadingSpinner.jsx
 │
 ├── ErrorMessage.jsx
 │
 └── ProjectCard.jsx
        └── ProjectTopics.jsx
```

Project details are handled through a dedicated page:

```text
ProjectDetails.jsx
 │
 ├── ProjectHeader.jsx
 │      └── ProjectTopics.jsx
 │
 ├── ProjectInfoCard.jsx
 │
 └── ProjectActions.jsx
```

Project detail components are organized under:

```text
src/components/projects/projectDetails/
```

---

## Experience Component Architecture

```text
Experience.jsx
 │
 ├── SkillsSection.jsx
 │      └── SkillCard.jsx
 │
 ├── CertificationSection.jsx
 │      └── CertificationCard.jsx
 │
 ├── CompletionCertificateSection.jsx
 │      └── CompletionCertificateCard.jsx
 │
 ├── Timeline.jsx
 │
 └── HighlightSection.jsx
        └── HighlightCard.jsx
```

Experience content is stored separately in:

```text
src/data/experienceData.js
```

This separates data from presentation logic.

---

## Contact Component Architecture

```text
Contact.jsx
 │
 └── ContactForm.jsx
```

The contact form is isolated as a dedicated component with its own CSS Module.

---

## Shared Components

Site-wide components are located directly inside:

```text
src/components/
```

These include:

```text
Footer.jsx
Navbar.jsx
ThemeToggle.jsx
```

They provide shared functionality across the portfolio.

---

# CSS Architecture

The project uses a combination of global CSS files and **CSS Modules**.

The styling structure mirrors the organization of the React components and pages.

---

## Global Styles

Global styles are located directly inside:

```text
src/styles/
```

These include:

```text
App.css
Footer.css
Navbar.css
Theme.css
```

The main global stylesheet is:

```text
src/index.css
```

Global styles are used for application-wide styling, shared layout rules, navigation, footer styling, and theme functionality.

---

## Page CSS Modules

Each page has its own CSS Module:

```text
src/styles/pages/
│
├── Contact.module.css
├── Experience.module.css
├── Home.module.css
├── ProjectDetails.module.css
└── Projects.module.css
```

This keeps page-specific styling isolated and prevents unnecessary global CSS conflicts.

---

## Contact CSS Modules

```text
src/styles/contact/
└── ContactForm.module.css
```

The Contact Form uses its own locally scoped CSS Module.

---

## Experience CSS Modules

```text
src/styles/experience/
│
├── CertificationCard.module.css
├── CertificationSection.module.css
├── CompletionCertificateCard.module.css
├── CompletionCertificateSection.module.css
├── HighlightCard.module.css
├── HighlightSection.module.css
├── SkillCard.module.css
├── SkillsSection.module.css
└── Timeline.module.css
```

Each Experience component has a corresponding CSS Module.

---

## Home CSS Modules

```text
src/styles/home/
│
├── Hero.module.css
├── LiveDemo.module.css
├── MetricCard.module.css
├── Metrics.module.css
├── TechCard.module.css
└── TechStack.module.css
```

This mirrors the Home component structure.

---

## Projects CSS Modules

```text
src/styles/projects/
│
├── ProjectCard.module.css
├── ProjectTopics.module.css
├── SearchBar.module.css
│
└── projectDetails/
    ├── ProjectActions.module.css
    ├── ProjectHeader.module.css
    └── ProjectInfoCard.module.css
```

Project detail styles are kept in their own nested directory to mirror the component structure.

---

# Data Management

Portfolio content is separated from presentation logic through dedicated data files.

```text
src/data/
│
├── experienceData.js
└── homeData.js
```

## Home Data

`homeData.js` contains data used throughout the Home page.

This allows Home components to focus on rendering rather than storing large amounts of static content directly inside the JSX.

---

## Experience Data

`experienceData.js` contains experience-related information such as:

* Professional experience
* Certifications
* Completion certificates
* Technical skills
* Highlights
* Timeline information

Separating data from presentation provides:

* Cleaner components
* Easier content updates
* Improved organization
* Separation of concerns
* Reusable data structures

---

# GitHub API Integration

The Projects page uses the GitHub REST API to retrieve repository information.

API endpoint:

```text
https://api.github.com/users/jlc996/repos
```

The custom `useFetch` hook manages:

* API requests
* Loading state
* Error handling
* Retrieved data

The retrieved repository information is passed into reusable project components.

This allows the portfolio to dynamically reflect changes made to public GitHub repositories.

---

# Custom Hooks

Reusable application logic is separated into custom hooks.

```text
src/hooks/useFetch.js
```

The `useFetch` hook is responsible for handling data-fetching operations and managing:

* API requests
* Loading state
* Error state
* Retrieved data

Separating API logic from UI components keeps components focused on presentation.

---

# Theme System

The portfolio includes a custom theme system using the React Context API.

Implementation:

```text
src/context/ThemeContext.jsx
```

The theme system provides:

* Light mode
* Dark mode
* Global theme state
* Theme toggle functionality
* Shared theme behavior

Theme styling is managed through:

```text
src/styles/Theme.css
```

The `ThemeToggle.jsx` component provides the interface for switching between themes.

The Context API allows theme state to be accessed by components throughout the application without passing theme props through multiple levels of the component tree.

---

# Contact Form Management

The portfolio uses **Web3Forms** to process contact form submissions.

The form performs client-side validation before submitting the request.

Validation includes:

* Required name
* Minimum name length
* Valid email format
* Required message
* Minimum message length
* Submission status
* Error handling
* Loading state

The Web3Forms access key is provided through an environment variable:

```text
VITE_WEB3FORMS_ACCESS_KEY
```

This prevents the access key from being directly stored in the source code.

---

# Environment Variables

Create a local `.env` file in the project root for development:

```text
VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
```

Replace the placeholder with your Web3Forms access key.

Do not commit `.env` files containing private configuration values to GitHub.

For production deployment, configure the environment variable through the hosting provider.

---

# Vercel Deployment

The production portfolio is deployed using **Vercel**.

Production deployment:

```text
https://joshua-craven-portfolio-gray-seven.vercel.app/
```

The project is built using:

```bash
npm run build
```

The production build generates the optimized application used for deployment.

Typical deployment workflow:

```text
GitHub Repository
       |
       ↓
     Vercel
       |
       ↓
Production Build
       |
       ↓
Live Portfolio
```

# Asset Management

Portfolio images and resources are organized inside:

```text
src/assets/
```

The asset structure includes:

```text
assets/
│
├── logo.png
│
├── badges/
│   ├── css-badge.png
│   ├── html-badge.png
│   └── javascript-badge.png
│
├── certificates/
│   ├── html-css-cert.png
│   └── javascript-cert.png
│
└── profile/
    └── profile.png
```

Assets are grouped by purpose to make them easier to locate and maintain.

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/jlc996/frontend-portfolio.git
```

---

## Navigate Into Project

```bash
cd frontend-portfolio
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file in the project root:

```text
VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
```

Replace the placeholder with your Web3Forms access key.

---

## Start Development Server

```bash
npm run dev
```

The application will run locally using the Vite development server.

---

# Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

# Production Testing & Self-Audit

The production build was tested to verify application stability and expected React rendering behavior.

## Self-Audit Results

* **Console Errors:** 0 observed
* **Infinite Re-render Loops:** 0 observed
* **Production Build:** Verified
* **Application Navigation:** Verified
* **React Component Rendering:** Verified
* **Interactive Features:** Tested during production testing

## Verification Confirmation

I confirm that the production version of the portfolio was tested and that no console errors or infinite React re-render loops were observed during the testing process.

**Audit Status:** ✅ Passed

**Verification Date:** August 4, 2026

**Verified By:** Joshua Craven

---

# Development Practices

This project follows modern frontend development practices including:

* Component-driven development
* Separation of concerns
* Reusable components
* CSS Modules
* Data-driven rendering
* Custom React hooks
* React Context API
* Responsive design
* GitHub API integration
* Client-side validation
* Environment variable management
* Organized asset structure
* Version control with Git
* GitHub integration
* Vercel deployment
* Production testing
* Self-auditing

The project structure is designed to keep presentation, data, application logic, and reusable components separated.

---

# AI Use Disclaimer

AI-assisted development tools were used during the development and troubleshooting of this portfolio.

AI assistance was used as a development support tool for tasks such as:

* Troubleshooting errors
* Explaining programming concepts
* Reviewing code structure
* Identifying potential implementation issues
* Suggesting improvements
* Assisting with documentation
* Assisting with deployment troubleshooting
* Supporting development workflow questions

All generated suggestions were reviewed, tested, modified, and integrated as appropriate.

The project remains the responsibility of the developer, including the final implementation, design decisions, code integration, testing, debugging, and deployment.

AI assistance does not replace the developer's understanding of the technologies used in this project.

---

# Future Improvements

Possible future enhancements include:

* Backend contact form integration
* CMS-powered project management
* Additional animations
* Improved accessibility features
* Blog section
* Additional interactive project demonstrations
* Expanded project filtering
* Performance optimization
* Automated testing

---

# Author

**Joshua Craven**

Frontend Developer

GitHub:

https://github.com/jlc996

Portfolio:

https://joshua-craven-portfolio-gray-seven.vercel.app/

---

# License

This project is for educational and portfolio purposes.
#   p o r t f o l i o  
 