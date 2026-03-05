import { Request, Response, NextFunction } from 'express';
import * as planService from './service';
import { AppError } from '../../middlewares/errorHandler';

export const getAllPlans = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const plans = await planService.getAllPlans();
    res.json({ status: 'success', data: plans });
  } catch (error) {
    next(error);
  }
};

export const getPlanById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const plan = await planService.getPlanById(req.params.id);
    if (!plan) {
      throw new AppError('Plan not found', 404);
    }
    res.json({ status: 'success', data: plan });
  } catch (error) {
    next(error);
  }
};

export const createPlan = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const plan = await planService.createPlan(req.body);
    res.status(201).json({ status: 'success', data: plan });
  } catch (error) {
    next(error);
  }
};

export const updatePlan = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const plan = await planService.updatePlan(req.params.id, req.body);
    if (!plan) {
      throw new AppError('Plan not found', 404);
    }
    res.json({ status: 'success', data: plan });
  } catch (error) {
    next(error);
  }
};

export const deletePlan = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await planService.deletePlan(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
