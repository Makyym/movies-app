import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom"
import { fetchMovieById } from '/src/movies-api.js';
import Loader from "../../components/Loader/Loader";
import s from "./MovieDetailsPage.module.css"

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const location = useLocation();
    const goBackLink = useRef(location.state ?? "/movies");

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const response = await fetchMovieById(movieId);
                setMovie(response);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [movieId]);
    if (!movie) return;
    const { original_title, overview, vote_average, poster_path, genres, release_date} = movie;
    return (
        <div>
            {error && (
                <p>Whoops, something went wrong! Please try reloading this page!</p>)}
            {loading && <Loader />}
            {!loading && <div>
                <div className={s.wrapper}>
                    <Link to={goBackLink.current} className={s.goBack}>Go back</Link>
                    <h2 className={s.title}>{original_title}</h2>
                </div>
                <img className={s.img} src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={original_title} />
                                <h3 className={s.overviewTitle}>Overview</h3>
                                <p className={s.overviewText}>{overview}</p>
                            <div className={s.div}>
                                <div className={s.genres}>
                                    <h3>Genres</h3>
                                    {genres && <ul className={s.genresUl}>
                                        {genres.map((genre) => {
                                            return (
                                            <li key={genre.id}>{genre.name}</li>
                                        )
                                        })}
                                        </ul>}
                                </div>
                                <div className={s.genres}>
                                    <h3>Release date</h3>
                                    <p>{release_date}</p>
                                </div>
                                <div className={s.genres}>
                                    <h3>Users score</h3>
                                    <p>{vote_average.toFixed(1)}</p>
                                </div>
                            </div>
                                <h3>Additional information</h3>
                                <ul className={s.list}>
                                    <li><Link to="cast">Cast</Link></li>
                                    <li><Link to="reviews">Reviews</Link></li>
                                </ul>
                                <Suspense fallback={<Loader />}>
                                <Outlet />
                                </Suspense>
                                </div>}
                                </div>
                                )
                            };

export default MovieDetailsPage