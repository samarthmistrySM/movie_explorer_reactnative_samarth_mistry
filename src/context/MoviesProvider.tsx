import React, {useState, useEffect, FC} from 'react';
import MoviesContext from './MoviesContext';
import {getMovies} from '../api/movieApi';
import { Movie } from '../Types';

interface Props {
  children: React.ReactNode;
}

const MoviesProvider: FC<Props> = ({children}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getMovies();
      if(res){
        setMovies(res.movies as Movie[]);
      } 
    };
    fetchMovies();
  }, [reload]);

  return (
    <MoviesContext.Provider
      value={{
        movies,
      }}>
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesProvider;
