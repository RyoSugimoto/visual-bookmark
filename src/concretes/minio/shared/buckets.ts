export interface BucketSetting {
  name: string;
  type: 'public' | 'private';
  region?: string;
  policy: {
    Version: '2012-10-17';
    Statement: {
      Effect: 'Allow' | 'Deny';
      Principal: string | { AWS: string[] };
      Action: (
        | 's3:GetObject'
        | 's3:PutObject'
        | 's3:DeleteObject'
        | 's3:ListBucket'
      )[];
      /** ARN */
      Resource: string[];
    }[];
  };
}

const BUCKETS: Record<string, BucketSetting> = {
  public: {
    name: 'public',
    type: 'public',
    region: 'us-east-1',
    policy: {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: '*',
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::public/*`],
        },
      ],
    },
  },
  bookmarkImages: {
    name: 'bookmark-images',
    type: 'private',
    region: 'us-east-1',
    policy: {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Deny',
          Principal: { AWS: ['*'] },
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::bookmark-images/*`],
        },
      ],
    },
  },
} as const;

export default BUCKETS;
