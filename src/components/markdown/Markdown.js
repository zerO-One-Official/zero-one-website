import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import style from "./Markdown-styles.module.css";

const Markdown = ({ children }) => {
  return (
    <div className={style.reactMarkDown}>
      <ReactMarkdown remarkPlugins={remarkGfm}>{children}</ReactMarkdown>
    </div>
  );
};

export default Markdown;
