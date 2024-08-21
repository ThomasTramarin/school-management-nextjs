type Props = {
    id: string;
    type: string;
    labelText: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({id, type, labelText, value, onChange}: Props) {
  return (
    <div className="flex flex-col mb-5">
      <label htmlFor={id} className="font-semibold text-base mb-1 text-secondary-text">{labelText}</label>
      <input type={type} id={id} className={`focus:bg-focus-bg input-shadow p-2 rounded-lg w-full outline-none transition-all duration-150 text-tertiary-text font-medium`} name={id} value={value} onChange={onChange}/>
    </div>
  );
}
