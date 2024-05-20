import { BASE_IP } from "./config";

export const moviesListAPI = async (genreID) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    };
    let url = ""
    if (genreID) {
        url = `${BASE_IP}/getMovies/${genreID}`
    } else {
        url = `${BASE_IP}/getMovies`
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error fetching the tmdb api", error);
    }
};