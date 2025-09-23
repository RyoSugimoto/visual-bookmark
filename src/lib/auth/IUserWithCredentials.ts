import type { User } from 'next-auth';

export default interface IUserWithCredentials extends User {
  password: string;
}
