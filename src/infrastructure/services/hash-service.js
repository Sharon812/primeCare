import bcrypt from "bcrypt";
import AppError from "../../utils/custom-error.js"

class HashService {
  constructor() {
    this.saltRounds = 10;
  }

  async hashPassword(password) {
    if (!password) {
      throw new AppError("Password data is required for hashing.");
    }
    return await bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export default HashService;
