import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";
export default function App() {   
  console.log(process.env.REACT_APP_OMDB_API_KEY);
  
  const API_URL = `https://www.omdbapi.com?apikey=${process.env.REACT_APP_OMDB_API_KEY}`;
  
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('Superman');
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data);
    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies('Superman');
    // eslint-disable-next-line
  }, []);
  return (
    <div className="app">
      <h1>Film Finder</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
      </div>
      {
        movies?.length > 0
        ? (
            <div className="container">
                {
                    movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))
                }
            </div>
        ) : (
            <div className="empty">
                <h2>No movies found</h2>
            </div>
        )
      }
      
    </div>
  );
}
