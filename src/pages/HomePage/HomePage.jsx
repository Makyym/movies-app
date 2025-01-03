import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '/src/movies-api.js';
import MovieList from '../../components/MovieList/MovieList';
import s from "./HomePage.module.css";

const HomePage = () => {
    const [moviesArray, setMoviesArray] = useState([]);
    useEffect(() => {
        const data = async () => {
        try {
            const response = await fetchTrendingMovies();
            setMoviesArray(response.results);
        } catch(Error) {
            console.log(Error);
        }
        }
        data();
    }, [])

    return (
        <div>
            <h1 className={s.title}>Trending Today</h1>
            <MovieList data={moviesArray} />
        </div>
    )
}

export default HomePage