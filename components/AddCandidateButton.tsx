import { PlusIcon } from "@heroicons/react/24/solid";
import Button from "./Button";

interface Props {
  onClick: () => void;
}
export default function AddCandidateButton(props: Props) {
  return (
    <div
      className="w-1/3 flex flex-col items-center justify-center cursor-pointer bg-zinc-100 aspect-square text-zinc-400 hover:bg-zinc-900 hover:text-white"
      onClick={props.onClick}
    >
      <PlusIcon className="w-1/3" />
      <span className="text-sm">Tambah</span>
    </div>
  );
}
