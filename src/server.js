import app from './app.js';
import dotenv from 'dotenv';

dotenv.config({ debug: process.env.DEBUG });

const PORT = process.env.PORT || 8000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`Server is running on ${BASE_URL}`);
});
