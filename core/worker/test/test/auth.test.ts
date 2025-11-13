import { webcrypto } from 'node:crypto';
import { describe, expect, it, beforeAll } from 'vitest';
import { hashPassword, verifyPassword } from '../src/auth';

beforeAll(() => {
  Object.defineProperty(globalThis, 'crypto', {
    value: webcrypto,
    configurable: true,
  });
});

describe('auth hashing', () => {
  it('hashes and verifies a password with pepper', async () => {
    const hash = await hashPassword('secret123', 'pepper');
    const valid = await verifyPassword('secret123', 'pepper', hash);
    expect(valid).toBe(true);
  });

  it('fails for wrong password', async () => {
    const hash = await hashPassword('secret123', 'pepper');
    const valid = await verifyPassword('secret124', 'pepper', hash);
    expect(valid).toBe(false);
  });
});
