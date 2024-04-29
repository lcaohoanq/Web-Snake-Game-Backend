import { pbkdf2Sync, randomBytes } from 'crypto';

export function generateSalt() {
  return randomBytes(16).toString('hex');
}

export function generateHash(password: string, salt: string) {
  return pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('hex');
}
