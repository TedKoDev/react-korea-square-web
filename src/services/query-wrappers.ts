import {
  DefaultError,
  MutationFunction,
  QueryFunction,
  QueryKey,
  SkipToken,
  UndefinedInitialDataOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query'

export function useGetQueryWrapper<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  request: QueryFunction<TQueryFnData, TQueryKey> | SkipToken,
  options?: Omit<
    UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery<TQueryFnData, TError, TData, TQueryKey>({
    queryKey: queryKey,
    queryFn: request,
    ...options,
  })
}

export function usePostMutationWrapper<
  TData = any,
  TError = unknown,
  TVariables = string, // Changed from void to string
  TContext = unknown
>(
  request: MutationFunction<TData, TVariables>,
  options?: UseMutationOptions<TData, TError, TVariables, TContext>
) {
  const queryClient = useQueryClient()

  const { mutate, isPending, error, data, mutateAsync } = useMutation<
    TData,
    TError,
    TVariables,
    TContext
  >({
    mutationFn: request,
    onSuccess: (data: TData, variables: TVariables, context: TContext) => {
      queryClient.invalidateQueries()
      options?.onSuccess?.(data, variables, context)
    },
    onError: (error, variables, context) => {
      console.log('src/Services/queries/helpers/query-wrappers.ts')
      options?.onError?.(error, variables, context)
    },
  })

  return {
    mutate,
    isLoading: isPending,
    error,
    data,
    mutateAsync,
  }
}
