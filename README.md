# Blood Bank Connect

## Vercel deployment

Create a Vercel project from this repository with the repository root as the project root. Vercel uses `vercel.json` to build the React client from `client/` and exposes the Express API under `/api`.

Add these environment variables in the Vercel project settings:

- `MONGODB_URI`: your MongoDB connection string
- `CLIENT_URL`: the deployed Vercel URL, such as `https://your-project.vercel.app`
- `VITE_API_URL`: `/api` (optional; this is already the client default)

The MongoDB deployment must allow connections from Vercel. Do not commit `.env`; use `.env.example` as the variable reference.

## Local development

Install dependencies in both workspaces, then run the client and server in separate terminals:

```bash
cd server
npm install
npm run dev
```

```bash
cd client
npm install
npm run dev
```