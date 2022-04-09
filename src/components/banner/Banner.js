import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWR from 'swr'
import { fetcher } from 'apiConfig/config'
import Button from 'components/button/Button'

const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=d2298ed8119a3da2a34b928d8b497bfa`,
    fetcher
  )
  //   console.log('MovieList ~ data', data)

  const movie = data?.results || []

  return (
    <section className="h-[600px] mb-20 banner page-container overflow-hidden">
      <Swiper grabCursor={true} slidesPerView={'auto'}>
        {movie.length > 0 &&
          movie.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  )
}

function BannerItem({ item }) {
  const navigate = useNavigate()
  console.log('BannerItem ~ item', item)

  return (
    <div className="relative w-full h-full rounded-lg">
      <div className="absolute inset-0 rounded-lg overlay bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] "></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
        alt=""
        className="object-cover w-full h-full rounded-lg"
      />
      <div className="absolute w-full text-white bottom-5 left-5">
        <h2 className="mb-5 text-3xl font-bold">{item.title}</h2>
        <div className="flex items-center mb-8 gap-x-3">
          <span className="px-4 py-2 border border-white rounded-md">
            Action
          </span>
          <span className="px-4 py-2 border border-white rounded-md">
            Adventure
          </span>
          <span className="px-4 py-2 border border-white rounded-md">
            Drama
          </span>
        </div>
        <Button
          bgColor="secondary"
          onClick={() => navigate(`/movie/${item.id}`)}
        >
          Watch Now
        </Button>
        {/* <button className="px-6 py-3 font-medium text-white rounded-lg bg-primary">
          Watch Now
        </button> */}
      </div>
    </div>
  )
}

export default Banner
