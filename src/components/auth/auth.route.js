import { Router } from 'express';
import { login, signup, verifyAccount } from './auth.controller';

const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/verify', verifyAccount);

export default authRouter;
