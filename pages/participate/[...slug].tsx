import moment from "moment";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CountdownRendererFn } from "react-countdown/dist/Countdown";
import Button from "../../components/Button";
import CandidateItem from "../../components/CandidateItem";
import CountDown from "../../components/countdown/CountDown";
import Menu from "../../components/Menu";
import useVote from "../../lib/useVote";

export const STATE_NOT_STARTED = "STATE_NOT_STARTED",
  STATE_STARTED = "STATE_STARTED",
  STATE_ENDED = "STATE_ENDED",
  STATE_LOADING = "STATE_LOADING";

export default function DetailParticipate() {
  const { data: session } = useSession();
  const [selectedCandidate, setSelectedCandidate] = useState(0);
  const router = useRouter();
  const { slug } = router.query;
  const { vote, isLoading, isError } = useVote(slug as string);

  const [currentState, setCurrentState] = useState(STATE_LOADING);

  useEffect(() => {
    if (vote) {
      if (currentState === STATE_ENDED) {
        return;
      }
      const start = moment(vote?.startDateTime);
      const end = moment(vote?.endDateTime);

      const interval = setInterval(async () => {
        const now = moment();

        if (now.isBefore(start)) {
          setCurrentState(STATE_NOT_STARTED);
        } else if (now.isAfter(start) && now.isBefore(end)) {
          setCurrentState(STATE_STARTED);
        } else if (now.isAfter(end)) {
          setCurrentState(STATE_ENDED);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [vote]);

  return (
    <div className="mb-10">
      <Head>
        <title>Mulai Voting</title>
      </Head>
      <Menu />

      <div className="container mx-auto">
        <h1 className="text-4xl mt-10 text-center">{vote?.title}</h1>
        {/* Timer */}
        {vote?.startDateTime && vote?.endDateTime && (
          <CountDown
            start={vote?.startDateTime}
            end={vote?.endDateTime}
            currentState={currentState}
          />
        )}
        {/* End Timer */}

        {/* Candidate */}
        <div className="p-5 mt-10 space-y-3 w-2/3 mx-auto">
          {vote?.candidates?.map((candidate: Candidate, index: number) => (
            <CandidateItem
              isSelected={false}
              name={candidate.name}
              key={candidate.key}
              index={candidate.key}
              title={"Kandidat " + candidate.key}
            />
          ))}
        </div>
        {/* End Candidate */}
        <div className="text-center mt-10">
          <Button
            onClick={() => {}}
            text="Kirim Vote Saya"
            size="lg"
            className=""
          />
        </div>
      </div>
    </div>
  );
}
