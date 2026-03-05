import { Request, Response, NextFunction } from 'express';
import * as userService from './service';
import { AppError } from '../../middlewares/errorHandler';
import { AuthRequest } from '../../middlewares/auth';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, name } = req.body;
    const result = await userService.register({ email, password, name });
    res.status(201).json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await userService.login(email, password);
    res.json({ status: 'success', data: result });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await userService.getUserById(req.userId!);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    res.json({ status: 'success', data: user });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await userService.updateUser(req.userId!, req.body);
    res.json({ status: 'success', data: user });
  } catch (error) {
    next(error);
  }
};
