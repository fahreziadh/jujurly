import moment from "moment";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CountdownRendererFn } from "react-countdown/dist/Countdown";
import { showAlert } from "../../components/Alert";
import Button from "../../components/Button";
import CandidateItem from "../../components/CandidateItem";
import CountDown from "../../components/countdown/CountDown";
import Menu from "../../components/Menu";
import RestrictedPage from "../../components/page/RestrictedPage";
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
  const { vote,mutate:mutateVote, isLoading } = useVote(slug as string);
  const { data: participant,mutate:mutateParticipant, isLoading: participantLoading ,isError} = useParticipant(slug as string)
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const [currentState, setCurrentState] = useState(STATE_LOADING);


  const submitVote = async () => {
    if (selectedCandidate) {
      showAlert({
        title: "Kamu yakin?",
        subtitle: "Kamu akan memilih " + selectedCandidate.name,
        positiveText: "Ya, saya yakin",
        negativeText: "Tidak",
        onPositiveClick: async () => {
          const res = await fetch("/api/participant/" + vote?.code, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              candidate: selectedCandidate.name,
              email: session?.user?.email,
            }),
          });
          if (res.status === 200) {
            mutateParticipant();
            mutateVote();
            showAlert({
              title: "Vote Terkirim",
              subtitle: "terima kasih telah berpartisipasi",
            })
          }
        },
      })
    }else{
      showAlert({
        title: "Vote Gagal ❌"  ,
        subtitle: "Pilih salah satu kandidat",
      })
    }
  };


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

  useEffect(() => {
    if (vote && participant) {
      const candidate = vote?.candidates?.find((c) => c.name === participant?.candidate);
      if (candidate) {
        setSelectedCandidate(candidate);
      }
    }
  }, [participant,vote]);

  if(!session){
    return <RestrictedPage />
  }
  return (
    <div className={`mb-10 ${isLoading && "animate-pulse"}`}>
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
          {!participantLoading && vote?.candidates?.map((candidate: Candidate, index: number) => (
            <CandidateItem
              onClick={() => !participant && currentState === STATE_STARTED && setSelectedCandidate(candidate)}
              isSelected={selectedCandidate?.name === candidate.name}
              name={candidate.name}
              key={candidate.key}
              index={candidate.key}
              title={"Kandidat " + candidate.key}
              percentage={candidate.votes ? (candidate.votes / vote?.totalVotes * 100) :0}
            />
          ))}
        </div>
        {/* End Candidate */}
        <div className="text-center mt-10">
          {(session?.user?.email != vote?.publisher )&&!participant && currentState === STATE_STARTED && (
            <Button
              onClick={() => { submitVote() }}
              text="Kirim Vote Saya"
              size="lg"
              isLoading={participantLoading}
            />)}
         {participant && <span className="bg-zinc-100 py-2 px-3">Kamu sudah memilih, dan tidak diperbolehkan untuk mengganti pilihan</span>}
         {session?.user?.email === vote?.publisher && (<span className="bg-zinc-100 py-2 px-3">Pembuat vote tidak dapat melakukan voting</span>)}
        </div>
      </div>
    </div>
  );
}
