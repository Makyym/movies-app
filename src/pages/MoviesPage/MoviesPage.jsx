import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from '../../components/MovieList/MovieList';
import { fetchMovieByQuery } from "/src/movies-api.js"
import { useSearchParams } from "react-router-dom";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const paramsQuery = searchParams.get('query') ?? "";
    const [movieList, setMovieList] = useState([]);
    
    const fetchMovieList = (searchQuery) => {
        searchParams.set('query', searchQuery);
        setSearchParams(searchParams);
    }

    useEffect(() => {
        const movieList = async () => {
            const response = await fetchMovieByQuery(paramsQuery);
            const { data: { results } } = response;
            if (!results.length) {
            setMovieList(null);
            return;
        }
            setMovieList(results);
        };
        if (paramsQuery === "") {
            return;
        };
        movieList();
    }, [paramsQuery]);

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