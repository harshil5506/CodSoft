# HYPERFIT Deployment Guide

This guide explains how to deploy the HYPERFIT platform to production environments.

## Database (MongoDB Atlas)
1. Register at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new free-tier Shared Cluster.
3. Add a database user with password credentials.
4. Set IP whitelist access control to `0.0.0.0/0` (allow all connections) or configure specific cloud provider ranges.
5. Copy the connection string (URI) to your production backend environment variables.

---

## Backend Deployment (Render or Railway)
Deploy the Node.js/Express application to cloud hosting platforms.

1. Create a repository on GitHub containing your project source code.
2. Sign in to your preferred hosting platform (e.g., [Render](https://render.com) or [Railway](https://railway.app)).
3. Select "New Web Service" and link your GitHub repository.
4. Set the root directory of the web service to `backend`.
5. Configure the following build & start command parameters:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add all required production environment variables:
   - `PORT=80` (or leave default provided by host)
   - `NODE_ENV=production`
   - `MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/hyperfit`
   - `JWT_SECRET=production_secret_key_change_me`
   - `JWT_EXPIRE=30d
   - `CLIENT_URL=https://your-frontend-deployment.vercel.app`

---

## Frontend Deployment (Vercel or Netlify)
Deploy the static React + Vite client-side code build.

1. Sign in to [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com).
2. Select "New Project" and link the repository.
3. In Build & Development settings, configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Set environmental variables:
   - `VITE_API_URL=https://your-backend-deployment-url.onrender.com/api`
5. Click **Deploy**. Vercel/Netlify will build the production bundle and assign a public URL.
