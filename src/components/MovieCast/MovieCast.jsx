import { useEffect, useState } from 'react';
import { fetchMovieCast } from '/src/movies-api.js';
import { useParams } from 'react-router-dom';
import s from "./MovieCast.module.css"

const MovieCast = () => {
    const { movieId } = useParams();
    const [movieCast, setMovieCast] = useState(null);
    
    useEffect(() => {
        const getData = async () => {
            const response = await fetchMovieCast(movieId);
            setMovieCast(response.cast);
        }
        getData();
    }, [movieId]);

    if (!movieCast) return;
    return (
        <div>
            <ul className={s.list}>
                {movieCast.map((actor) => {
                    const { id, name, profile_path } = actor;
                    if (profile_path) {
                        return (
                            <li className={s.item} key={id}>
                                <img className={s.image} src={`https://image.tmdb.org/t/p/w500${profile_path}`} alt={name} />
                                <p>{name}</p>
                            </li>
                        )
                    }
                })}
            </ul>
        </div>
    )
}

export default MovieCast