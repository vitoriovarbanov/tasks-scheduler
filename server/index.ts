import express from 'express';
const app = express();

app.get('/test', (_req:any, res:any) => {
  res.send('tested');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});