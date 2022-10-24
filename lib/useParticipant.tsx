import { Participant } from "@prisma/client";
import useSWR from "swr";

export default function useParticipant(code: string) {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR<Participant>("/api/participant/" + code, fetcher);
  
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
