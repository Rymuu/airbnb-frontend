export default {
    getMe(token) {
        return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/user`, {
            method: "GET",
            headers: {
                "authorization": token
            },
        }).then(res => res.json())
    },
    updateUser(token, body) {
        return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/user`, {
            method: "PUT",
            headers: {
                "authorization": token,
                'Content-type': "application/json"
            },
            body: JSON.stringify(body)

        }).then(res => res.json())
    }

}
