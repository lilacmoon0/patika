# Backend Deployment Guide - Render

## 🚀 Deployment Steps

### Prerequisites
1. Push your backend code to GitHub
2. Create a [Render account](https://render.com)

### Deployment Process

#### 1. Anonymous Chat Backend (project-1/backend)
```bash
# Service Name: anonymous-chat-backend
# Build Command: npm install
# Start Command: npm start
# Branch: main
# Root Directory: 3-front-end-advanced/Projects/second-level/project-1/backend
```

#### 2. Votes GraphQL Server (GraphQl/project-3/server)
```bash
# Service Name: votes-graphql-server
# Build Command: npm install
# Start Command: npm start
# Branch: main
# Root Directory: 3-front-end-advanced/GraphQl/project-3/server
```

#### 3. Chat GraphQL Server (GraphQl/project-4/server)
```bash
# Service Name: chat-graphql-server
# Build Command: npm install
# Start Command: npm start
# Branch: main
# Root Directory: 3-front-end-advanced/GraphQl/project-4/server
```

## 🔧 Frontend Configuration Updates

Once deployed, you'll get URLs like:
- `https://anonymous-chat-backend.onrender.com`
- `https://votes-graphql-server.onrender.com`
- `https://chat-graphql-server.onrender.com`

### Update your frontend clients:

#### For Socket.IO (project-1/client):
```javascript
// Replace localhost with your deployed URL
const socket = io('https://anonymous-chat-backend.onrender.com');
```

#### For GraphQL (project-3 & project-4 clients):
```javascript
// Replace localhost with your deployed URL
const httpLink = new HttpLink({
  uri: 'https://votes-graphql-server.onrender.com/graphql'
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'wss://votes-graphql-server.onrender.com/graphql'
}));
```

## ⚠️ Important Notes

1. **Free Tier Limitations:**
   - Services sleep after 15 minutes of inactivity
   - First request after sleep takes ~30 seconds
   - 750 hours/month limit

2. **Environment Variables:**
   - All set to production automatically
   - PORT is provided by Render

3. **CORS Configuration:**
   - Already updated to allow GitHub Pages

## 🚀 Quick Deploy Steps

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Use the root directory paths above
5. Deploy!

Your backends will be live in ~2-3 minutes!
