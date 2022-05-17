type ButtonProps = {
    buttonStyle: "dark" | "light" | undefined;
    value?: number | undefined;
    onClick?: () => void;
    type: "button" | "submit";
    message: string;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {

    const darkClassName =
    "py-1 px-3 my-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700";
    const lightClassName =
    "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700";
    
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
                    : undefined
            }
        > {props.message} </button>
    );
}

export default Button;