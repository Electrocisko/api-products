import bcrypt from "bcrypt";

const createHash = async (password) => {
  const salts = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salts);
};

const isValidPassword = async(plaintext, hash) => {
const result =  await (bcrypt.compare(plaintext, hash))
return result;
}

export { createHash, isValidPassword };
  
