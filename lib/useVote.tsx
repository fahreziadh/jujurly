import useSWR from "swr";

export default function useVote(code: string) {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR<Votes>("/api/votes/" + code, fetcher);
  return {
    vote: data,
    isLoading: !error && !data,
    isError: error,
  };
}
