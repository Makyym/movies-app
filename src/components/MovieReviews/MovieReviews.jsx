import { useEffect, useState } from 'react';
import { fetchMovieReviews } from '/src/movies-api.js';
import { useParams } from 'react-router-dom';
import s from "./MovieReviews.module.css"

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState(null);
    
    useEffect(() => {
        const getData = async () => {
            const response = await fetchMovieReviews(movieId);
            setReviews(response.results);
        }
        getData();
    }, [movieId]);

    if (!reviews) return;
    return (
        <>{reviews.length > 0 ? (
                <div>
                    <ul className={s.list}>
                        {reviews.map(({ id, author, content }) => {
                            return (
                                <li key={id}>
                                    <h3>{author}</h3>
                                    <p>{content}</p>
                                </li>);
                        })}
                    </ul>
                </div>) : (<p>{`Sorry, but we don't have reviews for this film yet.`}</p>)
        }
    </>)
}

export default MovieReviews