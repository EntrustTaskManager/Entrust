<!-- SCHEMA -->

// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
provider = "prisma-client-js"
}

datasource db {
provider = "postgresql"
url = env("DATABASE_URL")
}

model Student {
id Int @id @default(autoincrement())
firstName String
lastName String
gpa Int?
email String?
messages Message[]
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
}

model Message {
id Int @id @default(autoincrement())
createdAt DateTime @default(now())
text String
student Student @relation(fields: [studentId], references: [id])
studentId Int
}

<!-- SEED DATA -->

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
await prisma.student.create({
data: {
firstName: "Bart",
lastName: "Simpson",
email: "bartdude@simpsons.com",
},
});

await prisma.student.create({
data: {
firstName: "Lisa",
lastName: "Simpson",
email: "saxxylisa@simpsons.com",
},
});

await prisma.student.create({
data: {
firstName: "Homer",
lastName: "Simpson",
email: "mr.plow@simpsons.com",
},
});
}

main()
.then(async () => {
await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
process.exit(1);
});

<!-- .env file -->

DATABASE_URL="postgresql://digitalnavyguy@localhost:5432/entrust?schema=public"
PORT="5432"

 <!-- 
 1. swap to main or master
    - git checkout main 
or 
    - git checkout master

2. pull the new changes to your own main/master branch
    - git pull

3. swap to your feature branch
    - git checkout feature/puppy-cards

** 4. update your feature branch with the new code from your main/master **
    - git pull origin main
or 
    - git pull origin master

******************************

** 4. can also use **
    - git rebase main
or
    - git rebase master
-->
