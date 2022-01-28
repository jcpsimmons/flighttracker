import styles from "./Clouds.module.css";

const Clouds = () => {
  return (
    <div className={styles.container}>
      <div className={styles.clouds}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div className={`${styles.cloud} ${styles[`x${i}`]}`}></div>
        ))}
      </div>
    </div>
  );
};

export default Clouds;
