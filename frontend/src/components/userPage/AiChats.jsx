import { useContext } from 'react';
import styles from '../../css/userpage2.module.css';
import { ChatBody } from './ChatBody';
import { UserContext } from '../../hooks/ContextProvider';
import { LoadingComponent } from '../Loading/LoadingComponent';


export const AiChats = () => {
  let { user, userLoading } = useContext(UserContext)


  return (
    <div className={styles.chatFullBox}>
      <div className={styles.bodyhead}>AiChats Box</div>
      {userLoading ? <LoadingComponent /> : <ChatBody messages={user?.aiChatMessages} type={"aichat"} />}
    </div>
  )
}