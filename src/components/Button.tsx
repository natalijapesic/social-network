type ButtonProps = {
    buttonStyle: "dark" | "light" | "disable" | "prev" | "next" |undefined;
    value?: number | string | undefined;
    onClick?: () => void | ((value: number) => void);
    type: "button" | "submit";
    message: string;
    disabled: boolean
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {

    const darkClassName =
    "py-1 px-3 my-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700";
    const lightClassName =
    "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700";
    const disbledClassName =
    "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700";
    const prevClassName = "bg-gray-400 hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded-l";
    const nextClassName = "bg-gray-400 hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded-r";
    
    return (
        <button
            value={props.value}
            onClick={props.onClick}
            type={props.type}
            className={
                props.buttonStyle === "dark"
                    ? darkClassName
                    : props.buttonStyle === "light"
                    ? lightClassName
                    : props.buttonStyle === "disable"
                    ? disbledClassName
                    : props.buttonStyle === "next"
                    ? nextClassName
                    : props.buttonStyle === "prev"
                    ? prevClassName
                    : undefined
            }
            disabled={props.disabled}
        > {props.message} </button>
    );
}

export default Button;