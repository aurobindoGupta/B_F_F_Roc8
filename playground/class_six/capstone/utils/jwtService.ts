import jwt from "jsonwebtoken";

export const sign = (payload: Record<string, unknown>) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "3 hours",
  });
};
export const verify = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch {
    return false;
  }
};
