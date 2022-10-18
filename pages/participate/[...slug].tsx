import { XCircleIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Button from "../../components/Button";
import CandidateForm from "../../components/CandidateForm";
import CandidateItem from "../../components/CandidateItem";
import Menu from "../../components/Menu";
import RestrictedPage from "../../components/page/RestrictedPage";

export default function DetailParticipate() {
  const { data: session } = useSession();

  if (!session) {
    return <RestrictedPage />;
  }

  return (
    <div className="mb-10">
      <Head>
        <title>Mulai Voting</title>
      </Head>
      <Menu />

      <div className="container mx-auto">
        <h1 className="text-4xl mt-10 text-center">Title</h1>
        <h1 className="mt-5 text-center">Dimulai Pada:</h1>
        <h1 className="text-2xl font-bold mt text-center">
          03 Jam 2 Menit 1 Detik
        </h1>

        <div className="grid gap-4 grid-cols-3 mt-10">
          <CandidateItem />
          <CandidateItem />
          <CandidateItem />
        </div>
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
