import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.body.token
      || req.params.token
      || req.query.token
      || req.header.authorization;
    if (!token) {
      return res.status(403).send({
        success: false,
        message: 'you are not allowed to access this resource'
      });
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: 'we were unable to verify your token'
    });
  }
};
