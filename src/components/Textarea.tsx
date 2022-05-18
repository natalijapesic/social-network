
type TextareaProps = {
    textareaStyle: "basic" | undefined;
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
    placeholder: string;
}

const Input: React.FC<TextareaProps> = (props: TextareaProps) => {

    const basicClassName = "block w-full px-3 py-1.5 font-mono border border-solid border-gray-300 rounded transition";
    
    return (
        <div className="mb-6">
            <textarea
                className={
                    props.textareaStyle === "basic"
                        ? basicClassName
                        : undefined
                }
                value={props.value}
                onChange = {(e) => props.onChange(e.target.value)}
            />
        </div>
    );
}

export default Input;