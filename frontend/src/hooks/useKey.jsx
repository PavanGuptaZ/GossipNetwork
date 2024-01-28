import { useEffect } from 'react';

export const useKey = (key, action) => {
    useEffect(() => {
        function callBack(e) {
            if (e.code && e.code.toLowerCase() === key.toLowerCase()) {
                action()
            }
        }

        document.addEventListener("keydown", callBack)

        return () => {
            document.removeEventListener("keydown", callBack)
        }
    })
}
