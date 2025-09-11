import User, { IUser } from '../models/user';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export const register = async (input: RegisterInput): Promise<IUser> => {
  const { username, email, password } = input;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  return user;
};

export const login = async (input: LoginInput): Promise<string> => {
  const { email, password } = input;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  return generateToken(user._id.toString());
};
