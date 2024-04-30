import { pbkdf2Sync, randomBytes } from 'crypto';

export function generateSalt(): string {
  return randomBytes(16).toString('hex');
}

export function generateHash(password: string, salt: string): string {
  return pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('hex');
}
