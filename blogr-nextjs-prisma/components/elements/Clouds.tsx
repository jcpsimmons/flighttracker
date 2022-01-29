import styles from "./Clouds.module.css";

const Clouds = ({ children }) => {
  const clouds = Array(10).fill(null);

  const getRandomAnimation = () => {
    return `moveclouds ${Math.floor(Math.random() * 20 + 60)}s linear infinite`;
  };

  return (
    <div className={styles.container}>
      <style
        dangerouslySetInnerHTML={{
          __html: `@keyframes moveclouds { 0% { margin-left: 100vw; } 100% { margin-left: -100vw; } }`,
        }}
      />
      {children}
      <div className={styles.clouds}>
        {clouds.map((i) => (
          <div
            id="fuck"
            className={`${styles.cloud}`}
            key={i}
            style={{
              marginLeft: "120%",
              animation: getRandomAnimation(),
              animationDelay: `${Math.floor(Math.random() * 20)}s`,
              opacity: `${Math.random() * 0.8 + 0.2}`,
              transform: `scale(${Math.random() * 0.5 + 0.9})`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Clouds;
