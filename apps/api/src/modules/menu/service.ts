import { MenuItem, MenuCategory, IMenuItem, IMenuCategory } from './model';

export const getAllMenuItems = async (): Promise<IMenuItem[]> => {
  return await MenuItem.find({ availability: 'Active' });
};

export const getMenuItemById = async (id: string): Promise<IMenuItem | null> => {
  return await MenuItem.findOne({ id });
};

export const createMenuItem = async (data: Partial<IMenuItem>): Promise<IMenuItem> => {
  const menuItem = new MenuItem(data);
  return await menuItem.save();
};

export const updateMenuItem = async (
  id: string,
  data: Partial<IMenuItem>
): Promise<IMenuItem | null> => {
  return await MenuItem.findOneAndUpdate({ id }, data, { new: true });
};

export const deleteMenuItem = async (id: string): Promise<void> => {
  await MenuItem.findOneAndDelete({ id });
};

export const getAllCategories = async (): Promise<IMenuCategory[]> => {
  return await MenuCategory.find({ isVisible: true })
    .populate('items')
    .sort({ displayOrder: 1 });
};

export const getCategoryById = async (id: string): Promise<IMenuCategory | null> => {
  return await MenuCategory.findOne({ id }).populate('items');
};

export const createCategory = async (data: Partial<IMenuCategory>): Promise<IMenuCategory> => {
  const category = new MenuCategory(data);
  return await category.save();
};

export const updateCategory = async (
  id: string,
  data: Partial<IMenuCategory>
): Promise<IMenuCategory | null> => {
  return await MenuCategory.findOneAndUpdate({ id }, data, { new: true });
};

export const deleteCategory = async (id: string): Promise<void> => {
  await MenuCategory.findOneAndDelete({ id });
};
