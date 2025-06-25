import Member from "./models/auth.model.js";

export const existingUser = async ({ email }) => {
  console.log(email);
  const user = await Member.findOne({ email });
  console.log(user);
  return user; // returns the user document or null
};
