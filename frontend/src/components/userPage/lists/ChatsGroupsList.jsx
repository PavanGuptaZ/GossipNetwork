import { NavLink } from "react-router-dom"
import styles from '../../../css/userpage.module.css';
import PropTypes from 'prop-types'
import { ThemeDetails } from "../../../hooks/ContextProvider";
import { IoSearchSharp } from "react-icons/io5";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getSearchList } from "../../../api/Chats/getSearchList";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from 'react-toastify';


export const ChatsGroupsList = ({ type, ChatList }) => {
  const [search, setSearch] = useState({ show: false, value: "" })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (search.value.trim().length > 2) {
      SearchList.mutate({ type, search: search.value })
      setSearch((pre) => ({ ...pre, show: true }))
    } else {
      toast.warn("Minimum 3 characters to search")
    }
  }


  const SearchList = useMutation({
    mutationKey: ['chatsSearchList'],
    mutationFn: (variables) => getSearchList(variables),
  })

  return (
    <>
      <form className={styles.searchBox} onSubmit={handleSubmit}>
        <input type="text" className={styles.searchInput} value={search.value} placeholder="Search here"
          onChange={(e) => setSearch((pre) => ({ ...pre, value: e.target.value }))} />
        <button type="submit" className={styles.searchIconBTN}><IoSearchSharp /></button>
        {search.value.length > 0 && <MdOutlineCancel className={styles.cancelIcon} style={{ color: "#000" }} onClick={() => setSearch({ show: false, value: "" })} />}
      </form>
      <div className={styles.userChatListBox}>
        {search.show ? SearchList.isPending ? <span className={styles.errorMessage}>Loading </span> :
          SearchList.data?.list ? SearchList.data?.list.map((ele) => {
            return <UserChatBlock key={ele._id} data={ele} />
          }) : <span className={styles.errorMessage}>{SearchList.data?.message}</span>
          :
          ChatList.data?.list ? ChatList.data?.list.map((ele) => {
            return <UserChatBlock key={ele._id} data={ele} />
          }) : <span className={styles.errorMessage}>{ChatList.data?.message}</span>
        }
        {/* {type == "chats" ? <>
          <UserChatBlock id={1} />
          <UserChatBlock id={2} />
          <UserChatBlock id={3} />
          <UserChatBlock id={4} />
          <UserChatBlock id={5} />
          <UserChatBlock id={6} />
          <UserChatBlock id={7} />
          <UserChatBlock id={8} />
          <UserChatBlock id={9} />
        </> : <>
          <UserGroupBlock id={1} />
          <UserGroupBlock id={2} />
          <UserGroupBlock id={3} />
        </>} */}
      </div>
    </>
  )
}

export const UserChatBlock = ({ data }) => {
  let { color } = ThemeDetails()

  return (
    <NavLink to={`/home/chats/${data._id}`} className={({ isActive }) => styles.userBlock + " " + (isActive && styles.active)} style={{ color }}>
      <div className={styles.profilePic}> </div>
      <div className={styles.userDetails}>
        <p className={styles.userName}>{data.name}</p>
        <p className={styles.userDescription}>{data.status}</p>
      </div>
    </NavLink>
  )
}

export const UserGroupBlock = ({ id }) => {
  let { color } = ThemeDetails()

  return (
    <NavLink to={`/home/groups/${id}`} className={({ isActive }) => styles.userBlock + " " + (isActive && styles.active)} style={{ color }}>
      <div className={styles.profilePic}> </div>
      <div className={styles.userDetails}>
        <p className={styles.userName}>Pavan Guptas</p>
        <p className={styles.userDescription}>Gossips Network User and freelancer</p>
      </div>
    </NavLink>
  )
}

ChatsGroupsList.propTypes = {
  type: PropTypes.string,
  ChatList: PropTypes.object
}
UserChatBlock.propTypes = {
  data: PropTypes.object
}

UserGroupBlock.propTypes = {
  id: PropTypes.any
}