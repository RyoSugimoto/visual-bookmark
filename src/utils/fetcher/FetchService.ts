import type {
  FetcherBody,
  FetcherOptions,
  FetcherResult,
  IFetcher,
} from './IFetcher';

export default class FetchService {
  constructor(private fetcher: IFetcher) {}

  async post<DataType>(
    endpoint: string | URL,
    body?: FetcherBody,
    options?: FetcherOptions,
  ): Promise<FetcherResult<DataType>> {
    return await this.fetcher.post(endpoint, body, options);
  }

  async get<DataType>(
    endpoint: string | URL,
    options?: FetcherOptions,
  ): Promise<FetcherResult<DataType>> {
    return await this.fetcher.get(endpoint, options);
  }
}
