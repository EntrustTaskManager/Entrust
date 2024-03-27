const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function login(req, res) {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: { username },
    });

    // If user not found, send error response
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare the provided password with the hashed password stored in database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, send error response
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // If username and password match, send success response
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
}

module.exports = {
  login,
};
