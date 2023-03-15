import express, { NextFunction } from 'express';
import { config } from 'dotenv';
import searchRouter from './routes/search';
import favoritesRouter from './routes/favorites';
config({ path: '../.env' });

const main = async () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/search', searchRouter);
  app.use('/favorites', favoritesRouter);

  app.use((err: any, _: Request, res: Response, __: NextFunction) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    const message = err.message ? err.message : 'unknown error occured';
    res.status(statusCode).json({ message });
  });

  app.listen(process.env.PORT, () => {
    console.log(
      `Listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
    );
  });
};

main();
