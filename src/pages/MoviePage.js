import { type } from '@testing-library/user-event/dist/type'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import MovieCard from '../components/movie/MovieCard'
import MovieList from '../components/movie/MovieList'
import { fetcher } from '../config'
import { useDebounce } from '../hooks/useDebounce'
import ReactPaginate from 'react-paginate'

const MoviePage = () => {
  //! pagination
  // 20 bo phim
  const itemsPerPage = 20

  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0)

  const [nextPage, setNextPage] = useState(1)
  const [filter, setFilter] = useState('')
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=d2298ed8119a3da2a34b928d8b497bfa&page=${nextPage}`
  )
  const filterDebounce = useDebounce(filter, 500)
  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const { data, error } = useSWR(url, fetcher)
  const loading = !data && !error

  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=d2298ed8119a3da2a34b928d8b497bfa&query=${filterDebounce}&page=${nextPage}`
      )
    } else {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=d2298ed8119a3da2a34b928d8b497bfa&page=${nextPage}`
      )
    }
  }, [filterDebounce, nextPage])

  // if (!data) return null
  const movies = data?.results || []
  // const { page, total_pages } = data

  //! pagination
  useEffect(() => {
    if (!data || !data.total_results) return //neu ko co data hoac data.total_page thi return
    setPageCount(Math.ceil(data.total_results / itemsPerPage)) //tinh tong so luong = total page tra ve / itemsPerPage
  }, [data, itemOffset])

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results //event.seleted: tich sao so: so 1, so 2, so 3... // offset hien ra dau ...
    setItemOffset(newOffset)
    // console.log(event.selected)
    setNextPage(event.selected + 1)
  }

  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 text-white rounded-l-lg outline-none bg-slate-800"
            placeholder="Type here to search ..."
            onChange={handleFilterChange}
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
      {loading && (
        <div className="w-10 h-10 mx-auto border-4 rounded-full border-t-transparent border-primary border-b-transparent animate-spin"></div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard item={item} key={item.id}></MovieCard>
          ))}
      </div>
      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel={
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          }
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  )
}

export default MoviePage
