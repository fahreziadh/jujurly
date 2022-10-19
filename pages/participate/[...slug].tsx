import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Countdown from "react-countdown";
import { CountdownRendererFn } from "react-countdown/dist/Countdown";
import Button from "../../components/Button";
import CandidateItem from "../../components/CandidateItem";
import { CountdownRenderer } from "../../components/CountDownRenderer";
import Menu from "../../components/Menu";
import useVote from "../../lib/useVote";

export default function DetailParticipate() {
  const { data: session } = useSession();
  const [selectedCandidate, setSelectedCandidate] = useState(0);
  const router = useRouter();
  const { slug } = router.query;
  const { vote, isLoading, isError } = useVote(slug as string);

  const countDown: CountdownRendererFn = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }) => {
    if (completed) {
      return (
        <div className="text-center">
          Vote telah dimulai dan akan berakhir pada :
        </div>
      );
    }
    return (
      <CountdownRenderer
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  };

  return (
    <div className="mb-10">
      <Head>
        <title>Mulai Voting</title>
      </Head>
      <Menu />

      <div className="container mx-auto">
        <h1 className="text-4xl mt-10 text-center">{vote?.title}</h1>

        {/* Timer */}
        <h1 className=" mt-10 text-center">Dimulai Pada ⏱:</h1>

        {vote && (
          <Countdown
            date={vote.startDateTime}
            renderer={countDown}
            zeroPadTime={2}
          />
        )}
        {/* End Timer */}

        {/* Candidate */}
        <div className="border border-zinc-100 p-5 mt-10 space-y-3">
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
