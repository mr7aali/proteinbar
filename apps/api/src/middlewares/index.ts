import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from '../config';

export const setupMiddlewares = (app: Application): void => {
  app.use(helmet());
  app.use(cors({
    origin: config.corsOrigin,
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};
