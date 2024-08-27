import styles from "./Sidebar.module.css";

import Logo from "./Logo";
import AppNav from "./AppNav";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Znaji Inc.
        </p>
      </footer>
    </div>
  );
}
