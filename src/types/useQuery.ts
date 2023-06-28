import {
  type FetchQueryOptions,
  type WithRequired,
} from '@tanstack/query-core/src/types';
import { type QueryKey } from '@tanstack/react-query';

export type CustomQuery<T> = WithRequired<
  FetchQueryOptions<T, unknown, T, QueryKey>,
  'queryKey'
>;
