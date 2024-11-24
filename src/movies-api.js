import axios from "axios";

const url = 'https://api.themoviedb.org/3/';
const ApiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTg1MWIyMTk1YjhhNzRkYjBmOTUxMDBiZWMzMGYwYyIsIm5iZiI6MTczMjMwNTkzOC43Njg2MDc5LCJzdWIiOiI2NzQwZDY0OTdiODI1ZTY4NWI0ZTM0NGQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BvLD0BrP_sxDoxHi2VLwyZtPfx5-7ST-DwBxt94InVE';

const options = {
    headers: {
        Authorization: `Bearer ${ApiToken}`
    }
};

export const fetchTrendingMovies = async () => {
    const response = await axios.get(`${url}trending/movie/day?language=en-US`, options);
    return response.data;
}

export const fetchMovieById = async (id) => {
    const response = await axios.get(`${url}movie/${id}`, options);
    return response.data;
}

export const fetchMovieCast = async (id) => {
    const response = await axios.get(`${url}movie/${id}/credits`, options);
    return response.data;
}

export const fetchMovieReviews = async (id) => {
    const response = await axios.get(`${url}movie/${id}/reviews`, options);
    return response.data;
}

export const fetchMovieByQuery = async (query) => {
    const response = await axios.get(`${url}search/movie?query=${query}`, options);
    return response;
}