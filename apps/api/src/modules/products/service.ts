import { Product, IProduct } from './model';

export const getAllProducts = async (): Promise<IProduct[]> => {
  return await Product.find();
};

export const getProductById = async (id: string): Promise<IProduct | null> => {
  return await Product.findById(id);
};

export const createProduct = async (data: Partial<IProduct>): Promise<IProduct> => {
  const product = new Product(data);
  return await product.save();
};

export const updateProduct = async (
  id: string,
  data: Partial<IProduct>
): Promise<IProduct | null> => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProduct = async (id: string): Promise<void> => {
  await Product.findByIdAndDelete(id);
};
