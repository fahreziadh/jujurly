interface Props {
  onChange: (value: string) => void;
  value: string;
  placeholder: string;
  className?: string;
}
export default function Form(props: Props) {
  return (
    <input
      type="text"
      className={` border bg-zinc-100 border-transparent py-2 px-3 ${props.className}`}
      placeholder={props.placeholder}
      onChange={(e) => props.onChange(e.target.value)}
      value={props.value}
    />
  );
}
