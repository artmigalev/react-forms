import styles from "./index.module.css";

const ButtonContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles["btn-container"]}>{children}</div>;
};

export default ButtonContainer;
