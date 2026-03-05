import { Request, Response, NextFunction } from 'express';
import * as locationService from './service';
import { AppError } from '../../middlewares/errorHandler';

export const getAllLocations = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const locations = await locationService.getAllLocations();
    res.json({ status: 'success', data: locations });
  } catch (error) {
    next(error);
  }
};

export const getLocationById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const location = await locationService.getLocationById(req.params.id);
    if (!location) {
      throw new AppError('Location not found', 404);
    }
    res.json({ status: 'success', data: location });
  } catch (error) {
    next(error);
  }
};

export const createLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const location = await locationService.createLocation(req.body);
    res.status(201).json({ status: 'success', data: location });
  } catch (error) {
    next(error);
  }
};

export const updateLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const location = await locationService.updateLocation(req.params.id, req.body);
    if (!location) {
      throw new AppError('Location not found', 404);
    }
    res.json({ status: 'success', data: location });
  } catch (error) {
    next(error);
  }
};

export const deleteLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await locationService.deleteLocation(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
