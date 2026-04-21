import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';

const app = express();
app.use(cors());

// Auth & User routes
app.use('/api/users', createProxyMiddleware({ target: 'http://auth-service:3000', changeOrigin: true }));

// Chat routes
app.use('/api/chat', createProxyMiddleware({ target: 'http://chat-service:3000', changeOrigin: true }));

// Socket.io proxying
app.use('/socket.io', createProxyMiddleware({ target: 'http://chat-service:3000', ws: true, changeOrigin: true }));

export { app };
