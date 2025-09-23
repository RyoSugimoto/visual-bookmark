import 'reflect-metadata';
import { container } from 'tsyringe';
import MinioStorageAdapter from '@/concretes/minio/MinioStorageAdapter';
import BUCKETS from '@/concretes/minio/shared/buckets';

if (!container.isRegistered('BookmarkImageStorageAdapter')) {
  container.register('BookmarkImageStorageAdapter', {
    useValue: new MinioStorageAdapter(BUCKETS.bookmarkImages),
  });
}
