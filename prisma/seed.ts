import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // ユーザーを3人作成
  for (let i = 0; i < 3; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
      },
    });

    // 各ユーザーに2件の投稿を作成
    for (let j = 0; j < 2; j++) {
      const post = await prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          body: faker.lorem.paragraph().slice(0, 400),
          userId: user.id,
        },
      });

      // 各投稿に最大4件の画像を添付
      const imageCount = faker.number.int({ min: 1, max: 4 });
      for (let k = 0; k < imageCount; k++) {
        await prisma.image.create({
          data: {
            url: faker.image.url(),
            postId: post.id,
          },
        });
      }
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
