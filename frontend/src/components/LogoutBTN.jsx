import { MdLogout } from "react-icons/md";
import styles from '../css/userpage.module.css';
import { ThemeDetails } from '../hooks/ContextProvider';

export const LogoutBTN = () => {
    const { darkBTN } = ThemeDetails()

    return (
        <div className={styles.logoutBox}>
            <button className={styles.logoutBTN} style={{ ...darkBTN }}>
                <MdLogout style={{ transform: "rotate(180deg)" }} /> <span>Logout</span>
            </button>
        </div>
    )
}
