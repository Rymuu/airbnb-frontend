export default {
    getBookings(token) {
        return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reservation`, {
            method: "GET",
            headers: {
                "authorization": token
            },
        }).then(res => res.json())
    },
    getMyBookings(token) {
        return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reservation/reservations`, {
            method: "GET",
            headers: {
                "authorization": token
            },
        }).then(res => res.json())
    },
    getMyOwnerBookings(token) {
        return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reservation/reservations/owner/`, {
            method: "GET",
            headers: {
                "authorization": token
            },
        }).then(res => res.json())
    },
    createReservation(token, body) {
        return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reservation/`, {
            method: "POST",
            headers: {
                'Content-type': "application/json",
                'Authorization': `${token}`
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
    },
    cancelReservation(token, id) {
        return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reservation/cancel/${id}`, {
            method: "GET",
            headers: {
                "authorization": token
            },
        }).then(res => res.json())
    },
    acceptReservation(token, id) {
        return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reservation/accept/${id}`, {
            method: "GET",
            headers: {
                "authorization": token
            },
        }).then(res => res.json())
    },
    refuseReservation(token, id) {
        return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reservation/refuse/${id}`, {
            method: "GET",
            headers: {
                "authorization": token
            },
        }).then(res => res.json())
    },
    deleteReservation(token, id) {
        return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reservation/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `${token}`
            },
        }).then(res => res.json())
    },
}