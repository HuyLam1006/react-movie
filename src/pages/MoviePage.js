import { type } from '@testing-library/user-event/dist/type'
import React from 'react'
import useSWR from 'swr'
import MovieCard from '../components/movie/MovieCard'
import MovieList from '../components/movie/MovieList'
import { fetcher } from '../config'

const MoviePage = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/popular?api_key=d2298ed8119a3da2a34b928d8b497bfa`,
    fetcher
  )
  const movies = data?.results || []

  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 text-white rounded-l-lg outline-none bg-slate-800"
            placeholder="Type here to search ..."
          />
        </div>
        <button className="p-4 text-white rounded-r-lg bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-10">
        {movies.length > 0 &&
          movies.map((item) => (
            <MovieCard item={item} key={item.id}></MovieCard>
          ))}
      </div>
    </div>
  )
}

export default MoviePage
