import { CheckIcon } from "@heroicons/react/24/solid";

interface Props {
  isSelected: boolean;
  name: string;
  title?: string;
  index: number;
  percentage?: number;
  onClick?: () => void;
}

export default function CandidateItem(props: Props) {
  return (
    <div className="flex flex-row border border-zinc-100 p-5 rounded-md space-x-3">
      <div className="w-12 h-12 font-bold text-lg items-center flex justify-center bg-zinc-100 text-center">
        {props.index}
      </div>
      <div className="w-full">
        <p className="text-lg font-bold">{props.name}</p>
        <p>{props.title}</p>
        {/* Make Text Percentage Indicator follow bar */}
        <div className="flex flex-row items-center space-x-2">
          <div className="w-full h-1 bg-zinc-100 rounded-md">
            <div
              className="h-1 bg-zinc-800 rounded-md"
              style={{ width: `${props.percentage}%` }}
            ></div>
          </div>
          <p className="text-sm font-bold">{Intl.NumberFormat('en',{notation:"compact"}).format(props.percentage || 0)}%</p>
        </div>
      </div>
      <div
        onClick={props.onClick}
        className={`flex w-20 aspect-square rounded-md items-center justify-center cursor-pointer ${
          props.isSelected
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-zinc-100 hover:bg-zinc-200 "
        }`}
      >
        <span>
          <CheckIcon className="w-7 h-7" />
        </span>
      </div>
    </div>
  );
}
