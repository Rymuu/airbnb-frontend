export default {
    getPlaces() {
        return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/place`, {
            method: "GET"
        }).then(res => res.json())
    },
    searchPlaces(searchQuery) {
        return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/place/${searchQuery}`, {
            method: "GET",
        }).then(res => res.json())
    }
}