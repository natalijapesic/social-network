type InputProps = {
  inputStyle: "rounded" | "bottom" | undefined;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>> | ((value:string) => void);
  type: "text" | "url" | "password" | undefined;
  placeholder: string;
};

const roundedClassName =
  "mb-6 block w-full px-4 py-2 text-xl focus:text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";
const bottomClassName =
  "border-b-2 text-sky-100 my-3 leading-tight focus:border-transparent bg-gray-800";

const Input: React.FC<InputProps> = (props: InputProps) => {
  return (
    <div>
      <input
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        type={props.type && props.type}
        className={
          props.inputStyle === "rounded"
            ? roundedClassName
            : props.inputStyle === "bottom"
            ? bottomClassName
            : undefined
        }
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default Input;
