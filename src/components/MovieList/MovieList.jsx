import { Link, useLocation } from 'react-router-dom';
import s from "./MovieList.module.css"

const MovieList = ({ data }) => {
    const location = useLocation();
    return (
        <div>
            <ul className={s.list}>
                {data.map((movie) => {
                    return (
                        <li key={movie.id}>
                            <Link to={movie.id.toString()} state={location}>
                                <p>{movie.original_title}</p>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default MovieList