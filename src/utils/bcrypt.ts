import * as bcrypt from 'bcrypt';

export async function encodePass(rawPass: string) {
  const SALT = bcrypt.genSaltSync();
  return await bcrypt.hash(rawPass, SALT);
}

export async function decodePass(
  hashPass: string,
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashPass);
}
