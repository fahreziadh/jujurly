import useSWR from "swr";

export default function useVotes() {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR("/api/votes", fetcher);
  return {
    votes: data,
    isLoading: !error && !data,
    isError: error,
  };
}
