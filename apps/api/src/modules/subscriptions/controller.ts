import { Response, NextFunction } from 'express';
import * as subscriptionService from './service';
import { AppError } from '../../middlewares/errorHandler';
import { AuthRequest } from '../../middlewares/auth';

export const getAllSubscriptions = async (
  _req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const subscriptions = await subscriptionService.getAllSubscriptions();
    res.json({ status: 'success', data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const subscription = await subscriptionService.getSubscriptionById(req.params.id);
    if (!subscription) {
      throw new AppError('Subscription not found', 404);
    }
    res.json({ status: 'success', data: subscription });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const subscriptions = await subscriptionService.getUserSubscriptions(req.userId!);
    res.json({ status: 'success', data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const createSubscription = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const subscriptionData = { ...req.body, userId: req.userId };
    const subscription = await subscriptionService.createSubscription(subscriptionData);
    res.status(201).json({ status: 'success', data: subscription });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const subscription = await subscriptionService.updateSubscription(req.params.id, req.body);
    if (!subscription) {
      throw new AppError('Subscription not found', 404);
    }
    res.json({ status: 'success', data: subscription });
  } catch (error) {
    next(error);
  }
};

export const updateSubscriptionStatus = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const subscription = await subscriptionService.updateSubscriptionStatus(
      req.params.id,
      req.body.status
    );
    if (!subscription) {
      throw new AppError('Subscription not found', 404);
    }
    res.json({ status: 'success', data: subscription });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscription = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await subscriptionService.deleteSubscription(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
