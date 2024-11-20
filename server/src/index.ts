import express from 'express';
import bodyParser from 'body-parser';
import goalRoutes from './routes/goalRoutes';

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', goalRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});