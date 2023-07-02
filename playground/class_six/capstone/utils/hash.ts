import bcrypt from "bcrypt";

const saltRounds = 10;

export const hash = (plainText: string) => {
  const hashedValue = bcrypt.hashSync(plainText, saltRounds);
  return hashedValue;
};

export const compareHash = (plainText: string, existingHash: string) => {
  const result = bcrypt.compareSync(plainText, existingHash);
  return result;
};
console.log(hash('123456'));