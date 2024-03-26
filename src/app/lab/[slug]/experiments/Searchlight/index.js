import styles from "./styles.module.css";

export default function Searchlight() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.bulbcover}>
          <div className={styles.bulb}>❘</div>
        </div>
        <div className={styles.light}></div>
        <div className={styles.textbox}>
          You can&rsquo;t be a lighthouse when you&rsquo;re underwater yourself.
        </div>
      </div>
      <div className={styles.overlay}></div>
    </div>
  );
}
