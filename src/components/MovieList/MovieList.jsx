import { Link, useLocation } from 'react-router-dom';
import s from "./MovieList.module.css"

const MovieList = ({ data }) => {
    const location = useLocation();
    return (
        <div>
            <ul className={s.list}>
                {data.map((movie) => {
                    if (!movie.poster_path) return;
                    return (
                        <li key={movie.id} className={s.item}>
                            <Link to={`/movies/${movie.id.toString()}`} state={location}>
                            <img className={s.img}src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.original_title} />
                                <p className={s.text}>{movie.original_title}</p>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default MovieList