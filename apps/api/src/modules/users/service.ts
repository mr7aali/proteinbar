import jwt from 'jsonwebtoken';
import { User, IUser } from './model';
import { config } from '../../config';
import { AppError } from '../../middlewares/errorHandler';

export const register = async (data: {
  email: string;
  password: string;
  name: string;
}): Promise<{ user: Partial<IUser>; token: string }> => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new AppError('Email already registered', 400);
  }

  const user = await User.create(data);
  const token = generateToken(user._id.toString());

  return {
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    token,
  };
};

export const login = async (
  email: string,
  password: string
): Promise<{ user: Partial<IUser>; token: string }> => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = generateToken(user._id.toString());

  return {
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    token,
  };
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};

export const updateUser = async (
  id: string,
  data: Partial<IUser>
): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '7d' });
};
