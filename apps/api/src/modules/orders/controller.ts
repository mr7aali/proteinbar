import { Response, NextFunction } from 'express';
import * as orderService from './service';
import { AppError } from '../../middlewares/errorHandler';
import { AuthRequest } from '../../middlewares/auth';

export const getAllOrders = async (
  _req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orders = await orderService.getAllOrders();
    res.json({ status: 'success', data: orders });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) {
      throw new AppError('Order not found', 404);
    }
    res.json({ status: 'success', data: order });
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orders = await orderService.getUserOrders(req.userId!);
    res.json({ status: 'success', data: orders });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orderData = { ...req.body, userId: req.userId };
    const order = await orderService.createOrder(orderData);
    res.status(201).json({ status: 'success', data: order });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
    if (!order) {
      throw new AppError('Order not found', 404);
    }
    res.json({ status: 'success', data: order });
  } catch (error) {
    next(error);
  }
};
