export default function CandidateItem() {
  return (
    <div className="flex flex-col border border-zinc-100 p-5 shadow-md shadow-zinc-100">
      <h1 className="flex w-1/2 bg-zinc-100 aspect-square self-center text-center justify-center items-center text-4xl rounded-full">
        1
      </h1>
      <p className="font-bold text-lg text-center mt-3">Fahrezi</p>
      <p className="text-center">Calon 1</p>
      <button
        onClick={() => {}}
        className={`bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-900 text-sm font-bold py-2 mt-5`}
      >
        Pilih
      </button>
    </div>
  );
}
