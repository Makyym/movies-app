import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from '../../components/MovieList/MovieList';
import { fetchMovieByQuery } from "/src/movies-api.js"
import { useSearchParams } from "react-router-dom";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const paramsQuery = searchParams.get('query') ?? "";
    const [searchMovie, setSearchMovie] = useState(paramsQuery)
    const [movieList, setMovieList] = useState([]);
    
    const fetchMovieList = async (searchQuery) => {
        const response = await fetchMovieByQuery(searchQuery);
        const { data: { results } } = response;
        if (!results.length) {
            setMovieList(null);
            return;
        }
        searchParams.set('query', searchQuery);
        setSearchMovie(searchQuery);
        setSearchParams(searchParams);
        setMovieList(results);
    }

    useEffect(() => {
        const movieList = async () => {
            const response = await fetchMovieByQuery(searchMovie);
            const { data: { results } } = response;
            setMovieList(results);
        }
        movieList();
    }, [searchMovie]);

    return (
        <div>
            <SearchBar onSubmit={fetchMovieList} />
            {movieList ? <MovieList data={movieList} /> : (
                <p className={s.text}>{`No results were found for your search, please change your search and try again!`}</p>
            )}
        </div>
    )
}

export default MoviesPage