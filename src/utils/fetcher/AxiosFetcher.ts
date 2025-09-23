import axios from 'axios';

import type {
  FetcherBody,
  FetcherOptions,
  FetcherResult,
  IFetcher,
} from './IFetcher';

export default class AxiosFetcher implements IFetcher {
  async post<DataType = unknown>(
    endpoint: string | URL,
    body?: FetcherBody,
    options?: FetcherOptions,
  ): Promise<FetcherResult<DataType>> {
    const { data, status, headers } = await axios.post(
      endpoint.toString(),
      body,
      {
        params: options?.params,
        headers: options?.headers,
        timeout: options?.timeout,
      },
    );

    if (status !== 200) {
      return {
        success: false,
        headers,
        status,
      };
    }

    return {
      success: true,
      data,
      headers,
      status,
    };
  }

  async get<DataType = unknown>(
    endpoint: string | URL,
    options?: FetcherOptions,
  ): Promise<FetcherResult<DataType>> {
    const { data, status, headers } = await axios.get<DataType>(
      endpoint.toString(),
      {
        params: options?.params,
        headers: options?.headers,
        timeout: options?.timeout,
      },
    );

    if (status !== 200) {
      return {
        success: false,
        headers,
        status,
      };
    }

    return {
      success: true,
      data,
      headers,
      status,
    };
  }
}
