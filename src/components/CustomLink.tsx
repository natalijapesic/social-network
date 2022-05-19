import { Link } from "react-router-dom";

type CustomLinkProps = {
  linkStyle: "cyan" | undefined;
  to: string;
  onClick?: () => void;
  message: string;
};
const cyanClassName =
  "mx-1.25 py-0.5 px-1 hover:text-cyan-500 hover:text-opacity-100";

const CustomLink: React.FC<CustomLinkProps> = (props: CustomLinkProps) => {
  return (
    <Link
      to={props.to}
      onClick={props.onClick}
      className={props.linkStyle === "cyan" ? cyanClassName : undefined}
    >
      {props.message}
    </Link>
  );
};

export default CustomLink;
