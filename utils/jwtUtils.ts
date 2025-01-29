import jwt from 'jsonwebtoken';

const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};

export { verifyToken };