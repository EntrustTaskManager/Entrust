const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const users = [
  {
    firstName: "John",
    lastName: "Fuller",
    username: "JFuller",
    password: "PassWord1",
    email: "fuller.john84@gmail.com",
  },
  {
    firstName: "Keevin",
    lastName: "Richards",
    username: "KeevRich",
    password: "PassWord1",
    email: "keevin.richardss@gmail.com",
  },
  {
    firstName: "Marquez",
    lastName: "Noel",
    username: "Qzykuma",
    password: "PassWord1",
    email: "quezjn24@gmail.com",
  },
  {
    firstName: "Clayton",
    lastName: "Lott",
    username: "Lottness",
    password: "PassWord1",
    email: "claylottjr@gmail.com",
  },
];

const seed = async () => {
  try {
    for (const user of users) {
      await prisma.teacher.create({ data: user });
    }
  } catch (error) {
    console.log("Seeding failed.", error);
  }
};

seed();
