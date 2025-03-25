import bcrypt from "bcrypt";

class HashService {
  constructor() {
    this.saltRounds = 10;
  }

  async hashPassword(password) {
    if (!password) {
      throw new Error("Password data is required for hashing.");
    }
    return await bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export default HashService;
