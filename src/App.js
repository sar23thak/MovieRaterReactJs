import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import { useCookies } from 'react-cookie';

function App() {

  const [movies, setMovie] = useState([])

  const[selectedMovie, setSelectedMovie] = useState(null);

  const [editedMovie, seteditedMovie] = useState(null);

  const [token, setToken, deleteToken] = useCookies(['mr-token'])

  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mr-token']}`
      }
    })
    .then(resp => resp.json())
    .then(resp => setMovie(resp))
    .catch(error => console.log(error))
  }, [])

  useEffect(()=>{
    if(!token['mr-token']) window.location.href = '/';
  })

  // const movieclickedd = movie =>{
  //   setSelectedMovie(movie);
  //   // console.log(movie.description)
  // }

  const loadMovie = movie =>{
    setSelectedMovie(movie);
    seteditedMovie(null);
  }

  const editClicked = movie =>{
    seteditedMovie(movie);
    setSelectedMovie(null);
  }

  const reloadMovie = movie =>{
    const newMovies = movies.map(mov =>{
      if(mov.id === movie.id)return movie;
      return mov;
    })
    setMovie(newMovies)
  }

  const newMovie = () =>{
    setSelectedMovie(null);
    seteditedMovie({title: '', description: ''});
  }
  
  const createMovie = movie =>{
    const newMoviee = [...movies, movie];
    setMovie(newMoviee);
  }

  const removeClicked = movie =>{
    const newMovie = movies.filter(mov => mov.id !== movie.id);
    setMovie(newMovie);
  }

  const logoutClicked = () =>{
    deleteToken(['mr-token'], {path:'/'});
    // console.log(token)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
        <button className='logout' onClick={logoutClicked}>logout</button>
      </header>
      <div className="layout">
          <div>
            <MovieList movies = {movies} movieisClicked = {loadMovie} editClicked = {editClicked} removeClicked={removeClicked}/>
            <button onClick={newMovie}>New Movie</button>
          </div>
          {/* <MovieDetails  movie= {selectedMovie} updateMovie = {loadMovie}/> */}
          {selectedMovie ? <MovieDetails  movie= {selectedMovie} updateMovie = {loadMovie}/> : null }
          {editedMovie ? <MovieForm movie = {editedMovie} reloadMovie = {reloadMovie} createMovie = {createMovie}/>: null}
      </div>
    </div>
  );
}

export default App;
