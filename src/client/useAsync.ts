// Wrapper for react-query methods to handle errors on api calls correctly
// ErrorBoundaries do not catch async errors, so wrote this wrapper to handle it with ErrorStatusContext
// context and hooks can only be used in react components, so cannot handle this in apiClient, have to handle it with a wrapper like this

import {
  MutationFunction,
  MutationKey,
  UseMutationOptions,
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
  QueryKey,
  QueryFunction,
  UseQueryOptions,
} from "react-query";
import { useErrorStatus } from "../contexts/ErrorStatusContext";

function useAsync<TData>(
  queryKey: QueryKey,
  queryFn: QueryFunction<TData, QueryKey>,
  options?: UseQueryOptions<TData, string>
): UseQueryResult<TData, string> {
  const { setErrorStatusCode } = useErrorStatus();

  return useQuery<TData, string>(queryKey, queryFn, {
    onError: (error) => {
      setErrorStatusCode(error);
    },
    ...options,
  });
}

function useMutateAsync<TVariables, TData>(
  mutationKey: MutationKey,
  mutationFn?: MutationFunction<TData, TVariables>,
  options?: UseMutationOptions<TData, string, TVariables>
): UseMutationResult<TData, string, TVariables> {
  const { setErrorStatusCode } = useErrorStatus();

  return useMutation<TData, string, TVariables>(mutationKey, mutationFn, {
    onError: (error) => {
      setErrorStatusCode(error);
    },
    ...options,
  });
}

export { useAsync, useMutateAsync };
