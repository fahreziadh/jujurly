import { useEffect, useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import Form from "./Form";
interface Props {
  candidate: Candidate;
  submitCandidate: (candidate: Candidate) => void;
  removeCandidateForm: (key: number) => void;
}
export default function CandidateForm(props: Props) {
  const [candidate, setCandidate] = useState<Candidate>({
    key: 0,
    name: "",
    title: "",
  });

  useEffect(() => {
    setCandidate(props.candidate);
  }, [props.candidate]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (candidate.name === "") {
      alert("Nama Tidak Boleh Kosong");
      return;
    }
    props.submitCandidate(candidate);
  };

  useEffect(() => {
    //SubmitCandidate
    props.submitCandidate(candidate);
  }, [candidate]);

  return (
    <div className="flex flex-col border border-zinc-100 p-5 shadow-md shadow-zinc-100">
      <div className="self-end">
        <XCircleIcon
          className="h-6 w-6 cursor-pointer hover:bg-zinc-100 text-zinc-300"
          onClick={() => props.removeCandidateForm(candidate.key)}
        />
      </div>
      <h1 className="flex w-1/2 bg-zinc-100 aspect-square self-center text-center justify-center items-center text-4xl rounded-full">
        {props.candidate.key}
      </h1>
      <label className="text-sm mt-3 mb-1">Nama Kandidat</label>
      <Form
        value={candidate.name}
        onChange={(e) => {
          setCandidate({ ...candidate, name: e });
        }}
        placeholder="Masukkan Nama Kandidat"
      />
    </div>
  );
}
