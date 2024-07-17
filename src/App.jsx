import { useEffect, useState } from 'react'
import Banner from './components/Banner'
import Header from './components/Header'
import MovieList from './components/MovieList'
import MovieSearch from './components/MovieSearch'
import {MovieProvider} from "./context/movieProvider"

function App() {
  const [movie, setMovie] = useState([])
  const [movieRate, setMovieRate] = useState([])
  const [movieSearch, setMovieSearch] = useState([])
  console.log(movieSearch)

  const handleSearch = async(searchVal) => {
    setMovieSearch([])
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchVal}&include_adult=false&language=vi&page=1`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDRlNzA5MWVmYTRiMTJjOTYxZjBmMzkyZTJhZWRmYiIsIm5iZiI6MTcyMTExNzI1OS4wOTA3OTMsInN1YiI6IjY0NWRkYzI2OTU5MGUzMDE4YWZlMWY3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TiRQG7SIiZAAwhWnPusuLRRoi9-PBKxmC03lxBZqnWk'
        }
      };

      const response = await fetch(url, options);
      const data = await response.json();
      setMovieSearch(data.results)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fechMovie = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDRlNzA5MWVmYTRiMTJjOTYxZjBmMzkyZTJhZWRmYiIsIm5iZiI6MTcyMTExNzI1OS4wOTA3OTMsInN1YiI6IjY0NWRkYzI2OTU5MGUzMDE4YWZlMWY3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TiRQG7SIiZAAwhWnPusuLRRoi9-PBKxmC03lxBZqnWk'
        }
      };
      const url = 'https://api.themoviedb.org/3/movie/popular?language=vi-US&page=1';

      const url2 = 'https://api.themoviedb.org/3/movie/top_rated?language=vi&page=1';

      const [res1, res2] = await Promise.all([
        fetch(url, options),
        fetch(url2, options),
      ])

      const data = await res1.json();
      const data2 = await res2.json();
      console.log(data2)
      
      setMovie(data.results)
      setMovieRate(data2.results)

    }
    fechMovie();
  }, [])

  return (
    <>
    <MovieProvider>
      <div className='bg-black pb-10'>
        <Header onSearch={handleSearch}/>
        <Banner />
        {movieSearch.length > 0 ? <MovieSearch title='Kết quả tìm kiếm' data={movieSearch} /> :  <><MovieList title={"Phim hot"} data={movie} />
        <MovieList title={"Phim đề cử"} data={movieRate}/></>} 
        
      </div>
    </MovieProvider>
    </>
  )
}

export default App
