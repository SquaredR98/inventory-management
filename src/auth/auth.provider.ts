import * as bcrypt from 'bcrypt';

export class AuthProvider {
  static generateHash(password: string): string {
    return bcrypt.hashSync(password, 10);
  }
}
