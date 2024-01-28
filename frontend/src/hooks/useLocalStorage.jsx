import { useEffect, useState } from "react"

export const useLocalStorage = (key, initialValue) => {
    function getValue() {
        let storedValue = localStorage.getItem(key)
        if (storedValue) return storedValue
        return initialValue
    }

    const [value, setValue] = useState(getValue())

    useEffect(() => {
        localStorage.setItem(key, value)
    }, [key, value])

    return [value, setValue]

}
