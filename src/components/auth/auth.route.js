import { Router } from 'express';
import { signup } from './auth.controller';

const authRouter = Router();

authRouter.post('/signup', signup);
