import useSWR from "swr";

export default function useParticipant(code: string) {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, mutate } = useSWR<Response<Participant>>("/api/participant/" + code, fetcher);
  
  return {
    data: data?.data,
    mutate,
    isLoading: !error && !data,
    isError: error,
  };
}
