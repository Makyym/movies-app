import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from '../../components/MovieList/MovieList';
import { fetchMovieByQuery } from "/src/movies-api.js"
import { useSearchParams } from "react-router-dom";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
    const [movieList, setMovieList] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    
    const fetchMovieList = async (searchQuery) => {
        const response = await fetchMovieByQuery(searchQuery);
        const { data: { results } } = response;
        if (!results.length) {
            setMovieList(null);
            return;
        }
        searchParams.set('query', searchQuery);
        setSearchParams(searchParams);
        setMovieList(results);
    }

    useEffect(() => {
        const paramsQuery = searchParams.get('query') ?? "";
        const movieList = async () => {
            const response = await fetchMovieByQuery(paramsQuery);
            const { data: { results } } = response;
            setMovieList(results);
        }
        movieList();
    }, [searchParams]);

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