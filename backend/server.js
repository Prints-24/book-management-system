import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import booksRouter from './routes/books.js';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/books', booksRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
