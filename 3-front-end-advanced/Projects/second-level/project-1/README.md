# Anonymous Chat App

A real-time anonymous chat application built with Node.js, Socket.IO, and React.

## Features

- **Anonymous Chat**: Users are automatically assigned random anonymous names (e.g., "HappyCat123")
- **Single Global Room**: All users join the same chat room automatically
- **Real-time Messaging**: Instant message delivery using Socket.IO
- **Typing Indicators**: See when other users are typing
- **User Count**: Live count of online users
- **Responsive Design**: Works on desktop and mobile devices
- **Connection Status**: Visual indicator of connection status

## Project Structure

```
project-1/
├── backend/                 # Node.js + Socket.IO server
│   ├── package.json
│   └── server.js
└── client/                  # React frontend
    ├── package.json
    ├── public/
    └── src/
        ├── App.js
        ├── App.css
        ├── Chat.js
        └── Chat.css
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
   
   The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```
   
   The app will open in your browser at `http://localhost:3000`

## Usage

1. Open your browser and go to `http://localhost:3000`
2. You'll be automatically assigned an anonymous name
3. Start chatting! All users are in the same global chat room
4. You can see:
   - Your own messages on the right (blue background)
   - Other users' messages on the left (white background)
   - System messages in the center (orange background)
   - Typing indicators when someone is typing
   - Live user count in the sidebar

## Technical Details

### Backend (Node.js + Socket.IO)

- **Express.js**: Web server framework
- **Socket.IO**: Real-time bidirectional communication
- **CORS**: Cross-origin resource sharing support
- **Anonymous Name Generation**: Random combinations of adjectives + animals + numbers

### Frontend (React)

- **React Hooks**: Modern React with useState, useEffect, useRef
- **Socket.IO Client**: Real-time communication with the server
- **Responsive CSS**: Mobile-friendly design
- **Auto-scroll**: Messages automatically scroll to bottom

### Key Socket Events

- `connect/disconnect`: Connection status
- `anonymous-name`: Receive assigned anonymous name
- `room-joined`: Join the global chat room
- `send-message/receive-message`: Send and receive chat messages
- `user-joined/user-left`: User join/leave notifications
- `typing/stop-typing`: Typing indicators
- `user-count`: Live user count updates

## Customization

You can easily customize:

- **Anonymous names**: Edit the `adjectives` and `animals` arrays in `server.js`
- **Styling**: Modify `Chat.css` for different colors, fonts, layouts
- **Message history**: Change the message limit in `server.js` (currently 100 messages)
- **Typing timeout**: Adjust typing indicator timeout (currently 1 second)

## Development

For development, you can run both servers simultaneously:

1. Backend: `cd backend && npm run dev` (uses nodemon for auto-restart)
2. Frontend: `cd client && npm start`

## Deployment

### Backend Deployment
- Can be deployed to platforms like Heroku, Railway, or DigitalOcean
- Make sure to update CORS settings for production domain

### Frontend Deployment
- Can be deployed to Netlify, Vercel, or GitHub Pages
- Update the Socket.IO server URL in `Chat.js` for production

## Browser Support

- Chrome, Firefox, Safari, Edge (modern versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - feel free to use this project for learning or building upon it!
