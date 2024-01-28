export async function getChatMessages(id) {
    console.log("first")
    try {
        const responce = await fetch(import.meta.env.VITE_BACKEND_LINK + "/list/chat?user=" + id, {
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