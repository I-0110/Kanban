import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization;
  // Check if the authorization header is present. 
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey,(err, user) => {
      if (err) {
      return res.sendStatus(403); //Forbidden status if the token is invalid
      }

      req.user = user as JwtPayload;
      return next();
    });
  } else {
    res.sendStatus(401); //Send unauthorized status if no auth header is present
  }
};
