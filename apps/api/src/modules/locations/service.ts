import { Location, ILocation } from './model';

export const getAllLocations = async (): Promise<ILocation[]> => {
  return await Location.find({ isActive: true });
};

export const getLocationById = async (id: string): Promise<ILocation | null> => {
  return await Location.findOne({ id });
};

export const createLocation = async (data: Partial<ILocation>): Promise<ILocation> => {
  const location = new Location(data);
  return await location.save();
};

export const updateLocation = async (
  id: string,
  data: Partial<ILocation>
): Promise<ILocation | null> => {
  return await Location.findOneAndUpdate({ id }, data, { new: true });
};

export const deleteLocation = async (id: string): Promise<void> => {
  await Location.findOneAndDelete({ id });
};
