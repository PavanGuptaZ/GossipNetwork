export async function LoginAPI(body) {
    try {
        const responce = await fetch(import.meta.env.VITE_BACKEND_LINK + "/auth/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(body),
            credentials: 'include',
        })
        const data = await responce.json()

        console.log(data)
        if (responce.ok && data.user) {
            return data
        } else {
            console.log(data?.message)
            throw new Error(data?.message)
        }

    } catch (error) {
        console.log(error)
    }
}

export function RegisterAPI(data) {
    try {
        fetch(import.meta.env.VITE_BACKEND_LINK + "/auth/register",
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include',
            }).then((res) => res.json())
            .then((result) => console.log(result))
    } catch (error) {
        console.log(error)
    }
}

export async function userDetailsAPI() {
    const responce = await fetch(import.meta.env.VITE_BACKEND_LINK + "/auth/refresh",
        {
            method: "GET",
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            credentials: 'include',
        })
    const data = await responce.json()

    if (responce.ok && data.user) {
        return data.user
    } else {
        throw new Error(data?.message)
    }

}