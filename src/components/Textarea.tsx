type TextareaProps = {
  textareaStyle: "basic" | undefined;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
};

const basicClassName =
  "focus:text-gray-700 block w-full px-3 py-1.5 border border-solid border-gray-300 rounded transition";

const Input: React.FC<TextareaProps> = (props: TextareaProps) => {
  return (
    <div className="mb-6">
      <textarea
        className={props.textareaStyle === "basic" ? basicClassName : undefined}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
