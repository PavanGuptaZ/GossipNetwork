import { useContext, useRef } from 'react';
import styles from '../../css/userpage.module.css';
import { ThemeDetails, UserContext } from '../../hooks/ContextProvider';
import { displayAsideHandle } from '../../javaScript/UserPage';
import { TbLayoutSidebarLeftExpandFilled } from 'react-icons/tb';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types'
import { ChatsGroupsList } from './lists/ChatsGroupsList';
import { useQuery } from '@tanstack/react-query';
import { getList } from '../../api/Chats/getList';

export const AsideComp = ({ type }) => {
  let { body } = ThemeDetails()
  let { userLoading } = useContext(UserContext)

  const userChatElement = useRef()
  const userChatBTN = useRef()

  const ChatList = useQuery({
    queryKey: [`List-${type}`],
    queryFn: () => getList(type),
    enabled: !userLoading
  })

  return (
    <>
      <aside className={styles.UserChatList} ref={userChatElement}>
        <div className={styles.displayButton} ref={userChatBTN} style={{ color: body }}
          onClick={() => displayAsideHandle(userChatElement, userChatBTN)}><TbLayoutSidebarLeftExpandFilled /></div>
        <ChatsGroupsList type={type} ChatList={ChatList} />
      </aside>
      <Outlet />
    </>
  )
}

AsideComp.propTypes = {
  type: PropTypes.string
}