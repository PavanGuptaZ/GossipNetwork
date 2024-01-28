import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage'
import Themes from '../theme/index.json'
import { useQuery } from '@tanstack/react-query';
import { userDetailsAPI } from '../api/LoginandRegister';
import { io } from 'socket.io-client'

export const UserContext = createContext()
export const ThemeContext = createContext()
export const SocketContext = createContext()

export const ContextProviders = ({ children }) => {
    const [theme, setTheme] = useLocalStorage('theme', 'dark')
    // const [socket, setSocket] = useState(null)
    const socket = useRef()
    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark")
        } else {
            setTheme("light")
        }
    }
    const { data: user, error, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: () => userDetailsAPI(),
    })

    useEffect(() => {
        let socketadd
        if (user) {
            socketadd = io(import.meta.env.VITE_BACKEND_LINK)
            socket.current = socketadd
            socketadd.on('connect', () => {
                console.log("io Connected")
            })
        }
        return () => socketadd && socketadd.close()

    }, [user])
    return (
        <UserContext.Provider value={{ user: error ? false : user, userLoading: isLoading }}>
            <ThemeContext.Provider value={{ ...Themes[theme], theme, toggleTheme }}>
                <SocketContext.Provider value={{ socket: socket.current }}>
                    {children}
                </SocketContext.Provider>
            </ThemeContext.Provider>
        </UserContext.Provider>
    )
}

ContextProviders.propTypes = {
    children: PropTypes.node
}



export function UserDetails() {
    return useContext(UserContext)
}

export function ThemeDetails() {
    return useContext(ThemeContext)
}