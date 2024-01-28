export async function getList(type) {
    try {
        const responce = await fetch(import.meta.env.VITE_BACKEND_LINK + "/list/" + type, {
            method: "GET",
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            credentials: 'include',
        })
        const data = await responce.json()

        if (responce.ok && data.user) {
            return data
        } else {
            throw new Error(data?.message)
        }

    } catch (error) {
        return error
    }
}