import { Route, Routes } from 'react-router-dom'
import 'swiper/scss'
import Banner from './components/banner/Banner'
import Main from './components/layout/Main'
import HomePage from './pages/HomePage'
import MovieDetailsPage from './pages/MovieDetailsPage'
import MoviePage from './pages/MoviePage'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Main />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/movie" element={<MoviePage />}></Route>
          <Route path="/movie/:movieId" element={<MovieDetailsPage />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
