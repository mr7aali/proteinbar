import { Product, IProduct } from './model';

export const getAllProducts = async (): Promise<IProduct[]> => {
  return await Product.find({ availability: 'Active' });
};

export const getProductById = async (id: string): Promise<IProduct | null> => {
  return await Product.findOne({ id });
};

export const getProductByHandle = async (handle: string): Promise<IProduct | null> => {
  return await Product.findOne({ handle });
};

export const createProduct = async (data: Partial<IProduct>): Promise<IProduct> => {
  const product = new Product(data);
  return await product.save();
};

export const updateProduct = async (
  id: string,
  data: Partial<IProduct>
): Promise<IProduct | null> => {
  return await Product.findOneAndUpdate({ id }, data, { new: true });
};

export const deleteProduct = async (id: string): Promise<void> => {
  await Product.findOneAndDelete({ id });
};
