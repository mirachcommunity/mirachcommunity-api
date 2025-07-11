import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Welcome to Mirach Community API V1!'
  })
})

export default app;