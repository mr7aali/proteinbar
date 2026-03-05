import { MonthlyPlan, IMonthlyPlan } from './model';

export const getAllPlans = async (): Promise<IMonthlyPlan[]> => {
  return await MonthlyPlan.find({ isActive: true });
};

export const getPlanById = async (id: string): Promise<IMonthlyPlan | null> => {
  return await MonthlyPlan.findOne({ id });
};

export const createPlan = async (data: Partial<IMonthlyPlan>): Promise<IMonthlyPlan> => {
  const plan = new MonthlyPlan(data);
  return await plan.save();
};

export const updatePlan = async (
  id: string,
  data: Partial<IMonthlyPlan>
): Promise<IMonthlyPlan | null> => {
  return await MonthlyPlan.findOneAndUpdate({ id }, data, { new: true });
};

export const deletePlan = async (id: string): Promise<void> => {
  await MonthlyPlan.findOneAndDelete({ id });
};
