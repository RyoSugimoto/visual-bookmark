import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {

  /**
   * 下記の [A] もしくは [B] いずれかの方法を使用する。
   */

  /**
   * [A] すべてのテーブルを動的に取得する方法
   * * `PrismaClient` にはすべてのテーブルを取得する方法はないので
   * 代わりに `deleteMany` メソッドを持つメンバをテーブルとして取得する。
   * * `PrismaClient` にはテーブル以外にも `$connect` などのメンバも存在するため
   * Prisma のバージョンを変更する際には注意する必要がある。
   */
  for (const key of Object.keys(prisma)) {
    // deleteManyが存在するモデルのみ処理

    if (typeof (prisma as any)[key]?.deleteMany === 'function') {
      await (prisma as any)[key].deleteMany({});
    }
  }

  /**
   * [B] テーブル毎に処理する方法
   * * こちらの方が確実だがテーブルに変更がある度に修正する必要がある。
   */
  // await prisma.image.deleteMany({});
  // await prisma.post.deleteMany({});
  // await prisma.account.deleteMany({});
  // await prisma.session.deleteMany({});
  // await prisma.verificationToken.deleteMany({});
  // await prisma.authenticator.deleteMany({});
  // await prisma.user.deleteMany({});
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
