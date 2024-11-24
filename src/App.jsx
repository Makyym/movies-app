import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation';
import { lazy, Suspense } from 'react';
import Loader from './components/Loader/Loader';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'));


function App() {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/movies' element={<MoviesPage />} />
          <Route path='/movies/:movieId' element={<MovieDetailsPage />}>
            <Route path='Cast' element={<MovieCast />} />
            <Route path='Reviews' element={<MovieReviews />} />
          </Route>
          <Route path='/:movieId' element={<MovieDetailsPage />}>
            <Route path='Cast' element={<MovieCast />} />
            <Route path='Reviews' element={<MovieReviews />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App