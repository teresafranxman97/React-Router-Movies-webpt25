import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import MovieCard from './Movies/MovieCard';


export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);
  

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies') // Study this endpoint with Postman
        .then(response => {
          // console.log(response.data) // Study this response with a breakpoint or log statements
          setMovieList(response.data) //set the response data as the 'movieList' slice of state
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  

  const addToSavedList = id => {
    id.preventDefaul()
    // This is stretch. Prevent the same movie from being "saved" more than once
  };


  return (
    <div className='App'>
      <SavedList list={[movieList]} />
      {/* ROUTES BEGIN HERE */}
      <Switch>
        <Route path={`/movies/${movieList.id}`}>
          <Movie />
        </Route>
        <Route path="/">
          <MovieList movies={movieList} />
        </Route>
      </Switch>
      {/* ROUTES END HERE */}
    </div>
  );
}
