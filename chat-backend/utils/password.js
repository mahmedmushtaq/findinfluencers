const { scrypt, randomBytes, scryptSync } = require("crypto");
const { promisify } = require("util");

const scryptAsync = promisify(scrypt);

class Password {
  static async toHash(password) {
    const salt = Password.salt();
    const buf = await scryptAsync(password, salt, 64);
    return `${buf.toString("hex")}.${salt}`;
  }
  static toHashSync(password) {
    const salt = Password.salt();
    const buf = scryptSync(password, salt, 64);
    return `${buf.toString("hex")}.${salt}`;
  }

  static async compare(storedPassword, suppliedPassword) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf = await scryptAsync(suppliedPassword, salt, 64);

    return buf.toString("hex") === hashedPassword;
  }

  static salt() {
    return randomBytes(8).toString("hex");
  }
}


module.exports = Password