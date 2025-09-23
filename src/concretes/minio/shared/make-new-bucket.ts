import { minioClient } from '@/lib/minio';
import type { BucketSetting } from './buckets';

const DEFAULT_REGION = process.env.MINIO_REGION || 'us-east-1';

export async function makeBucket(bucket: BucketSetting) {
  await minioClient.makeBucket(bucket.name, bucket.region || DEFAULT_REGION);
  await minioClient.setBucketPolicy(bucket.name, JSON.stringify(bucket.policy));
}

export default makeBucket;
