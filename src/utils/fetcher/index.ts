import AxiosFetcher from './AxiosFetcher';
import FetchService from './FetchService';
export const fetcher = new FetchService(new AxiosFetcher());
