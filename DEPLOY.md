Deployment instructions
=======================

Quick overview
--------------
- This repo contains a Vite React frontend in `app/` and an Express backend in `backend/`.
- The included `Dockerfile` builds the frontend and runs the backend which serves the built files.
- Use `docker-compose.yml` for a simple local deployment (maps port 3001).

Run locally with Docker Compose
------------------------------
1. Create a `.env` in `backend/` (or set environment variables) with at minimum:

   - `GMAIL_USER` / `GMAIL_PASS` (or `EMAIL_USER` / `EMAIL_PASS`)
   - `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`

2. Start:

```bash
docker-compose up --build
```

Manual local build (no Docker)
-----------------------------
1. Build frontend:

```bash
cd app
npm ci
npm run build
```

2. Start backend (ensure `backend/.env` exists):

```bash
cd ../backend
npm ci
node server.js
```

GitHub Actions — build & push Docker image
-----------------------------------------
- A workflow (`.github/workflows/ci-build-and-push.yml`) is provided that builds the frontend, builds a Docker image, and pushes it to GitHub Container Registry (GHCR).
- The workflow runs on pushes to `main`. It uses the default `GITHUB_TOKEN` for authentication to GHCR.

Heroku automatic deploy (optional)
--------------------------------
- The GitHub Actions workflow includes an optional step to deploy to Heroku using Docker.
- To enable this, add the following repository secrets in GitHub: `HEROKU_API_KEY` (your Heroku API key) and `HEROKU_APP_NAME` (the app name).
- When both secrets are present the workflow will build and push the Docker image to Heroku Container Registry and release it.

Deploy to Heroku (optional)
---------------------------
You can deploy the Docker image to Heroku Container Registry manually or via CI.

Commands:

```bash
# login (use HEROKU_API_KEY as password)
docker login --username=_ --password=$HEROKU_API_KEY registry.heroku.com

# build and tag
docker build -t registry.heroku.com/<HEROKU_APP_NAME>/web .

# push and release
docker push registry.heroku.com/<HEROKU_APP_NAME>/web
heroku container:release web --app <HEROKU_APP_NAME>
```

Notes & Troubleshooting
-----------------------
- Ensure SMTP credentials are App Passwords (Gmail) if using Gmail.
- The backend serves the frontend from `app/dist` when present; the Docker image copies the built frontend into `/client`.
- If you need automated deployments to other providers (AWS ECS, Azure Web Apps, Railway), I can add workflows for those targets.
