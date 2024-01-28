import { useContext } from 'react';
import styles from '../../css/userpage2.module.css';
import { UserContext } from '../../hooks/ContextProvider';
import { LoadingComponent } from '../Loading/LoadingComponent';

export const UserDefault = () => {
  let { userLoading } = useContext(UserContext)

  return (
    <div className={styles.chatFullBox}>
      {userLoading ? <LoadingComponent /> : "hello world"}
    </div>
  )
}
