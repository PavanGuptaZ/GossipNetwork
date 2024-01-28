export async function getSearchList(variables) {
    let { type, search } = variables

    try {
        const responce = await
            fetch(import.meta.env.VITE_BACKEND_LINK + "/list/search/" + helper[type] + "?search=" + search, {
                method: "GET",
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                credentials: 'include',
            })
        const data = await responce.json()

        if (responce.ok && data) {
            return data
        } else {
            throw new Error(data?.message)
        }

    } catch (error) {
        return error
    }
}

const helper = {
    "chats": "users",
    "groups": "groups"
} 