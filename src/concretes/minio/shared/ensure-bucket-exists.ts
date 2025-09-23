import { minioClient } from '@/lib/minio';

export async function ensureBucketExists(bucketName: string) {
  const exists = await minioClient.bucketExists(bucketName);

  return exists;
}

export default ensureBucketExists;
