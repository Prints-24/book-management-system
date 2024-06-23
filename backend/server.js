import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import booksRouter from './routes/booksRouter.js';
import usersRouter from './routes/usersRouter.js';
import authRouter from './routes/authRouter.js';
import borrowRoutes from './routes/borrowsRouter.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/books', booksRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/borrows', borrowRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
