import NotFoundPage from 'pages/NotFoundPage'
import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import 'swiper/scss'
import MainBo from './components/layout/MainBo'
// import HomePage from './pages/HomePage'
// import MovieDetailsPage from './pages/MovieDetailsPage'
// import MoviePage from './pages/MoviePage'

// dynamic import
const HomePage = lazy(() => import('./pages/HomePage'))
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage'))
const MoviePage = lazy(() => import('./pages/MoviePage'))

function App() {
  return (
    <>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<MainBo />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/movie" element={<MoviePage />}></Route>
            <Route
              path="/movie/:movieId"
              element={<MovieDetailsPage />}
            ></Route>
          </Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
