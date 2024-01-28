import { useParams } from 'react-router-dom';
import styles from '../../css/userpage2.module.css';
import { ChatBody } from './ChatBody';

export const UserGroups = () => {
  let { id } = useParams()

  return (
    <div className={styles.chatFullBox}>
      <div className={styles.bodyhead}>Chat Groups {id}</div>
      <ChatBody />
    </div>  )
}
