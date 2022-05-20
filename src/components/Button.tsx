import { ButtonStyle } from "./types";

type ButtonProps = {
  buttonStyle: ButtonStyle;
  value?: number | string | undefined;
  onClick?: () => void | ((value: number) => void);
  type: "button" | "submit";
  message: string;
  disabled: boolean;
};

const darkClassName =
  "py-1 px-3 my-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700";
const lightClassName =
  "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700";
const disbledClassName =
  "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700";
const prevClassName =
  "bg-gray-400 hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded-l";
const nextClassName =
  "bg-gray-400 hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded-r";
const redRoundClassName =
  "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 text-center mr-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900";
const searchClassName =
  "btn inline-block px-4 border-2 border-gray-600 text-gray-400 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out";

const buttonStyles: Record<ButtonStyle, string> = {
  dark: darkClassName,
  light: lightClassName,
  disable: disbledClassName,
  prev: prevClassName,
  next: nextClassName,
  redRound: redRoundClassName,
  search: searchClassName,
};

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button
      value={props.value}
      onClick={props.onClick}
      type={props.type}
      className={buttonStyles[props.buttonStyle]}
      disabled={props.disabled}
    >
      {" "}
      {props.message}{" "}
    </button>
  );
};

export default Button;
