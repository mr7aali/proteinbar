import { Request, Response, NextFunction } from 'express';
import * as productService from './service';
import { AppError } from '../../middlewares/errorHandler';

export const getAllProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await productService.getAllProducts();
    res.json({ status: 'success', data: products });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    res.json({ status: 'success', data: product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ status: 'success', data: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    res.json({ status: 'success', data: product });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
