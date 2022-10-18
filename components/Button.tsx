interface Props {
  onClick: () => void;
  text: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Button(props: Props) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        props.onClick();
      }}
      className={`bg-zinc-900 text-white hover:bg-zinc-100 hover:text-zinc-900 text-sm font-bold ${
        props.className
      } ${
        props.size === "sm"
          ? "py-1 px-2"
          : props.size === "lg"
          ? "py-3 px-4"
          : "py-2 px-3"
      }`}
    >
      {props.text}
    </button>
  );
}
