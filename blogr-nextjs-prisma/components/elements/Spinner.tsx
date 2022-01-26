import styles from "./Spinner.module.css";

const Spinner = ({ className }) => {
  return <div className={`${styles.loader} ${className}`} />;
};

export default Spinner;
