import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { logger } from '../utils/logger';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);
    logger.success(`User registered: ${req.body.email}`);
    res.status(201).json(user);
  } catch (error: any) {
    logger.error(`Registration failed for ${req.body.email}: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const token = await authService.login(req.body);
    logger.success(`User logged in: ${req.body.email}`);
    res.status(200).json({ token });
  } catch (error: any) {
    logger.error(`Login failed for ${req.body.email}: ${error.message}`);
    res.status(401).json({ error: error.message });
  }
};
