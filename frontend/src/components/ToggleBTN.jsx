import { MdLightMode, MdOutlineLightMode } from 'react-icons/md';
import styles from '../css/userpage.module.css';
import { ThemeDetails } from '../hooks/ContextProvider';

export const ToggleBTN = () => {
    const { toggleTheme, theme, darkBTN } = ThemeDetails()

    return (
        <div className={styles.toggleBox}>
            <button className={styles.toggleModeBTN} onClick={toggleTheme} style={{ ...darkBTN }}>
                {theme === "dark" ? <> <MdOutlineLightMode /> <span>Light</span></> : <><MdLightMode /><span>Dark</span></>}
            </button>
        </div>
    )
}
