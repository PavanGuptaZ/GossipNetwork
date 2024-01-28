import { Routes, Route, Navigate } from 'react-router-dom';
import { UserPage } from '../UserPage';
import { UserDefault } from '../../components/userPage/UserDefault';
import { LoginRegister } from '../LoginRegister';
import { PageNotFound } from '../PageNotFound';
import { WebsiteHomePage } from '../WebsiteHomePage';
import { UserChats } from '../../components/userPage/UserChats';
import { UserGroups } from '../../components/userPage/UserGroups';
import { AsideComp } from '../../components/userPage/AsideComp';
import { AiChats } from '../../components/userPage/AiChats';

export const DefaultLayout = () => {

    return (
        <Routes>
            <Route path='/' element={<WebsiteHomePage />} />
            <Route path='/home/*' element={<UserPage />}>
                <Route index element={<Navigate to={"chats"} />} />
                <Route path='chats/*' element={<AsideComp type={"chats"} />} >
                    <Route index element={<UserDefault />} />
                    <Route path=':id' element={<UserChats />} />
                </Route>
                <Route path='groups' element={<AsideComp type={"groups"} />} >
                    <Route index element={<UserDefault />} />
                    <Route path=':id' element={<UserGroups />} />
                </Route>
                <Route path='chatwithAi' element={<AiChats />} />
                <Route path='*' element={<UserDefault />} />
            </Route>
            <Route path='/login' element={<LoginRegister type="Login" />} />
            <Route path='/Register' element={<LoginRegister type="Register" />} />
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}
