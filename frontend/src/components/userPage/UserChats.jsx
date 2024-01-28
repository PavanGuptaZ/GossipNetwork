import styles from '../../css/userpage2.module.css';
import { useParams } from 'react-router-dom';
import { ChatBody } from './ChatBody';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { UserContext } from '../../hooks/ContextProvider';
import { getChatMessages } from '../../api/Chats/getChatMessages';


export const UserChats = () => {
  let { id } = useParams()
  let { userLoading } = useContext(UserContext)

  const getChatMessagesQurey = useQuery({
    queryKey: [`chatMessages-${id}`],
    queryFn: () => getChatMessages(id),
    enabled: !userLoading
  })
  console.log(getChatMessagesQurey.data)
  return (
    <div className={styles.chatFullBox}>
      <div className={styles.bodyhead}>Chat Box {id}</div>
      <ChatBody />
    </div>
  )
}