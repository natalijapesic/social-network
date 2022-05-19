
type InputProps = {
    inputStyle: "rounded" | undefined;
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
    type: "text" | "url" | "password" | undefined;
    placeholder: string;
}

const Input: React.FC<InputProps> = (props: InputProps) => {

    const roundedClassName =
        "block w-full px-4 py-2 text-xl focus:text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";
    
    return (
        <div className="mb-6">
            <input
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                type={props.type && props.type}
                className={
                    props.inputStyle === "rounded"
                        ? roundedClassName
                        : undefined
                }
                placeholder={props.placeholder}
            />
        </div>
    );
}

export default Input;