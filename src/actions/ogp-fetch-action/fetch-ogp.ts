import ogs from 'open-graph-scraper';
import type z from 'zod';
import { type Action, ActionResponse } from '@/actions/shared';
import { ogpDataSchema } from '@/schema';

export const PREFIX = 'fetch-ogp';

export const ERROR_CODES = {
  failure: `${PREFIX}-failure`,
};

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export type ResponseData = z.infer<typeof ogpDataSchema>;

export const fetchOgp: Action<string, ResponseData, ErrorCode> = async (
  url: string,
) => {
  const res = ActionResponse.createResponseObject<ResponseData, ErrorCode>;

  try {
    new URL(url);

    const ogsResponse = await ogs({ url });

    const { result, error } = ogsResponse;

    if (error) {
      throw new Error(`[actions/fetchOgp] ogsエラー 詳細: ${ogsResponse}`);
    }

    const ogp = {
      url: result.ogUrl || url,
      title: result.ogTitle || result.twitterTitle,
      type: result.ogType,
      siteName: result.ogSiteName,
      description: result.ogDescription || result.twitterDescription,
      image: result.ogImage?.[0]?.url || result.twitterImage?.[0]?.url,
    };

    const { success, data } = ogpDataSchema.safeParse(ogp);

    if (!success) {
      return res(false, null, ERROR_CODES.failure);
    }

    return res(true, data);
  } catch (exception) {
    console.error(`[fetchOgp] 詳細: ${exception.message || ''}`);

    return res(false, null, ERROR_CODES.failure);
  }
};
