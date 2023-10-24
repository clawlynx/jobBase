import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");
  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === "6536297a7efac045c42c8a28";
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

export const authorizePermission = (...rest) => {
  return (req, res, next) => {
    if (!rest.includes(req.user.role)) {
      throw new UnauthorizedError("not authorized");
    }
    next();
  };
};

export const testforDemoUser = (req, res, next) => {
  if (req.user.testUser) throw new BadRequestError("Demo User. Read Only");
  next();
};
