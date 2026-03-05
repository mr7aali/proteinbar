import { Order, IOrder } from './model';

export const getAllOrders = async (): Promise<IOrder[]> => {
  return await Order.find().populate('userId items.productId');
};

export const getOrderById = async (id: string): Promise<IOrder | null> => {
  return await Order.findById(id).populate('userId items.productId');
};

export const getUserOrders = async (userId: string): Promise<IOrder[]> => {
  return await Order.find({ userId }).populate('items.productId');
};

export const createOrder = async (data: Partial<IOrder>): Promise<IOrder> => {
  const order = new Order(data);
  return await order.save();
};

export const updateOrderStatus = async (
  id: string,
  status: IOrder['status']
): Promise<IOrder | null> => {
  return await Order.findByIdAndUpdate(id, { status }, { new: true });
};
