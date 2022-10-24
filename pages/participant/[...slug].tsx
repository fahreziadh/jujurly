import { Participant } from "@prisma/client";
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
import useParticipant from "../../lib/useParticipant";
import useVote from "../../lib/useVote";

export const STATE_NOT_STARTED = "STATE_NOT_STARTED",
  STATE_STARTED = "STATE_STARTED",
  STATE_ENDED = "STATE_ENDED",
  STATE_LOADING = "STATE_LOADING";

export default function DetailParticipate() {
  const { data: session } = useSession();
  const router = useRouter();
  const { slug } = router.query;
  const { vote, isLoading, isError } = useVote(slug as string);
  const { data:participantApi, isLoading: participantLoading } = useParticipant(slug as string)
  const [isEligible, setIsEligible] = useState(true);
  const [eligibleMessage, setEligibleMessage] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate|null>(null);

  const [currentState, setCurrentState] = useState(STATE_LOADING);



  useEffect(() => {
    if (vote) {

      // Check State by Event Time
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
    <div className={`mb-10 ${isLoading&&"animate-pulse"}`}>
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
              onClick={() => setSelectedCandidate(candidate)}
              isSelected={selectedCandidate?.key === candidate.key}
              name={candidate.name}
              key={candidate.key}
              index={candidate.key}
              title={"Kandidat " + candidate.key}
            />
          ))}
        </div>
        {/* End Candidate */}
        <div className="text-center mt-10">
          {currentState === STATE_STARTED && isEligible && ( <Button
            onClick={() => {}}
            text="Kirim Vote Saya"
            size="lg"
            className=""
          />)}

          <p>{eligibleMessage}</p>
         
        </div>
      </div>
    </div>
  );
}
