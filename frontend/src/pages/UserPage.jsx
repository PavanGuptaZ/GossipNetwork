import { ThemeDetails, UserContext } from "../hooks/ContextProvider";
import styles from '../css/userpage.module.css';
import { Link, NavLink, Outlet } from "react-router-dom";
import { useContext, useRef } from "react";
import { displayNavHandle } from "../javaScript/UserPage";
import { TbArrowBigRightFilled } from "react-icons/tb";
import { ToggleBTN } from "../components/ToggleBTN";
import { LoginRegister } from "./LoginRegister";
import { LogoutBTN } from "../components/LogoutBTN";
import { NavLoading } from "../components/Loading/NavLoading";

export const UserPage = () => {
  let { user, userLoading } = useContext(UserContext)
  const { secondry, color, body } = ThemeDetails()

  const NavLinkElement = useRef()
  const NavLinkBtn = useRef()

  if (!userLoading && !user) {
    return <LoginRegister type="Login" />
  }
  return (
    <div className={styles.box} style={{ backgroundColor: body, color }}>
      <nav className={styles.NavBar}>
        <Link to={"/home"} className={styles.webSiteLogo}>
          GOSSIP
        </Link>
        <div className={styles.NavLinks} ref={NavLinkElement}>
          {!userLoading ?
            <>
              <div className={styles.profile}>
                <div className={styles.profilePic}> </div>
                <div className={styles.userName}>{user.name}</div>
                <div className={styles.userDescription}>online</div>
              </div>
              <div className={styles.webBlocks}>
                <NavLink to="/home/chats" style={{ backgroundColor: secondry, color }}
                  className={({ isActive }) => styles.NavLinkBTN + " " + (isActive && styles.active)} > Chats <div className={styles.dot}></div></NavLink>
                <NavLink to="/home/groups" style={{ backgroundColor: secondry, color }}
                  className={({ isActive }) => styles.NavLinkBTN + " " + (isActive && styles.active)} > Groups <div className={styles.dot}></div></NavLink>
                <NavLink to="/home/chatwithAi" style={{ backgroundColor: secondry, color }}
                  className={({ isActive }) => styles.NavLinkBTN + " " + (isActive && styles.active)} > Ai <div className={styles.dot}></div></NavLink>
              </div>
              <ToggleBTN />
              <LogoutBTN />
              <div ref={NavLinkBtn} className={styles.displayNavBar} onClick={() => displayNavHandle(NavLinkElement, NavLinkBtn)}><TbArrowBigRightFilled /></div>
            </> : <NavLoading />}
        </div>
      </nav >
      <div className={styles.contentBox}>
        <Outlet />
      </div>
    </div>
  )
}