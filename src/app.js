import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the API 👋');
});

// Routes
app.use('/api/v1', userRoutes);


export default app;

