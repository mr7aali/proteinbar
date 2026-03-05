import { Request, Response, NextFunction } from 'express';
import * as menuService from './service';
import { AppError } from '../../middlewares/errorHandler';

export const getAllMenuItems = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const items = await menuService.getAllMenuItems();
    res.json({ status: 'success', data: items });
  } catch (error) {
    next(error);
  }
};

export const getMenuItemById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const item = await menuService.getMenuItemById(req.params.id);
    if (!item) {
      throw new AppError('Menu item not found', 404);
    }
    res.json({ status: 'success', data: item });
  } catch (error) {
    next(error);
  }
};

export const createMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const item = await menuService.createMenuItem(req.body);
    res.status(201).json({ status: 'success', data: item });
  } catch (error) {
    next(error);
  }
};

export const updateMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const item = await menuService.updateMenuItem(req.params.id, req.body);
    if (!item) {
      throw new AppError('Menu item not found', 404);
    }
    res.json({ status: 'success', data: item });
  } catch (error) {
    next(error);
  }
};

export const deleteMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await menuService.deleteMenuItem(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getAllCategories = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const categories = await menuService.getAllCategories();
    res.json({ status: 'success', data: categories });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const category = await menuService.getCategoryById(req.params.id);
    if (!category) {
      throw new AppError('Category not found', 404);
    }
    res.json({ status: 'success', data: category });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const category = await menuService.createCategory(req.body);
    res.status(201).json({ status: 'success', data: category });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const category = await menuService.updateCategory(req.params.id, req.body);
    if (!category) {
      throw new AppError('Category not found', 404);
    }
    res.json({ status: 'success', data: category });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await menuService.deleteCategory(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
