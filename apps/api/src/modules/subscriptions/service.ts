import { Subscription, ISubscription } from './model';

export const getAllSubscriptions = async (): Promise<ISubscription[]> => {
  return await Subscription.find().populate('userId');
};

export const getSubscriptionById = async (id: string): Promise<ISubscription | null> => {
  return await Subscription.findById(id).populate('userId');
};

export const getUserSubscriptions = async (userId: string): Promise<ISubscription[]> => {
  return await Subscription.find({ userId });
};

export const createSubscription = async (data: Partial<ISubscription>): Promise<ISubscription> => {
  const subscription = new Subscription(data);
  return await subscription.save();
};

export const updateSubscription = async (
  id: string,
  data: Partial<ISubscription>
): Promise<ISubscription | null> => {
  return await Subscription.findByIdAndUpdate(id, data, { new: true });
};

export const updateSubscriptionStatus = async (
  id: string,
  status: ISubscription['status']
): Promise<ISubscription | null> => {
  return await Subscription.findByIdAndUpdate(id, { status }, { new: true });
};

export const deleteSubscription = async (id: string): Promise<void> => {
  await Subscription.findByIdAndDelete(id);
};
