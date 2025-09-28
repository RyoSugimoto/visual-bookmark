import { EmailAddress, Url } from '@/domains/models';
import { HashedPassword, User, UserId, UserName } from '@/domains/models/user';
import type IUserRepository from '@/domains/models/user/IUserRepository';
import type {
  CreateCommand,
  UpdateCommand,
} from '@/domains/models/user/IUserRepository';
import { prisma } from '@/lib/prisma';

export default class PrismaUserRepository implements IUserRepository {
  public async findByEmail(emailAddress: EmailAddress): Promise<User> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: emailAddress.value,
        },
      });

      if (!user) return null;

      const { id, email, name, image, password } = user;

      return User.reconstruct(
        new UserId(id),
        new EmailAddress(email),
        new UserName(name),
        image ? new Url(image) : null,
        new HashedPassword(password),
      );
    } catch (error) {
      console.error('PrismaUserRepository.findByEmail', error);

      throw new Error(error.message);
    }
  }

  public async findById(userId: UserId): Promise<User> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId.value,
        },
      });

      if (!user) return null;

      const { id, email, name, image, password } = user;

      return User.reconstruct(
        new UserId(id),
        new EmailAddress(email),
        new UserName(name),
        image ? new Url(image) : null,
        new HashedPassword(password),
      );
    } catch (error) {
      console.error('PrismaUserRepository.findById', error);

      throw new Error(error.message);
    }
  }

  public async create(command: CreateCommand): Promise<User> {
    const { email, hashedPassword, name, image } = command;

    try {
      const response = await prisma.user.create({
        data: {
          email: email.value,
          password: hashedPassword.value,
          name: name?.value,
          image: image?.value,
        },
      });

      return User.reconstruct(
        new UserId(response.id),
        new EmailAddress(response.email),
        new UserName(response.name),
        image ? new Url(response.image) : null,
        new HashedPassword(response.password),
      );
    } catch (error) {
      console.error('PrismaUserRepository.create', error);
      throw new Error(error.message);
    }
  }

  public async update({ id, name, email }: UpdateCommand): Promise<User> {
    const result = await prisma.user.update({
      where: {
        id: id.value,
      },
      data: {
        name: name.value,
        email: email.value,
      },
    });

    return new User(
      new UserId(result.id),
      new EmailAddress(result.email),
      new UserName(result.name),
      result.image ? new Url(result.image) : null,
      new HashedPassword(result.password),
    );
  }
}
