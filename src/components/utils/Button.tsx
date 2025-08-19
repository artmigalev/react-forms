import "./index.css";

const Button = ({ text, onClickModal }: { text?: string; onClickModal: () => void }) => {
  return <button onClick={onClickModal}>{text}</button>;
};
export default Button;
