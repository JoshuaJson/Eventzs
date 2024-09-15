import bcrypt from 'bcryptjs';

export class PasswordEncoder {
  public static async encode(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
