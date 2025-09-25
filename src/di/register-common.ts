import 'reflect-metadata';
import { container } from 'tsyringe';
import AuthjsAuthActions from '@/concretes/auth/AuthjsAuthActions';
import PrismaBookmarkRepository from '@/concretes/prisma/bookmark/PrismaBookmarkRepository';
import PrismaFileRepository from '@/concretes/prisma/file/PrismaFileRepository';
import PrismaClientManager from '@/concretes/prisma/shared/PrismaClientManager';
import PrismaTransactionProvider from '@/concretes/prisma/shared/PrismaTransactionProvider';
import PrismaUserRepository from '@/concretes/prisma/user/PrismaUserRepository';

if (!container.isRegistered('AuthActions')) {
  container.register('AuthActions', {
    useClass: AuthjsAuthActions,
  });
}

if (!container.isRegistered('DataAccessClientManager')) {
  container.register('DataAccessClientManager', {
    useClass: PrismaClientManager,
  });
}

if (!container.isRegistered('TransactionProvider')) {
  container.register('TransactionProvider', {
    useClass: PrismaTransactionProvider,
  });
}

if (!container.isRegistered('UserRepository')) {
  container.register('UserRepository', {
    useClass: PrismaUserRepository,
  });
}

if (!container.isRegistered('FileRepository')) {
  container.register('FileRepository', {
    useClass: PrismaFileRepository,
  });
}

if (!container.isRegistered('BookmarkRepository')) {
  container.register('BookmarkRepository', {
    useClass: PrismaBookmarkRepository,
  });
}
